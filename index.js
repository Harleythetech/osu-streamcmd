const fetch = require('node-fetch');
const fastify = require('fastify')({
  logger: true,
});


async function stream() {
  var APIKEY = 'https://osutrack-api.ameo.dev/peak?user=21943340&mode=0';

  try {
    const Getapi = await fetch(APIKEY, { method: 'GET' });
    if (!Getapi) {
      console.log('No response from API');
    } else {
      const jsonapi = await Getapi.json();
      const apitext = JSON.stringify(jsonapi);
      const modtext = apitext.replace(']', '');
      const finalapi = modtext.replace('[', '');
      const response = JSON.parse(finalapi);
      const FeedData =
        'Global rank: ' + response.best_global_rank + ', ' + 'Accuracy: ' + response.best_accuracy;
      console.log(FeedData);
      return FeedData;
    }
  } catch (exception) {
    console.error(exception);
  }
}

fastify.get('/', async (request, reply) => {
  const feedData = await stream();
  reply.send(feedData);
});

fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
});
