import React from 'react'
import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";
import Login from './Login';
import SignUp from './SignUp';

const HomePage = () => {
  const scrollBottom=()=>{
    window.scrollTo({
      top:document.body.scrollHeight,
      behavior:'smooth'
    })
  }
  return (
    <div className='home'>
      <div className='home1'>iConnect
      <div className='home1-child'>Start conversation with your closed ones instantly...</div>
      <div className='home1-child2'><button onClick={scrollBottom} className='btn'>Start Now</button></div>
      </div>
      <div>
    <Container maxW="xl" centerContent className="home2">
    <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg="white"
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Text fontSize="4xl" textAlign={'center'} fontFamily="Bebas Neue">
        Start Chat Now...
      </Text>
    </Box>
    <Box bg="white" w="100%" p={4} borderRadius="xl" borderWidth="5px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    </div>
    </div>
  )
}

export default HomePage