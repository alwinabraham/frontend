import React,{useState,useEffect} from 'react'
import { getUser } from '../../api/ChatRequests'
import { getMessages } from '../../api/MessageRequests'
import Timeago from 'react-timeago'
import InputEmoji from "react-input-emoji"
import { addMessage } from '../../api/MessageRequests'
import '../Chats'

function isUrl(str) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(str);
}

const ChatBox = ({ chat, currentUserId, setSendMessage,  receivedMessage }) => {

    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [update,setUpdate] = useState(false)
 
    const handleChange = (newMessage)=> {
      setNewMessage(newMessage)
    }
  
    // fetching data for header
    useEffect(() => {
      const userId = chat?.members?.find((id) => id !== currentUserId);
      const getUserData = async () => {
        try {
          const { data } = await getUser(userId);
          setUserData(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      if (chat !== null) getUserData();
    }, [chat, currentUserId]);
  
  
    // fetch messages
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const { data } = await getMessages(chat._id);
          setMessages(data);
          console.log("messages",data);
        } catch (error) {
          console.log(error);
        }
      };

      if (chat !== null) fetchMessages();
    }, [chat]);
  
    // Send Message
    const handleSend = async(e)=> {
      e.preventDefault()
      const message = {
        senderId : currentUserId,
        text: newMessage,
        chatId: chat._id,
        createdAt:new Date()
    }
    const receiverId = chat.members.find((id)=>id!==currentUserId);
    // send message to socket server
    setSendMessage({...message, receiverId})
    setUpdate(!update)
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    }
    catch
    {
      console.log("error")
    }
  }
  
  // Receive Message from parent component
  useEffect(()=> {
    if (receivedMessage !== null && receivedMessage?.chatId === chat?._id) {
      setMessages([...messages, receivedMessage]);
    }
  },[receivedMessage])

  return (
    <>
        <div className='flex items-center'>
            <img className="w-16 rounded-full overflow-hidden" src={userData?.imageName} />
            <div className="name" style={{ fontSize: "0.8rem" }}>
            <span className='font-bold text-xl dark:text-gray-200 ml-3'>{userData?.name} {userData?.lastName}</span>
            </div>
        </div>
        <div  className='ChatBox-container dark:bg-gray-800 ' style={{
            position: "relative",
            display: "grid",
            gap: "1rem",
            }}>
        {chat ? (
            <>
            <div className="chat-body" style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
              overflowY: "scroll",
              maxHeight: "calc(80vh - 150px)",
            }}>
              {messages?.map((message) => {
                const isLink = isUrl(message.text);
                const messageClass = message.senderId === currentUserId ? "message own" : "message";
                const align = message.senderId === currentUserId ? "flex-end" : "flex-start";

                return (
                  <div key={message.id} className={messageClass} style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: align,
                  }}>
                    {isLink ? (
                      <a className='text-blue-500 underline hover:text-blue-700 dark:text-blue-500' href={message.text} target="_blank" rel="noopener noreferrer">{message.text}</a>
                    ) : (
                      <span className='dark:text-gray-300'>{message.text}</span>
                    )}
                    <span style={{ fontSize: "0.7rem", color: "#555" }}>
                      <Timeago date={message.createdAt} />
                    </span>
                  </div>
                );
              })}
            </div>
            <div className='flex'>
                <div style={{ fontSize: "1.5rem" }}>+</div>
                <InputEmoji value={newMessage} onChange={handleChange} />
                <button className='send-button button' style={{
                background: "#3f51b5",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                }} onClick={handleSend}>Send</button>
            </div>
            </>
        ) : (
            <span className='chatbox-empty-message dark:text-gray-300' style={{
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            fontSize: "20px",
            }}>
            Tap on a Chat to Start Conversation...
            </span>
        )}
        </div>
    </>
  )
}

export default ChatBox;
