import { createContext, useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Function to handle dynamic listening based on message channels
    const handleMessage = (data) => {
      console.log("Received message via socket:", data);

      const newMessage = {
        date: data?.createdAt,
        content: data?.content,
        sender: data?.sender,
        receiver: data?.receiver,
        project: data?.project,
        docs: data?.docs,
        voiceNote: data?.voiceNote,
      };
      console.log("newMessage", newMessage);

      // Add the new message to the state
      addMsg(newMessage);
    };

    // // Listen to the general message event (if a general event is expected)
    // socket.on("message_", handleMessage);

    // Listen to dynamically constructed channels based on sender, receiver, project, and group
    const listenToChannel = (message) => {
      const channel = message.group
        ? `message_${message.sender}_${message.project}_${message.group}`
        : `message_${message.sender}_${message.receiver}_${message.project}`;

      socket.on(channel, handleMessage);
      console.log(`Listening to channel: ${channel}`);
    };

    messages.forEach(listenToChannel);

    console.log("Connected to chat socket");

    // Cleanup the socket event listener when the component unmounts
    return () => {
      //   socket.off("message_", handleMessage);
      messages.forEach((message) => {
        const channel = message.group
          ? `message_${message.sender}_${message.project}_${message.group}`
          : `message_${message.sender}_${message.receiver}_${message.project}`;
        socket.off(channel, handleMessage);
      });
      console.log("Disconnected from message channels");
    };
  }, [socket, messages]);

  // Function to send messages, dynamically constructing the channel name based on the message group or receiver
  //   const sendMessage = (message) => {
  //     if (!socket) {
  //       console.error("Socket not initialized.");
  //       return;
  //     }

  //     // Construct the channel name based on whether it's a group message or a direct message
  //     const channel = message.group
  //       ? `message_${message.sender}_${message.project}_${message.group}`
  //       : `message_${message.sender}_${message.receiver}_${message.project}`;

  //     // Emit the message to the backend
  //     socket.emit(channel, {
  //       createdAt: message.createdAt,
  //       content: message.content,
  //       sender: message.sender,
  //       senderName: message.senderName,
  //       receiver: message.receiver,
  //       project: message.project,
  //       docs: message.docs,
  //       voiceNote: message.voiceNote,
  //     });

  //     console.log(`Message sent to ${channel}:`, message);

  //     // Optionally, optimistically update the UI
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   };

  const addMsg = (newMessage) => {
    if (newMessage && newMessage.type) {
      setNotifications((prevMessages) => {
        const isDuplicate = prevMessages.some(
          (msg) => msg._id === newMessage._id
        );

        if (!isDuplicate) {
          return [newMessage, ...newMessage];
        }

        return prevNotifications;
      });
    }
  };

  return (
    <ChatContext.Provider value={{ messages, addMsg, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
