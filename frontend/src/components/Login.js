import React, { useState } from 'react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import  {useNavigate} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const navigate= useNavigate()
  const handleShow = () => {
    setShow(!show)
  }
  const submitHandler = async () => {
    if (!email || !password) {
      setIsLoading(true)
      toast({
        title: 'Enter All Fields',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })
      setIsLoading(false)
      return
    }
    try{
      const { data } = await axios.post("http://localhost:5000/api/users/login", {
      email, password
    },
      {
        headers: {
          'Content-type': 'application/json'
        }
      })
      toast({
        title: 'Login Success',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setIsLoading(false)
      localStorage.setItem('userInfo',JSON.stringify(data))
      navigate('/chats')
    }
    catch(error){
      toast({
        title: 'Invalid Credentials',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      setIsLoading(false)
    }
    
  }
  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShow}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={isLoading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login