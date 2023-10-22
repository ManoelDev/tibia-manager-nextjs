import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/utils/functions/criptoPassword";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dayjs from 'dayjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  pages: {
    signIn: "/account-manager/login",
    verifyRequest: "/account-manager/verify-request",
    newUser: "/account-manager/register",
  },
  session: {
    strategy: 'jwt',
    maxAge: 10 * 60, // 10 min
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null
        const user = await prisma.accounts.findFirst({ where: { email: credentials.email } });
        if (!user || !(comparePassword(credentials.password, user.password!))) return null;


        await prisma.accounts.update({ where: { id: Number(user.id) }, data: { web_lastlogin: dayjs().unix() } })

        return {
          id: String(user.id),
          email: user.email,
          name: user.rlname,
        };
      },
    }),
  ],

  callbacks: {
    session: async ({ session, token }) => {
      const user = await prisma.accounts.findUnique({ where: { id: Number(token.id) } });
      return {
        ...session,
        user: {
          // ...session.user,
          id: Number(token.id),
          email: token.email,
          name: token.name,
          role: user?.type === 6 ? 'admin' : 'user'
        },
      };
    },
    jwt: ({ token, user }) => {

      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: Number(u.id),
        };
      }
      return token;
    },
  },
};