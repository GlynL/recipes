import { test as teardown } from "@playwright/test";
const { db } = require("@vercel/postgres");

teardown("teardown db", async () => {
  const client = await db.connect();
  await client.sql`DELETE FROM recipes where title = 'holy grail';`;
  await client.end();
});
