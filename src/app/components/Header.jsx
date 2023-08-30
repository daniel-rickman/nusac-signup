'use client'

import Image from "next/image";
import NusacIcon from "../../../public/logo-scuba-white-trimmed.svg";
import {Flex} from "@mantine/core";

const Header = ({test, children}) => {
    return (
        <Flex
            mih={50}
            bg={test}
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
        >
            <Image width={64} height={64} src={NusacIcon} alt="Icon"/>
            <h1 className="text-white font-bold text-4xl">University of Nottingham Sub Aqua</h1>
            <h2 className="text-white font-semibold text-3xl mb-4">Registration Form</h2>
            {children}
        </Flex>
    )
}

export default Header