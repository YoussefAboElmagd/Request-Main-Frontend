import { createContext, useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data) => {
      console.log("Received message via socket:", data);

      const newMessage = {
        date: data?.createdAt,
        content: data?.content,
        senderName: data?.senderName,
        sender: data?.sender,
        docs: data?.docs,
        voiceNote: data?.voiceNote,
        _id: data.id,
      };
      console.log("newMessage", newMessage);

      // Add the new message to the state
      addMsg(newMessage);
    };

    // Listen to dynamically constructed channels based on sender, receiver, project, and group
    const listenToChannel = (message) => {
      const channel = message.group
        ? `message_${message.sender._id}_${message.project}_${message.group}`
        : `message_${message.sender}_${message.project}_${message.receiver}`;

      socket.on(channel, handleMessage);
      console.log(`Listening to channel: ${channel}`);
    };

    messages.forEach(listenToChannel);

    console.log("Connected to chat socket");

    // Cleanup the socket event listener when the component unmounts
    return () => {
      messages.forEach((message) => {
        const channel = message.group
          ? `message_${message.sender._id}_${message.project}_${message.group}`
          : `message_${message.sender}_${message.project}_${message.receiver}`;
        socket.off(channel, handleMessage);
      });
      console.log("Disconnected from message channels");
    };
  }, [socket, messages]);

  const addMsg = (newMessage) => {
    if (newMessage) {
      setMessages((prevMessages) => {
        const isDuplicate = prevMessages.some(
          (msg) => msg._id === newMessage._id
        );

        if (!isDuplicate) {
          return [newMessage, ...prevMessages];
        }

        return prevMessages;
      });
    }
  };

  return (
    <ChatContext.Provider value={{ messages, addMsg, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
