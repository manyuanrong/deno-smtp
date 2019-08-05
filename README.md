## Deno SMTP mail client

[![Build Status](https://www.travis-ci.org/manyuanrong/deno-smtp.svg?branch=master)](https://www.travis-ci.org/manyuanrong/deno-smtp)
![GitHub](https://img.shields.io/github/license/manyuanrong/deno-smtp.svg)
![GitHub release](https://img.shields.io/github/release/manyuanrong/deno-smtp.svg)
![(Deno)](https://img.shields.io/badge/deno-0.12.0-green.svg)

### Example

```ts
import { SmtpClient } from "https://deno.land/x/smtp@v0.3.0/mod.ts";

const client = new SmtpClient();
await client.connect({
  host: "smtp.163.com",
  port: 25,Ø
  username: "username",
  password: "password"
});

await client.send({
  from: "mailaddress@163.com",
  to: "to-address@xx.com",
  subject: "Mail Title",
  content: "Mail Content，maybe HTML"
});

await client.close();
```
