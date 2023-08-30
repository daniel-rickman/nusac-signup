import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import {KyselyAdapter} from "../../../db/kyselyadapter";
import {db} from "../../../db/database";

export const authOptions = {
    providers: [
        GoogleProvider(
            {
                clientId: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                allowDangerousEmailAccountLinking: true,
            },

        )
    ],
    adapter: KyselyAdapter(db),
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "google") {
                console.log(profile.email)
                return profile.email_verified && profile.email.endsWith("@hotmail.co.uk")
            }
            return false
        }
    },
    strategy: "database",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }