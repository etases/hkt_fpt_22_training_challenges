import * as React from "react";
import { Box, RadioGroup, Stack, Radio, Flex, Button } from "@chakra-ui/react";
import { Input } from "~/components/input";
import { useState } from "react";
import { plug } from "@canisters/plug";
import { Customer } from "@canisters/plug/plug.did";


export function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState('');
    const [sex, setSex] = useState(false);
    const [dob, setDOB] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');


    return (

    <Box flexDirection='column'>
        <div>
            <label >
            First Name:e
            <Input inputProps={{type: 'text', border: '1px solid black', onChange: (e) => setFirstName(e.target.value)}}/>
            </label>
        </div>
        <div>
        <label >
            Last Name:
        <Input inputProps={{type: 'text', border: '1px solid black', onChange: (e) => setLastName(e.target.value)}}/>
        </label>
        </div>
        <div>
            <label>
            Sex: &nbsp;
            <RadioGroup defaultValue='2'>
                <Stack spacing={5} direction='row'>
                    <Radio colorScheme='red' value='1'>
                    Male
                    </Radio>
                    <Radio colorScheme='green' value='2'>
                    Female
                    </Radio>
                </Stack>
            </RadioGroup>
            </label>
        </div>
        <div>
        <label >
            Date of birth:
            <Input inputProps={{type: 'date', onChange: (e) => setDOB(e.target.value)}}/>
            </label>
        </div>
        <div>
        <label >
            Phone:
            <Input inputProps={{type: 'text', border: '1px solid black', onChange: (e) => setPhone(e.target.value)}}/>
            </label>
        </div>
        <div>
        <label >
            Address:
            <Input inputProps={{type: 'text', border: '1px solid black', onChange: (e) => setAddress(e.target.value)}}/>
            </label>
        </div>
        <Stack spacing={7} direction='row' alignItems='center'>
                <Button colorScheme='teal' size='sm' onClick={async () => {
                    const customer : Customer = {
                        firstName,
                        lastName,
                        address,
                        birthday : dob,
                        phone,
                        isFemale : sex
                    };
                    await plug.addCustomer(customer);
                }}>
                Save
            </Button>
            <Button colorScheme='teal' size='sm'>
                Cancel
            </Button>
        </Stack>
        </Box>
    )
}