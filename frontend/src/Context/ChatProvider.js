import { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    // const navigate = useNavigate()
    const [user, setUser] = useState()
    const[chats,setChats]=useState([])
    const[selectedChats,setSelectedChats]=useState()
    const[notification,setNotification]=useState([])
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
        if (!userInfo) {
            // navigate('/')
        }
    }, [])

    return (
        <ChatContext.Provider value={{ user, setUser ,chats,setChats,selectedChats,setSelectedChats,notification,setNotification }}>
            {children}
        </ChatContext.Provider>
    )

}

export const ChatState=()=>{
    return useContext(ChatContext)
}

export default ChatProvider