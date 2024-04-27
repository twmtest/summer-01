import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { UserInfo } from "@/app/types/user";
import prisma from "@/app/lib/db";

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
      const res = await prisma.user.upsert({
        where: {
          sub: token.sub
        },
        update: {
          // 使用token中的数据
          username: token.name,
          avatar: token.picture,
          email: token.email
        },
        create: {
          // 使用token中的数据 
          sub: token.sub,
          username: token.name,
          avatar: token.picture,
          email: token.email,
          platform: 'google',
        }
      })
      if (res) {
        session.user = {
          sub: res.sub,
          platform: res.platform,
          username: res.username,
          avatar: res.avatar,
          email: res.email,
        } as UserInfo
      }
      return session
    }
  },

  secret: process.env.AUTH_SECRET
}

export default NextAuth(authOptions)