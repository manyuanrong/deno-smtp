import { CommandCode } from "./code.ts";
import { ConnectConfig, SendConfig } from "./config.ts";
import { BufReader, BufWriter, TextProtoReader } from "./deps.ts";

const decoder = new TextDecoder();
const encoder = new TextEncoder();

interface Command {
  code: string;
  args: string;
}

export class SmtpClient {
  private _conn: Deno.Conn | null;
  private _reader: BufReader | null;
  private _writer: BufWriter | null;

  async connect(config: ConnectConfig) {
    if (config.secure) {
      this._conn = await Deno.connectTLS({
        hostname: config.hostname,
        port: config.port || 465
      })
    } else {
      this._conn = await Deno.connect({
        hostname: config.hostname,
        port: config.port || 25
      })
    }    const reader = new BufReader(this._conn);
    this._reader = new TextProtoReader(reader)
    this._writer = new BufWriter(this._conn);
    let cmd = await this.readCmd();
    this.assertCode(cmd, CommandCode.READY);

    await this.writeCmd("EHLO", config.host);
    while (true) {
      const cmd = await this.readCmd();
      if (!cmd.args.startsWith("-")) break;
    }
    await this.writeCmd("AUTH", "LOGIN");
    await this.readCmd();
    await this.writeCmd(btoa(config.username));
    await this.readCmd();
    await this.writeCmd(btoa(config.password));

    this.assertCode(await this.readCmd(), CommandCode.AUTHO_SUCCESS);
  }

  public async send(config: SendConfig) {
    await this.writeCmd("MAIL", "FROM:", `<${config.from}>`);
    this.assertCode(await this.readCmd(), CommandCode.OK);
    await this.writeCmd("RCPT", "TO:", `<${config.to}>`);
    this.assertCode(await this.readCmd(), CommandCode.OK);
    await this.writeCmd("DATA");
    this.assertCode(await this.readCmd(), CommandCode.BEGIN_DATA);

    await this.writeCmd("Subject: ", config.subject);
    await this.writeCmd("From: ", config.from);
    await this.writeCmd("To: ", `<${config.from}>`);
    await this.writeCmd("Date: ", new Date().toString());

    await this.writeCmd("MIME-Version: 1.0");
    await this.writeCmd("Content-Type: text/html;charset=utf-8");
    await this.writeCmd("Content-Transfer-Encoding: quoted-printable");

    await this.writeCmd(config.content, "\r\n.\r\n");
    this.assertCode(await this.readCmd(), CommandCode.OK);
  }

  public async close() {
    if (!this._conn) { return }
    await this._conn.close();
  }

  private assertCode(cmd: Command | null, code: string, msg?: string) {
    if (!cmd) { throw new Error(`invalid cmd`) }
    if (cmd.code !== code) { throw new Error(msg || `${cmd.code}:${cmd.args}`) }
    // console.log("Read:", cmd);
  }

  private async readCmd(): Promise<ommand | null> {
    if (!this._reader) { return null }
    const result = await this._reader.readLine();
    if (result === Deno.EOF) return null;
    const line = decoder.decode(result.line);
    const code = parseInt(line.slice(0, 3).trim());
    const args = line.slice(3).trim();
    // console.log("r", line, cmdCode, cmdArgs);
    return {
      code,
      args
    };
  }

  private async writeCmd(...args: string[]) {
    if (!this._writer) { return null }
    // console.log("Write:", ...args);
    const data = encoder.encode([...args].join(" ") + "\r\n");
    await this._writer.write(data);
    await this._writer.flush();
  }
}
