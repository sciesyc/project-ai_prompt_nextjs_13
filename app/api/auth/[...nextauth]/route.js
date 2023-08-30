import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // async session({ session }) {
    //   console.log('session', session);
    //   const sessionUser = await User.findOne({
    //     email: session.user.email,
    //   });
    //   session.user.id = sessionUser._id.toString();
    //   return session;
    // },
    // async signIn({ profile }) {
    //   console.log('profile', profile);
    //   try {
    //     //serverless -> Lambda -> dynamodb
    //     await connectToDB();
    //     //check if the user is already created
    //     const userExists = await User.findOne({
    //       email: profile.email,
    //     });
    //     //if ther is no user we should create a new one
    //     if (!userExists) {
    //       await User.create({
    //         email: profile.email,
    //         username: profile.name.replace(' ', '').toLowerCase(),
    //         image: profile.picture,
    //       });
    //     }
    //     return true;
    //   } catch (error) {
    //     console.log(error);
    //     return false;
    //   }
    // },
  },
  async session({ session }) {
    console.log('session', session);

    const sessionUser = await User.findOne({
      email: session.user.email,
    });

    session.user.id = sessionUser._id.toString();

    return session;
  },
  async signIn({ profile }) {
    console.log('profile', profile);
    try {
      //serverless -> Lambda -> dynamodb
      await connectToDB();

      //check if the user is already created
      const userExists = await User.findOne({
        email: profile.email,
      });

      //if ther is no user we should create a new one
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(' ', '').toLowerCase(),
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  },
});

export { handler as GET, handler as POST };
