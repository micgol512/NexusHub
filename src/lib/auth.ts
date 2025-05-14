import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from "@/lib/hashPassword";
import { getUserByEmailOrPhone } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      image: string | null;
      name: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    image: string | null;
    name: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    name?: string;
    picture?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: "read:user user:email" } },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      id: "database-login",
      name: "Database Login",
      credentials: {
        contact: {
          label: "Email or mobile phone number",
          type: "text",
          placeholder: "Email or mobile phone number",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.contact || !credentials?.password) return null;

        try {
          const contact = credentials.contact.trim();
          const user = await getUserByEmailOrPhone(contact);
          if (!user || typeof user.password !== "string") return null;

          const passwordValid = await verifyPassword(
            credentials.password,
            user.password
          );
          if (!passwordValid) return null;

          return {
            id: user.id,
            email: user.email ?? "",
            image: user.image ?? "",
            name: user.name ?? "",
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id);
        token.email = user.email;
        token.name = user.name ?? "";
        token.picture = user.image ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? "");
        session.user.email = token.email ?? "";
        session.user.name = token.name ?? "";
        session.user.image = token.picture ?? "";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 10,
  },
};
