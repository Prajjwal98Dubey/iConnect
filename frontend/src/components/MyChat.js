
import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import axios from 'axios'
import { useToast } from "@chakra-ui/toast";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import ChatLoading from './ChatLoading';
import { Button } from '@chakra-ui/react';
import { getSender } from './config/chatAlgo';
import GroupChatModal from './GroupChatModal';

const MyChat = ({fetchAgain}) => { 
    const[loggedUser,setLoggedUser]=useState("")
    const toast = useToast()
    const{user ,selectedChats,setSelectedChats,chats,setChats} = ChatState()
    const fetchChats=async()=>{
        try {
            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            const {data} = await axios.get('http://localhost:5000/api/chats',config)
            console.log(data)
            setChats(data)
        } catch (error) {
            toast({
                title: 'Not Authorised',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top-left"
            })
        }

    }
    useEffect(()=>{
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
        fetchChats()
    },[fetchAgain])
  return (
    <>
    <Box className='mychat'
      d={{ base: selectedChats ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
        <Button
            d="flex"
            m="5"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
        
        
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChats(chat)}
                cursor="pointer"
                bg={selectedChats === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChats === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>

    </>
  )
}

export default MyChat