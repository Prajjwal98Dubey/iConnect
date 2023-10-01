import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/menu";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useToast } from "@chakra-ui/toast";
// import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import React, { useState } from 'react'
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { Navigate, useNavigate } from "react-router-dom";
import ChatLoading from "./ChatLoading";
import axios from "axios";
import UserItem from "./UserItem";

const SideBar = () => {
    const { user,setSelectedChats, chats,setChats} = ChatState()
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()

    const accessChat = async(userId) => {
        try {
            setLoadingChat(true)
            const config={
                headers:{
                    'Content-type':'Application/json',
                    Authorization:`Bearer ${user.token}`
                }
            }
            const {data } =await axios.post("http://localhost:5000/api/chats",{userId},config)
            if(!chats.find((c)=>c._id===data._id)){
                setChats([data,...chats])
            }
            setSelectedChats(data)
            setLoadingChat(false)
            onClose()
            
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

    const handleLogout = () => {
        localStorage.removeItem("userInfo")
        navigate('/')

    }
    const handleSearch = async () => {
        if (!search) {
            toast({
                title: 'Search Some name',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: "top-left"
            })
            setLoading(false)
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`http://localhost:5000/api/users?search=${search}`, config)
            setSearchResult(data)
            setLoading(false)

        }
        catch (error) {
            toast({
                title: 'Not Authorised',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top-left"
            })
            setLoading(false)

        }
    }

return(
    <>
        <Box
            d="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth="5px"
        >
            <div className="chatpage">
                <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                    <Button variant="ghost" onClick={onOpen} >
                        <i className="fas fa-search"></i>
                        <Text d={{ base: "none", md: "flex" }} px={4}>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    Talk-A-Tive
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                                src={user.photo}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>Profile</MenuItem></ProfileModal>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>

                </div>
            </div>
        </Box>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                <DrawerBody>
                    <Box d="flex" pb={2}>
                        <Input
                            placeholder="Search by name or email"
                            mr={2}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button onClick={handleSearch}>Go</Button>
                    </Box>
                    {loading ? (
                        <ChatLoading />
                    ) : searchResult?.map(user =>
                        <UserItem
                            key={user._id}
                            user={user}
                            handleFunction={() => accessChat(user._id)}

                        />)}
                    {loadingChat && <Spinner ml="auto" d="flex" />}
                </DrawerBody>
            </DrawerContent>
        </Drawer>


    </>
)
                    }



export default SideBar