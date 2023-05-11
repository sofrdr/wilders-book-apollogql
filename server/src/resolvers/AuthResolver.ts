import { Arg, Authorized, Ctx, Mutation, Query } from 'type-graphql';
import * as argon2 from 'argon2';
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { validate } from 'class-validator';
import appDataSource from '../utils';

config();

const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

export class AuthResolver {
   @Mutation(() => String)
   async signUp(
      @Arg('email') email: string,
      @Arg('password') password: string
   ): Promise<string> {
      const hashedPassword = await argon2.hash(password);

      const userToCreate = new User();
      userToCreate.email = email;
      userToCreate.password = password;

      try {
         const existingUser = await User.findOneBy({ email });
         if (existingUser) {
            throw new Error('Already an account with this email');
         }
         const errors = await validate(userToCreate);
         if (errors.length > 0) {
            console.log('validation failed. errors: ', errors);
            errors.map((err) => {
               if (err.property === 'email') {
                  throw new Error('Incorrect email format');
               }
               if (err.property === 'password') {
                  throw new Error('Password not strong enough');
               }
            });
         }
         const newUser = { ...userToCreate, password: hashedPassword };
         const token = jwt.sign(
            { userId: newUser.id },
            MY_SECRET_KEY as string
         );
         await appDataSource.getRepository(User).save(newUser);
         return token;
      } catch (error) {
         return error.message;
      }
   }

   @Mutation(() => String)
   async signIn(
      @Arg('email') email: string,
      @Arg('password') password: string
   ): Promise<string> {
      try {
         const userFoundByEmail = await User.findOneBy({ email });
         if (!userFoundByEmail) {
            throw new Error('Invalid credentials');
         }

         const isPasswordValid = await argon2.verify(
            userFoundByEmail.password,
            password
         );

         if (!isPasswordValid) {
            throw new Error('Invalid credentials');
         }
         const token = jwt.sign(
            { userId: userFoundByEmail.id },
            MY_SECRET_KEY as string
         );
         return token;
      } catch (error) {
         return error.message;
      }
   }

   @Authorized()
   @Query(() => String)
   async getProfile(@Ctx() context: any) {
      console.log('user', context.user);
      return (context.user as any)?.email;
   }
}
