import { connectToDB } from "@/lib/db/database";
// import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import User from "@/lib/db/models/user";

const options = {
  providers: [
    GitHubProvider.default({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",
  
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
    
    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  callbacks: {
    async session({ session, token, user }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })
      session.user.id = sessionUser._id.toString();

      // session.user.id = token.id;

      // console.log('(options/session) session : ', session);
      // console.log('(options/session) user : ', user);
      // console.log('(options/session) token : ', token);

      return session;
    },
    async jwt({ token, account, profile, user }) {
      // console.log('(options/jwt) user : ', user);
      // console.log('(options/jwt) account : ', account);
      // console.log('(options/jwt) profile : ', profile);
      // console.log('(options/jwt) token : ', token);
      return token;
    },
    async signIn({ profile, user }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          const newUser = await User.create({
            email: profile.email,
            name: profile.name.replace(" ", "").toLowerCase(),
            groups: [],
            posts:[]
          });
          // console.log('new user created : ', newUser);
          /*
              new user created :  {
              email: 'tjddbs2207@gmail.com',
              name: 'seongyunwoo',
              _id: new ObjectId('65c6e976ddd786b3bfc19075'),
              groups: [],
              posts: [],
              __v: 0
              }
          */
        }

        console.log('(options/signIn) user :', user);

        return true
      } catch (error) {
        console.log('(auth option)Error checking if user exists: ', error.message);
        return false
      }
    }
  }
};

export default options;