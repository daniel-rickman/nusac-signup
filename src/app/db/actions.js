'use server'

import {db} from "../db/database";

export async function insert(data) {

    return await db
        .insertInto("entries")
        .values({ id: crypto.randomUUID(), ...data })
        .execute()
}

export async function count(qualification_type) {

    return (await db
        .selectFrom("entries")
        .selectAll()
        .where("qualification", "=", qualification_type)
        .execute()).length
}