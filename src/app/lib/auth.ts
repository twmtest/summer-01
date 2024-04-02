import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/Login",
    
  },
  providers: [
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`,
      httpOptions: {
        timeout: 50000,
      },
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret:`${process.env.GOOGLE_SECRET}` ,
      httpOptions: {
        timeout: 50000,
      },
    }),
  ],
  callbacks: {
     session: async ({ session, token }) => {
      return token
    }
  },
  secret: process.env.AUTH_SECRET
}

export default NextAuth(authOptions)