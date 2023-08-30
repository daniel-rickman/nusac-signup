import {insert} from "../db/actions";
import {notifications} from "@mantine/notifications";
import {Button, Checkbox, Container, Group, NumberInput, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {redirect, useRouter} from "next/navigation";

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
        })
    })
}

const Form = ({qualification, color, children}) => {
    const router = useRouter()
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            studentId: '',
            email: '',
            permission: false,
        },

        validate: {
            firstName: (value) => (value == null || value.length < 2 ? 'First name must have at least 2 letters' : null),
            lastName: (value) => (value == null || value.length < 2 ? 'Last name must have at least 2 letters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
            permission: (value) => (value === true ? null : "You must agree to us storing your details")
        },
    });

    return (
        <Container className="bg-white rounded-2xl pb-10" size="lg">
            <form onSubmit={form.onSubmit((values) => {
                OnSubmit(values, qualification).then(r => router.refresh());})
            }>
                <TextInput
                    withAsterisk
                    label="First Name"
                    placeholder=""
                    {...form.getInputProps('firstName')}
                />
                <TextInput
                    withAsterisk
                    label="Last Name"
                    placeholder=""
                    {...form.getInputProps('lastName')}
                />
                <NumberInput
                    placeholder="You can find this on your Profile at https://campus.nottingham.ac.uk. If you're having trouble, leave it blank."
                    label="Student ID Number"
                    hideControls
                    {...form.getInputProps('studentId')}
                />
                <TextInput
                    withAsterisk
                    label="Email"
                    {...form.getInputProps('email')}
                />

                <p className="pt-3">We will only store the information for as long as is necessary. Please consent to us holding your data below:</p>
                <Checkbox
                    mt="md"
                    label="I agree"
                    {...form.getInputProps('permission', { type: 'checkbox' })}
                />

                <Group position="center" mt="md">
                    <Button variant="outline" color={color} type="submit">Sign Up</Button>
                </Group>
            </form>
        </Container>
    )

}

export default Form