"use client"

import {Button, Flex, Card, Divider} from "@mantine/core";
import React from 'react';
import Header from "../app/components/Header";
import FormSignUp from "../app/components/FormSignUp"
import {useRouter} from "next/navigation";

export default function Home() {
    const [qualification, setQualification] = React.useState("none")
    let backgroundColor

    switch(qualification) {
        case "od":
            backgroundColor = "#2979ff";
            break;
        case "sd":
            backgroundColor = "#ffc107";
            break;
        case "dl":
            backgroundColor = "#388e3c";
            break;
        default:
            backgroundColor = "#192a56";
            break;
    }

    const router = useRouter()

    return (
        <div>
            <Header test={backgroundColor}>
                <p className="text-white">Welcome! If you're reading this page, you're probably interested in learning to dive with us.</p>
                <p className="text-white text-center pb-3">Don't delay! Our courses have limited availability.</p>
            </Header>


            <Flex className="py-7 justify-center" mih={50} gap="md" align="center" direction="row">
                <Card className="border-t-8 border-t-blue-500 max-w-sm" shadow="sm" padding="lg" radius="md">

                    <h3 className="text-center text-2xl">New to Diving?</h3>
                    <p className="text-center pt-3">If you have not completed a diving qualification before, the Ocean Diver course is for you! No prerequisites required!</p>
                    <Button variant="outline" color="blue" fullWidth mt="md" radius="sm" onClick={() => {
                        setQualification("od")
                        router.refresh()
                    }}>
                        Sign up for Ocean Diver
                    </Button>
                </Card>
                <Card className="border-t-8 border-t-amber-500 max-w-sm" shadow="sm" padding="lg" radius="md">

                    <h3 className="text-center text-2xl">Looking to go further?</h3>
                    <p className="text-center pt-3">If you already hold an entry-level qualification, Sports Diver is your next step in BSAC’s Diver Training Programme.</p>
                    <Button variant="outline" color="orange" fullWidth mt="md" radius="md" onClick={() => {
                        setQualification("sd")
                        router.refresh()
                    }}>
                        Sign up for Sports Diver
                    </Button>
                </Card>
                <Card className="border-t-8 border-t-green-700 max-w-sm" shadow="sm" padding="lg" radius="md">

                    <h3 className="text-center text-2xl">Experienced at diving?</h3>
                    <p className="text-center pt-3">We provide training for the Dive Leader qualification and higher. Please contact the training officers to discuss this. </p>
                    <Button variant="outline" color="green" fullWidth mt="md" radius="sm" onClick={() => setQualification("dl")}>
                        Email us at training@uonsubaqua.com
                    </Button>
                </Card>
            </Flex>
            <Divider my="sm" size="lg"/>

            {(qualification === "od" || qualification === "sd") && <FormSignUp qualification={qualification}/>}

        </div>
    )
}
