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
    signIn: "/",
    
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
          sub: token.sub as string // 使用类型断言确保 token.sub 是 string 类型
        },
        update: {
          // 使用token中的数据
          username: token.name as string, // 使用类型断言确保 token.name 是 string 类型
          avatar: token.picture as string, // 使用类型断言确保 token.picture 是 string 类型
          email: token.email as string // 使用类型断言确保 token.email 是 string 类型
        },
        create: {
          // 使用token中的数据 
          sub: token.sub as string, // 使用类型断言确保 token.sub 是 string 类型
          username: token.name as string, // 使用类型断言确保 token.name 是 string 类型
          avatar: token.picture as string, // 使用类型断言确保 token.picture 是 string 类型
          email: token.email as string, // 使用类型断言确保 token.email 是 string 类型
          platform: 'google',
        }
      });
    
      if (res) {
        session.user = {
          sub: res?.sub,
          platform: res?.platform,
          name: res?.username,
          image: res?.avatar,
          email: res?.email,
        } as UserInfo;
      }
      return session;
    }
    
  },

  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)