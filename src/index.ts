import '@/database';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from '@/resolvers/userResolver';
import { environment } from '@/environment';

const main = async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    stopOnTerminationSignals: false,
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const port = environment.PORT || 3000;
  app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
  });
};
main();
