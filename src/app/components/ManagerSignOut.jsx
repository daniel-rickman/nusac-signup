"use client"

import Header from "../components/Header";
import {Button, Group} from "@mantine/core";
import {signOut, useSession} from "next-auth/react";

const FormSignUp = ({qualification, children}) => {
    const { data: session, status } = useSession({ required: true })
    return (
        <div>
            <Header test="#192a56"></Header>
            <Group className="pr-10" position="right" mt="md">
                <p>User: {session?.user?.email}</p>
                <Button className="bg-red-600" variant="filled" color="red" type="submit" onClick={() => signOut()}>Log Out</Button>
            </Group>
        </div>
    )
}

export default FormSignUp