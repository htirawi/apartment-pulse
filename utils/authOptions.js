import NextAuth from 'next-auth';
import connectDB from '@/config/database';
import User from '@/models/User';

import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    // Add custom logic to check if the user is allowed to sign in
    async signIn({ account, profile }) {
      // 1. Connect to database
      await connectDB();
      // 2. Check if user exists in the database
      const user = await User.findOne({ email: profile.email });
      // 3. If user doesn't exist, save user to database
      if (!user) {
        // Truncate the user object to only the necessary fields
        const username = profile.name.slice(0, profile.name.indexOf(' '));
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. Return true to allow sign in
      return true; // Do different verification for other providers that don't have `email_verified`
    },

    // Add custom logic to modify the session object
    async session({ session }) {
      // 1. Get user from database
      const dbUser = await User.findOne({ email: session.user.email });
      // 2. If user exists, add user to session
      session.user.id = dbUser._id.toString();

      // 3. return session
      return session;
    },
  },
};
