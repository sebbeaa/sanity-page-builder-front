import NextAuth, { NextAuthOptions } from "next-auth";

import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import client from "@/actions/client/client";

const options: NextAuthOptions = {
  providers: [
    SanityCredentials(client), // only if you use sign in with credentials
  ],
  session: {
    strategy: "jwt",
  },
  adapter: SanityAdapter(client),
};

export default NextAuth(options);
