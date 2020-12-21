import { assertEquals } from "https://deno.land/std@0.81.0/testing/asserts.ts";

function parseAddress(email: string): [string, string] {
  const m = email.match(/(.*)\s<(.*)>/);
  return m?.length === 3 ? [`<${m[2]}>`, email] : [`<${email}>`, `<${email}>`];
}

Deno.test("parse adresses (MAIL FROM, RCPT TO and DATA commands)", () => {
  const [e1, e2] = parseAddress("Deno Land <root@deno.land>");
  assertEquals([e1, e2], ["<root@deno.land>", "Deno Land <root@deno.land>"]);

  const [e3, e4] = parseAddress("root@deno.land");
  assertEquals([e3, e4], ["<root@deno.land>", "<root@deno.land>"]);
});
