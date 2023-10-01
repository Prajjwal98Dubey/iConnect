import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChatState } from '../Context/ChatProvider'
import SideBar from './SideBar'
import MyChat from './MyChat'
import ChatSection from './ChatSection'
import { Box } from '@chakra-ui/react'
const ChatPage = () => {
    const {user}=ChatState()
    
    return (
        <div style={{width:"100%"}}>
         {user && <SideBar/>}
         <Box  d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px" color="black">
         {user && <MyChat/>}
         {user && <ChatSection/>}
         </Box>
        </div>
        
    )
}

export default ChatPage