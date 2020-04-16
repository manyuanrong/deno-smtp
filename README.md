## Deno SMTP mail client

[![Build Status](https://github.com/manyuanrong/deno-smtp/workflows/ci/badge.svg?branch=master)](https://github.com/manyuanrong/deno-smtp/actions)
![GitHub](https://img.shields.io/github/license/manyuanrong/deno-smtp.svg)
![GitHub release](https://img.shields.io/github/release/manyuanrong/deno-smtp.svg)
![(Deno)](https://img.shields.io/badge/deno-0.40.0-green.svg)

### Example

```ts
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

const client = new SmtpClient();

await client.connect({
  host: "smtp.163.com",
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
  host: "smtp.163.com",
  port: 465,
  username: "username",
  password: "password",
});
```

#### Use in Gmail
```ts
await client.connect({
  tls: true,
  host: "smtp.gamil.com",
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
