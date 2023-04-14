import { ApolloServer } from 'apollo-server';
import appDataSource from './utils';
import { buildSchema } from 'type-graphql';
import { WildersResolver } from './resolvers/WildersResolver';
import { SkillsResolver } from './resolvers/SkillsResolver';

const start = async (): Promise<void> => {
  await appDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [WildersResolver, SkillsResolver],
  });
  const server = new ApolloServer({
    schema,
  });
  try {
    const port = 3001;
    const { url }: { url: string } = await server.listen({ port });
    console.log(`🚀  Server ready at ${url}`);
  } catch (err) {
    console.log('Error starting the server');
  }
};

start();
