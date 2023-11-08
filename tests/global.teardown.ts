const { db } = require('@vercel/postgres');

(async function() {
  const client = await db.connect()
  // await client.sql`DELETE FROM recipes where title = 'pigeon pie';`
  await client.sql`DELETE FROM recipes where title = 'baby stew';`
  await client.end()
})()