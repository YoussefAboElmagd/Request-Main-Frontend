import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Divider,
} from "@mui/joy";
import { t } from "i18next";
import { BiSearch } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { IoAttach } from "react-icons/io5";
import RecordAudio from "../../Components/RecordAudio/RecordAudio";
import CustomAudioPlayer from "../../Components/UI/AudioPlayer/AudioPlayer";
import "./style.scss";
import { FaArrowLeft } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Inbox = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet.",
      time: "10:00 AM",
      type: "send",
    },
    { id: 2, text: "Hello!", time: "10:01 AM", type: "receive" },
    { id: 3, text: "How are you?", time: "10:02 AM", type: "send" },
    {
      id: 4,
      text: "I'm good, thanks! You?",
      time: "10:03 AM",
      type: "receive",
    },
  ]);

  const handleGroupClick = (groupId) => {
    setActiveGroup(groupId);
    setIsChatVisible(true);
  };

  const addAudioMessage = (url) => {
    const newMessage = {
      id: messages.length + 1,
      text: "Audio message",
      time: new Date().toLocaleTimeString(),
      type: "send",
      audio: url,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addAttachmentMessage = (file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif"].includes(extension);
    const isPdf = extension === "pdf";
    const fileUrl = URL.createObjectURL(file);

    const newMessage = {
      id: messages.length + 1,
      time: new Date().toLocaleTimeString(),
      type: "send",
      attachment: { url: fileUrl, isImage, isPdf },
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = () => {
    if (messageInput.trim() === "") return;
  
    const newMessage = {
      id: messages.length + 1,
      text: messageInput,
      time: new Date().toLocaleTimeString(),
      type: "send",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) addAttachmentMessage(file);
  };

  const renderMessageContent = (message) => {
    if (message.attachment?.isImage) {
      return (
        <div className={`relative max-w-xs ${message.type === "send" ? '' : ""}`}>
          <img
            src={message.attachment.url}
            alt="attachment"
            className="w-full  max-w-xs rounded-lg"
          />{" "}
          <span
            className={`absolute  bottom-2 p-2  rounded-full text-white ${
              message.type === "send"
                ? "right-2 bg-linear_1 "
                : "left-2 bg-linear_3  "
            } text-xs`}
          >
            {message.time}
          </span>
        </div>
      );
    }
    if (message.attachment?.isPdf) {
      return (
        <div className="relative">
          <a
            href={message.attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Open PDF
          </a>
          <span
            className={`absolute  bottom-2 p-2  rounded-full text-white ${
              message.type === "send"
                ? "right-2  "
                : "left-2   "
            } text-xs`}
          >
            {message.time}
          </span>
        </div>
      );
    }
    if (message.audio) {
      return (
        <div className="relative max-w-xs">
          <CustomAudioPlayer
            src={message.audio}
            className={`${
              message.type === "send"
                ? "bg-linear_1 send"
                : "bg-linear_3 receive"
            }`}
          />
          <span
            className={`absolute  bottom-2 p-2  rounded-full text-white ${
              message.type === "send"
                ? "right-2  "
                : "left-2   "
            } text-xs`}
          >
            {message.time}
          </span>
        </div>
      );
    }
    return (  
      <div
        className={`message ${
          message.type === "send" ? "text-start" : "text-end"
        } relative p-2 m-2 max-w-md ${
          message.type === "send" ? "bg-linear_1 send" : "bg-linear_3 receive"
        } text-white`}
      >
        <div className="text">{message.text}</div>
        <span
          className={`absolute bottom-2 ${
            message.type === "send" ? "right-2" : "left-2"
          } text-xs`}
        >
          {message.time}
        </span>
      </div>
    );
  };

  return (
    <div className="Inbox">
      <h1
        className={`title font-inter font-bold text-xl lg:text-3xl ${
          isChatVisible ? "hidden" : ""
        } lg:block text-black m-2`}
      >
        {t("Inbox")}
      </h1>
      <Divider className={`${isChatVisible ? "hidden" : ""} lg:block`} />
      {isChatVisible && (
        <div className="sm_header bg-white p-2 rounded-2xl w-full md:hidden flex items-center  justify-between">
          <div className="back">
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full text-purple"
              onClick={() => setIsChatVisible(false)}
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="title text-purple  font-bold text-lg">Inbox</div>
        </div>
      )}
      <div className="container flex items-center justify-center  md:gap-10 ">
        <div
          className={`Inbox_sidebar bg-white rounded-3xl shadow-sm p-2 m-2 ${
            isChatVisible ? "hidden" : ""
          } lg:flex flex-col h-[70vh]`}
        >
          <div className="Inbox_search relative w-full my-4">
            <input
              type="text"
              className="w-full px-16 py-2 rounded-xl text-sm border"
              placeholder={t("Search")}
            />
            <span className="absolute left-10 top-3 w-6 h-6 text-gray">
              <BiSearch />
            </span>
          </div>
          {/* Group List */}
          <AccordionGroup>
            <Accordion>
              <AccordionSummary className="p-2 m-2 shadow-lg rounded-3xl">
                {t("Project Name")}
              </AccordionSummary>
              <AccordionDetails>
                <div
                  className={`group-item flex items-center gap-2 p-2 m-1 rounded-3xl cursor-pointer ${
                    activeGroup === 1 ? "active" : ""
                  }`}
                  onClick={() => handleGroupClick(1)}
                >
                  <img
                    src="https://via.placeholder.com/150"
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="content flex flex-col">
                    <span>Jasser Mohamed</span>
                    <span>Contractor</span>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </div>

        <div
          className={`chat bg-white rounded-3xl ${
            !isChatVisible ? "hidden" : ""
          } shadow-sm p-2 mֱx-2 my-1 h-[90vh] lg:h-[70vh] max-w-3xl w-full`}
        >
          <div className="header flex items-center justify-between m-2 ">
            <div className="flex gap-2">
              <img
                src="https://via.placeholder.com/150"
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="content flex flex-col">
                <span>Jasser Mohamed</span>
                <div className="state flex items-center gap-1">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      isOnline ? "bg-green" : "bg-gray"
                    }`}
                  />
                  <span>{isOnline ? "online" : "offline"}</span>
                </div>
              </div>
            </div>

            <div className="dot">
              <HiOutlineDotsHorizontal />
            </div>
          </div>
          <Divider />
          <div className="chat_container overflow-y-scroll relative  max-h-[70vh] lg:h-[50vh] my-3">
            {messages.map((msg) => (
              <div key={msg.id} className={` ${msg.type === "send" ? "" : ""}`}>
                {renderMessageContent(msg)}
              </div>
            ))}
          </div>
          <div className="footer flex items-center gap-1 md:gap-2 p-2 md:p-2 ">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type something"
              className={`w-full p-2 rounded-md border ${
                isRecording ? "hidden" : ""
              }`}
            />
            <RecordAudio
              setIsRecording={setIsRecording}
              onAddAudioMessage={addAudioMessage}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <button
              onClick={() => document.getElementById("fileInput").click()}
            >
              <IoAttach className="text-yellow w-8 h-8" />
            </button>
            <button onClick={sendMessage} className="bg-purple p-2 rounded-md">
              <IoIosSend className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
