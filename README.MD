## Deno SMTP mail client

[![Build Status](https://www.travis-ci.org/manyuanrong/deno-smtp.svg?branch=master)](https://www.travis-ci.org/manyuanrong/deno-smtp)
![GitHub](https://img.shields.io/github/license/manyuanrong/deno-smtp.svg)
![GitHub release](https://img.shields.io/github/release/manyuanrong/deno-smtp.svg)
![(Deno)](https://img.shields.io/badge/deno-0.10.0-green.svg)

### Example

```ts
import { SmtpClient } from "https://raw.githubusercontent.com/manyuanrong/deno-smtp/master/mod.ts";

const client = new SmtpClient();
await client.connect({
  host: "smtp.163.com",
  port: 25,
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
