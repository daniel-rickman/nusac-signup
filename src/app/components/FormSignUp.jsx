import {Button, Checkbox, Container, Flex, Group, NumberInput, Progress, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {count, insert} from "../db/actions";
import {notifications} from "@mantine/notifications";
import {useCounter} from "@mantine/hooks";
import Form from "../components/Form";

async function OnSubmit(values, qualification) {
    await insert({
        firstName: values.firstName,
        lastName: values.lastName,
        studentId: values.studentId,
        email: values.email,
        qualification: qualification
    }).then(() => {
            notifications.show({
                title: 'Success!',
                message: "You have been successfully signed up to your chosen course",
                color: "green"
            })
    }).catch(() => {
        notifications.show({
            title: 'An error occurred',
            message: "Please double check the details you've given us. If this error persists, please email us at training@uonsubaqua.com.",
            color: "red"
        })})
}

function getMax(qualification) {
    if (qualification === "od") {
        return 2;
    } else if (qualification === "sd") {
        return 20;
    }
    return 0;
}

const FormSignUp = ({qualification, children}) => {
    let color
    switch(qualification) {
        case "od":
            color = "blue";
            break;
        case "sd":
            color = "yellow";
            break;
        default:
            color = "white"
            break;
    }

    const [counter, setCounter] = useCounter(0)
    count(qualification).then(result => {
        setCounter.set(result)
    });

    return (
        <div>
            {(counter !== null && counter >= 0) &&  <Container className="py-5">
                <Progress
                    className="h-9"
                    styles={() => ({
                        label: {
                            size: "2xl"
                        }
                    })}
                    size="2xl"
                    radius="md"
                    animate={true}
                    sections={[
                        { value: (counter / getMax(qualification) * 100), color: (counter >= getMax(qualification) ? "red" : color)}
                    ]}
                />
                <p className="text-center font-semibold">{(counter >= getMax(qualification)) ? "This course is full! Feel free to sign up below and we'll add you to our waiting list!" : "Spaces: " + counter + "/" + getMax(qualification)}</p>
            </Container>}
            <Form qualification={qualification} color={color}/>
        </div>
    )
}

export default FormSignUp