import { createClient, ssrExchange, dedupExchange, cacheExchange, fetchExchange } from "urql";
import fetch from "cross-fetch";

export function createUrqlClient(initialState?: any) {
  const isServer = typeof window === "undefined";
  const ssr = ssrExchange({ isClient: !isServer, initialState });
  return createClient({
    url: process.env.NEXT_PUBLIC_SUPABASE_GRAPHQL_URL!,
    fetch,
    exchanges: [dedupExchange, cacheExchange, ssr, fetchExchange],
    fetchOptions: () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("sb:token") : undefined;
      return {
        headers: {
          "apiKey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
  });
}