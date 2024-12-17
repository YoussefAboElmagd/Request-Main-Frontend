import { createContext, useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const socket = useSocket();

  // Utility function to generate the channel name dynamically
  const getChannelName = (message) => {
    if (message.group) {
      return `message_${message.sender._id}_${message.project}_${message.group._id}`;
    }
    return `message_${message.sender}_${message.project}_${message.receiver}`;
  };

  // Function to handle incoming messages and add them to state
  const handleMessage = (data) => {
    console.log("Received message via socket:", data);
    const newMessage = {
      date: data?.createdAt,
      content: data?.content,
      senderName: data?.senderName,
      sender: data?.sender,
      type: data?.type,
      docs: data?.docs,
      voiceNote: data?.voiceNote,
      _id: data?.id,
    };
    console.log("newMessage:", newMessage);

    // Add the new message if valid
    addMsg(newMessage);
  };

  // // Function to add a new message to the state
  const addMsg = (newMessage) => {
    if (newMessage) {
      const hasValidContent =
        (typeof newMessage.content === "string" &&
          newMessage.content.trim() !== "" &&
          newMessage.content !== undefined) ||
        (typeof newMessage.docs === "string" &&
          newMessage.docs.trim() !== "" &&
          newMessage.docs !== null) ||
        (Array.isArray(newMessage.voiceNote) &&
          newMessage.voiceNote.length > 0);

      if (hasValidContent) {
        setMessages((prevMessages) => {
          const isDuplicate = prevMessages.some(
            (msg) => msg._id === newMessage._id
          );

          if (!isDuplicate) {
            return [newMessage, ...prevMessages];
          }

          return prevMessages;
        });
      } else {
        console.warn("Message is invalid and will not be added:", newMessage);
      }
    }
  };

  // const addMsg = (newMessage) => {
  //   if (newMessage) {
  //     // Check if any valid content exists in the message
  //     const hasValidContent =
  //       newMessage.content || newMessage.docs || newMessage.voiceNote;

  //     if (hasValidContent) {
  //       setMessages((prevMessages) => {
  //         // Check if the message is a duplicate based on _id and content validity
  //         const isDuplicate = prevMessages.some(
  //           (msg) =>
  //             msg._id === newMessage._id || // Check for duplicate _id
  //             (!hasValidContent && msg._id === newMessage._id) // Also check if invalid message with same _id
  //         );

  //         if (!isDuplicate) {
  //           // Add the new message to the state if it's not a duplicate
  //           return [newMessage, ...prevMessages];
  //         }

  //         return prevMessages;
  //       });
  //     } else {
  //       console.warn("Message is invalid and will not be added:", newMessage);
  //     }
  //   }
  // };

  useEffect(() => {
    if (!socket) return;

    // Listen to dynamically constructed channels based on sender, receiver, project, and group
    const activeChannels = new Set();

    const listenToChannel = (message) => {
      const channel = getChannelName(message);

      if (!activeChannels.has(channel)) {
        socket.on(channel, handleMessage);
        activeChannels.add(channel);
        // console.log(`Listening to channel: ${channel}`);
      }

      console.log(
        message.group
          ? `Listening to group: ${message.group._id}`
          : `Listening to chat between ${message.sender} & ${message.receiver}`
      );
    };

    // Listen to each message channel dynamically
    messages.forEach(listenToChannel);

    // Cleanup socket listeners when component unmounts or dependencies change
    return () => {
      activeChannels.forEach((channel) => {
        socket.off(channel, handleMessage);
        // console.log(`Disconnected from channel: ${channel}`);
      });
    };
  }, [socket, messages]);

  return (
    <ChatContext.Provider value={{ messages, addMsg, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
