import { CommandCode } from "./code.ts";
import { ConnectConfig, SendConfig } from "./config.ts";
import { BufReader, BufWriter, TextProtoReader } from "./deps.ts";

const encoder = new TextEncoder();

interface Command {
  code: number;
  args: string;
}

export class SmtpClient {
  private _conn: Deno.Conn | null;
  private _reader: TextProtoReader | null;
  private _writer: BufWriter | null;

  constructor() {
    this._conn = null;
    this._reader = null;
    this._writer = null;
  }

  async connect(config: ConnectConfig) {
    const conn = await Deno.connect({
      hostname: config.hostname,
      port: config.port || 25,
    });
    await this._connect(conn, config);
  }

  async connectTLS(config: ConnectConfig) {
    const conn = await Deno.connectTls({
      hostname: config.hostname,
      port: config.port || 465,
    });
    await this._connect(conn, config);
  }

  async close() {
    if (!this._conn) {
      return;
    }
    await this._conn.close();
  }

  async send(config: SendConfig) {
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

  private async _connect(conn: Deno.Conn, config: ConnectConfig) {
    this._conn = conn;
    const reader = new BufReader(this._conn);
    this._writer = new BufWriter(this._conn);
    this._reader = new TextProtoReader(reader);

    this.assertCode(await this.readCmd(), CommandCode.READY);

    await this.writeCmd("EHLO", config.hostname);
    while (true) {
      const cmd = await this.readCmd();
      if (!cmd || !cmd.args.startsWith("-")) break;
    }
    await this.writeCmd("AUTH", "LOGIN");
    this.assertCode(await this.readCmd(), 334);

    await this.writeCmd(btoa(config.username));
    this.assertCode(await this.readCmd(), 334);

    await this.writeCmd(btoa(config.password));
    this.assertCode(await this.readCmd(), CommandCode.AUTHO_SUCCESS);
  }

  private assertCode(cmd: Command | null, code: number, msg?: string) {
    if (!cmd) {
      throw new Error(`invalid cmd`);
    }
    if (cmd.code !== code) {
      throw new Error(msg || cmd.code + ": " + cmd.args);
    }
  }

  private async readCmd(): Promise<Command | null> {
    if (!this._reader) {
      return null;
    }
    const result = await this._reader.readLine();
    if (result === null) return null;
    const cmdCode = parseInt(result.slice(0, 3).trim());
    const cmdArgs = result.slice(3).trim();
    return {
      code: cmdCode,
      args: cmdArgs,
    };
  }

  private async writeCmd(...args: string[]) {
    if (!this._writer) {
      return null;
    }
    const data = encoder.encode([...args].join(" ") + "\r\n");
    await this._writer.write(data);
    await this._writer.flush();
  }
}
