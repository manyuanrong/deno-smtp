## Deno SMTP mail client

[![Build Status](https://github.com/manyuanrong/deno-smtp/workflows/ci/badge.svg?branch=master)](https://github.com/manyuanrong/deno-smtp/actions)
![GitHub](https://img.shields.io/github/license/manyuanrong/deno-smtp.svg)
![GitHub release](https://img.shields.io/github/release/manyuanrong/deno-smtp.svg)
![(Deno)](https://img.shields.io/badge/deno-1.0.0-green.svg)

### Example

```ts
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

const client = new SmtpClient();

await client.connect({
  hostname: "smtp.163.com",
  port: 25,
  username: "username",
  password: "password",
});

await client.send({
  from: "mailaddress@163.com",
  to: "to-address@xx.com",
  subject: "Mail Title",
  content: "Mail Content，maybe HTML",
});

await client.close();
```

#### TLS connection

```ts
await client.connectTLS({
  hostname: "smtp.163.com",
  port: 465,
  username: "username",
  password: "password",
});
```

#### Use in Gmail

```ts
await client.connectTLS({
  hostname: "smtp.gmail.com",
  port: 465,
  username: "your username",
  password: "your password",
});

await client.send({
  from: "someone@163.com", // Your Email address
  to: "someone@xx.com", // Email address of the destination
  subject: "Mail Title",
  content: "Mail Content，maybe HTML",
});

await client.close();
```

### Configuring your client

You can pass options to your client through the `SmtpClient` constructor.

```ts
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

//Defaults
const client = new SmtpClient({
  content_encoding: "quoted-printable", // 7bit, 8bit, base64, binary, quoted-printable
});
```
