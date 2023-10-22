import NextAuth from "next-auth/next"

type role = 'user' | 'admin';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string
      email: string
      role: role;
    },
  }
}