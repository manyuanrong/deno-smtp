import { SmtpClient } from "./smtp.ts";

const env = Deno.env();
const { MAIL_USER, MAIL_PASS } = env;

async function main() {
  const client = new SmtpClient();
  await client.connect({
    host: "mail.smtp2go.com",
    port: 2525,
    username: MAIL_USER,
    password: MAIL_PASS
  });

  await client.send({
    from: "system@link.denochina.com",
    to: "416828041@qq.com",
    subject: "Deno Smtp build Success" + Math.random() * 1000,
    content: `
<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Deno Smtp build Success</title>
      </head>
      <body>
        <h1>Success</h1>
        <p>Build succeed!</p>
        <p>${new Date()}</p>
      </body>
    </html>
`
  });

  await client.close();
}

main();
