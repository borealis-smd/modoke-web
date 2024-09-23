import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/lib/axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

function authOptions(req: NextRequest, res: NextResponse): NextAuthOptions {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          try {
            const { data } = await api.post("/user/login", {
              email: credentials?.email,
              password: credentials?.password,
            });

            if (data) {
              return { ...data, token: data };
            }

            return null;
          } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
              return Promise.reject(new Error(error.response.data.message));
            }
            return Promise.reject(new Error("Erro desconhecido"));
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
    callbacks: {
      async signIn({ user, profile }) {
        return await handleSignIn({ user, profile, req });
      },
      async jwt({ token, user }) {
        if (user) {
          token.accessToken = (user as any).token;
          token.googleUser = (user as any).googleUser;
        }
        return token;
      },
      async session({ session, token }) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          image: token.picture as string,
          jwt: token.accessToken as string,
          googleUser: token.googleUser as boolean,
        };
        return session;
      },
    },
  };
}

async function handleSignIn({
  user,
  profile,
  req,
}: {
  user: any;
  profile?: any;
  req: NextRequest;
}) {
  const level = Number(req.cookies.get("level")?.value);

  if (profile) {
    const { email, given_name, family_name, picture } = profile;

    try {
      const loginResponse = await api.post("/auth/google/login", { email });

      if (loginResponse.data) {
        user.token = loginResponse.data;
        user.googleUser = true;
        return true;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.message === "Usuário não encontrado."
        ) {
          if (!level) return false;
          return await registerUser({
            email,
            given_name,
            family_name,
            picture,
            level,
            user,
          });
        }
      }
      return false;
    }
  }
  return true;
}

async function registerUser({
  email,
  given_name,
  family_name,
  picture,
  level,
  user,
}: any) {
  try {
    const registerResponse = await api.post("/auth/google/register", {
      user: {
        first_name: given_name,
        last_name: family_name,
        avatar_url: picture,
        level_id: level,
      },
      login: {
        email,
        is_google_user: true,
      },
    });

    if (registerResponse.data) {
      user.jwt = registerResponse.data;
      user.googleUser = true;
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const handler = (req: NextRequest, res: NextResponse) =>
  NextAuth(authOptions(req, res))(req, res);

export { handler as GET, handler as POST };
