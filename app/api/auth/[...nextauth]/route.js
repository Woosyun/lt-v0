import NextAuth from "next-auth";
import options from "./options";

const handler = NextAuth.default(options)

export { handler as GET, handler as POST }