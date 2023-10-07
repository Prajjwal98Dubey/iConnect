import React from 'react'
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "./config/chatAlgo";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from './ProfileModal';
import { ChatState } from '../Context/ChatProvider';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import Scrollable from './Scrollable';


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChats, setSelectedChats, user } =
    ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState()
  const toast = useToast();
 
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            authorization: `Bearer ${user.token}`
          }
        }
        const { data } = await axios.post('http://localhost:5000/api/message/', {
          content: newMessage,
          chatId: selectedChats._id
        }, config)
        console.log(data)
        setMessages([...messages, data])
        setNewMessage("")
      }
      catch (error) {
        //   toast({
        //     title: 'Error Occured',
        //     status: 'error',
        //     duration: 9000,
        //     isClosable: true,
        //     position: "top-left"
        // })
        console.log("Error Occured")
      }

    }


  }
  const typingHandler = (event) => {
    setNewMessage(event.target.value)
  }
  const fetchMessages = async () => {
    if (!selectedChats) {
      return
    }
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      }
      setLoading(true)
      const { data } = await axios.get(`http://localhost:5000/api/message/${selectedChats._id}`, config)
      setMessages(data)
      setLoading(false)
      console.log(messages)
    }
    catch (error) {
      console.log("error occured")
    }

  }
  useEffect(() => {
    
    fetchMessages()
  }, [selectedChats])
  return (
    <>
    {console.log(selectedChats)}
      {selectedChats ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChats("")}
            />
            {messages &&
              (!selectedChats.isGroupChat ? (
                <>
                  {getSender(user, selectedChats.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChats.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChats.chatName}
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                </>
              ))}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className='messages'><Scrollable messages={messages}/></div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={2}>
              <Input
                variant="filled"
                bg="gray.200"
                placeholder="Enter a message"
                onChange={typingHandler}
                value={newMessage}
              >
              </Input>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box className="chatSpace" d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  )
}

export default SingleChat