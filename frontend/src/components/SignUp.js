import React, { useState } from 'react'
import { VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [photo, setPhoto] = useState("")
    const [show, setShow] = useState(false)
    const[isLoading,setIsLoading]=useState(false)
    const toast = useToast()
    const navigate= useNavigate()
    const handleShow = () => {
        setShow(!show)
    }
    const submitHandler = async () => {
        setIsLoading(true)
        if (!name || !email || !password ||!confirmPassword) {
            toast({
                title: 'Enter all Fields',
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
            setIsLoading(false)
            return
        }
        if (password !== confirmPassword) {
            toast({
                title: 'Password do not match',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            setIsLoading(false)
            return
        }
        try{
            const data = await axios.post('http://localhost:5000/api/users/', {
                name, email, password
            },
             {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            setIsLoading(false)
            toast({
                title: 'SignUp Success',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate('/chats')
        }
        catch(error){
            toast({
                title: 'Some Error Occured',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        
        
    }
    return (
        <VStack spacing="5px">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter Your Name"
                    value={name} onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        placeholder="Enter Password"
                        type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}

                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShow}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        placeholder="Confirm password"
                        type={show ? "text" : "password"}
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShow}>
                            {show ? " Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                //   onChange={(e)=>postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }} onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default SignUp