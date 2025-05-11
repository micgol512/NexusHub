import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/generated/prisma";
import { verifyPassword } from "@/lib/hashPassword";
import { getUserByEmailOrPhone } from "@/lib/db";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      profileImage: string | null;
      username: string | null;
    };
  }

  interface User {
    id: number;
    email: string;
    profileImage: string | null;
    username: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: number;
    email?: string;
    name?: string;
    picture?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
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
        login: {
          label: "Email or Mobile",
          type: "text",
          placeholder: "example@email.com or 123456789",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null;

        try {
          const login = credentials.login.trim();
          const user = await getUserByEmailOrPhone(login);
          if (!user || typeof user.password !== "string") return null;

          const passwordValid = await verifyPassword(
            credentials.password,
            user.password
          );
          if (!passwordValid) return null;

          return {
            id: user.id,
            email: user.email,
            profileImage: user.profileImage,
            username: user.username,
          } as User;
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
        token.id = user.id as number;
        token.email = user.email;
        token.name = user.username ?? "";
        token.picture = user.image ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? 0;
        session.user.email = token.email ?? "";
        session.user.username = token.name ?? "";
        session.user.profileImage = token.picture ?? "";
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
