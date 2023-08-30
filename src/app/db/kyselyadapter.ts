import type {Kysely} from "kysely";
import type {Adapter, AdapterAccount, AdapterSession, AdapterUser, VerificationToken,} from "next-auth/adapters"
import type {DB} from "kysely-codegen"

export function KyselyAdapter(
    db: Kysely<DB>
): Adapter {
    return {

        async createUser(data) {
            return db
                .insertInto("next_auth.users")
                .values({ id: crypto.randomUUID(), ...data })
                .returningAll()
                .$castTo<AdapterUser>()
                .executeTakeFirstOrThrow();
        },

        async getUser(id) {
            const user = await db
                .selectFrom("next_auth.users")
                .selectAll()
                .where("id", "=", id)
                .$castTo<AdapterUser>()
                .executeTakeFirst();
            if (!user) {
                return null;
            }
            return user;
        },

        async getUserByAccount({ providerAccountId}) {
            const result = await db
                .selectFrom("next_auth.accounts")
                .innerJoin("next_auth.users", "next_auth.accounts.userId", "next_auth.users.id")
                .selectAll()
                .where("providerAccountId", "=", providerAccountId)
                .executeTakeFirst();
            if (!result) {
                return null;
            }

            const u : AdapterUser = {
                id: result.id,
                emailVerified: result.emailVerified ? new Date(result.emailVerified.toString()) : null,
                name: result.name,
                email:  result.email,
                image: result.image
            }
            return u;
        },

        async updateUser(user) {
            if (!user.id) {
                throw new Error("User id is required");
            }
            return db
                .updateTable("next_auth.users")
                .where("id", "=", user.id)
                .set(user)
                .returningAll()
                .$castTo<AdapterUser>()
                .executeTakeFirstOrThrow();
        },

        async deleteUser(userId)  {
            return db
                .deleteFrom("next_auth.users")
                .where("id", "=", userId)
                .returningAll()
                .$castTo<AdapterUser>()
                .executeTakeFirstOrThrow();
        },

        async linkAccount(account) {
            return db
                .insertInto("next_auth.accounts")
                .values({ ...account, id: crypto.randomUUID() })
                .returningAll()
                .$castTo<AdapterAccount>()
                .executeTakeFirstOrThrow()
        },

        async unlinkAccount(account) {
            return db
                .deleteFrom("next_auth.accounts")
                .where("providerAccountId", "=", account.providerAccountId)
                .returningAll()
                .$castTo<AdapterAccount>()
                .executeTakeFirstOrThrow();
        },

        async createSession(session) {
            console.log("Called")
            return db
                .insertInto("next_auth.sessions")
                .values({ ...session, id: crypto.randomUUID() })
                .returningAll()
                .$castTo<AdapterSession>()
                .executeTakeFirstOrThrow();
        },

        async getSessionAndUser(sessionTokenInput) {
            const query = await db
                .selectFrom("next_auth.sessions")
                .innerJoin("next_auth.users", "next_auth.sessions.userId", "next_auth.users.id")
                .selectAll()
                .where("next_auth.sessions.sessionToken", "=", sessionTokenInput)
                .executeTakeFirst();
            if (!query) {
                return null;
            }

            const s : AdapterSession = {
                sessionToken: query.sessionToken,
                userId: query.userId,
                expires: query.expires
            };

            const u: AdapterUser = {
                id: query.userId,
                emailVerified: query.emailVerified,
                email: query.email,
                name: query.name,
                image: query.image
            }

            return {session: s, user: u}
        },

        async updateSession(session) {
            return db
                .updateTable("next_auth.sessions")
                .where("sessionToken", "=", session.sessionToken)
                .set(session)
                .returningAll()
                .$castTo<AdapterSession>()
                .executeTakeFirstOrThrow();
        },

        async deleteSession(sessionToken) {
            return db
                .deleteFrom("next_auth.sessions")
                .where("sessionToken", "=", sessionToken)
                .returningAll()
                .$castTo<AdapterSession>()
                .executeTakeFirst()
        },

        async createVerificationToken(verificationToken) {
            return db
                .insertInto("next_auth.verification_tokens")
                .values({ ...verificationToken })
                .returningAll()
                .$castTo<VerificationToken>()
                .executeTakeFirstOrThrow();
        },

        async useVerificationToken(params) {
            const result = await db
                .deleteFrom("next_auth.verification_tokens")
                .where("identifier", "=", params.identifier)
                .where("token", "=", params.token)
                .returningAll()
                .$castTo<VerificationToken>()
                .executeTakeFirst();
            if (!result) {
                return null;
            }
            return result;
        },

        async getUserByEmail(email : string) {
            const user = await db
                .selectFrom("next_auth.users")
                .selectAll()
                .where("email", "=", email)
                .$castTo<AdapterUser>()
                .executeTakeFirst();
            if (!user) {
                return null;
            }
            return user;
        },
    };
}