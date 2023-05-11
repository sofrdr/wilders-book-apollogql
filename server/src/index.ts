import { ApolloServer } from 'apollo-server';
import appDataSource from './utils';
import { buildSchema } from 'type-graphql';
import { WildersResolver } from './resolvers/WildersResolver';
import { SkillsResolver } from './resolvers/SkillsResolver';
import { AuthResolver } from './resolvers/AuthResolver';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from './entities/User';

dotenv.config();

const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

const start = async (): Promise<void> => {
   await appDataSource.initialize();
   const schema = await buildSchema({
      resolvers: [WildersResolver, SkillsResolver, AuthResolver],
      authChecker: ({ context }) => {
         return !!context.user;
      },
   });
   const server = new ApolloServer({
      schema,
      context: async ({ req }) => {
         if (!req.headers.authorization) {
            return {};
         }

         try {
            const token = req.headers.authorization.split('Bearer ')[1];
            if (token.length === 0) {
               return {};
            }
            const decodedToken = jwt.verify(token, MY_SECRET_KEY as string);

            if (typeof (decodedToken as JwtPayload)?.userId === 'number') {
               const user = await User.findOneBy({
                  id: (decodedToken as JwtPayload)?.userId,
               });

               return { user };
            }
         } catch (error) {
            console.log(error);
         }
      },
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
