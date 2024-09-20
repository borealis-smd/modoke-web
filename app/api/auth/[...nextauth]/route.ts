import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/lib/axios";
import axios from "axios";

const handler = NextAuth({
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
    async signIn({ user, profile }: { user: any; profile?: any }) {
      if (profile) {
        const { email, given_name, family_name, picture } = profile;

        try {
          const loginResponse = await api.post("/auth/google/login", { email });

          if (loginResponse.data) {
            user.token = loginResponse.data;
            return true;
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            if (
              error.response.status === 400 &&
              error.response.data.message === "Usuário não encontrado."
            ) {
              return await registerUser({
                email,
                given_name,
                family_name,
                picture,
                user,
              });
            }
          }
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token;
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
      };
      return session;
    },
  },
});

async function registerUser({
  email,
  given_name,
  family_name,
  picture,
  user,
}: any) {
  try {
    const registerResponse = await api.post("/auth/google/register", {
      user: {
        first_name: given_name,
        last_name: family_name,
        avatar_url: picture,
        level_id: 1,
      },
      login: {
        email,
        is_google_user: true,
      },
    });

    if (registerResponse.data) {
      user.jwt = registerResponse.data;
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { handler as GET, handler as POST };
