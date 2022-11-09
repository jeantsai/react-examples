// server.js
import Fastify from 'fastify';
import fetch from 'node-fetch';

const fastify = Fastify({
  logger: true,
});

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const TOKEN_URL = process.env.TOKEN_URL; // e.g https://oauth2.googleapis.com/token

if (!CLIENT_SECRET || !TOKEN_URL) {
  console.log("Missing environment variables CLIENT_SECRET or TOKEN_URL.");
  process.exit(1);
}

// fastify.addHook("onSend", async function(request, reploy) {
//   reply.header('Access-Control-Allow-Origin', '*');
// });

fastify.post('/token', async (request, reply) => {
  const { code, client_id, redirect_uri } = request.query;

  const data = await fetch(
    `${TOKEN_URL}?grant_type=authorization_code&client_id=${client_id}&client_secret=${CLIENT_SECRET}&redirect_uri=${redirect_uri}&code=${code}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      }
    }
  );
  const tokenInfo = await data.json()
  console.log(`Got token: ${JSON.stringify(tokenInfo)}`)
  reply.header('Access-Control-Allow-Origin', '*')
  reply.send(tokenInfo);
});

fastify.listen(3001, (error) => {
  if (error) throw error;
});
