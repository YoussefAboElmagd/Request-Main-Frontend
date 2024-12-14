import { useEffect, useState, useCallback } from "react";
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
import {
  getAllGroupsAndMembers,
  getAllProjectsByUser,
  getAllProjectsForUser,
  getMessagesBetweenUsers,
  sendMessage,
} from "../../Services/api";
import { useSelector } from "react-redux";
import i18n from "../../config/i18n";
import ProfileAvatar from "../../Components/UI/profilePic/profilePic";
import Loader from "../../Components/Loader/Loader";
import { CreateGroup } from "../../Components/CreateGroup/CreateGroup";
import { Skeleton } from "@mui/material";
import { CiChat1 } from "react-icons/ci";

const Inbox = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const lang = i18n.language;
  const [loading, setLoading] = useState(true);
  const [ChatLoading, setChatLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [IsSender, setIsSender] = useState();
  const [Projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  console.log(preview);
  console.log(file);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const projectsData = await getAllProjectsByUser(token, userId);

        setProjects(projectsData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChatClick = (member, projectId) => {
    setActiveChat({
      member,
      projectId,
    });

    setIsChatVisible(true);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (activeChat) {
        setChatLoading(true);
        try {
          const messagesData = await getMessagesBetweenUsers(
            token,
            activeChat.projectId,
            userId,
            activeChat.member._id
          );
          setMessages(messagesData.results);

          console.log(
            `Response from get messages between ${userId} & ${activeChat.member._id}`,
            messagesData.results
          );
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setChatLoading(false);
        }
      }
    };

    fetchMessages();
  }, [token, activeChat, userId]);

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

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      // if (messageInput.trim() === "") return;

      const newMessage = {
        sender: userId,
        receiver: activeChat.member._id,
        project: activeChat.projectId,
        isSender: true,
        type: messageInput ? "text" : file ? "doc" : "text",
      };
      if (messageInput) {
        newMessage.content = messageInput;
      }
      console.log(preview, "/", file);

      if (preview?.type === "image") {
        newMessage.docs = file;
      }

      console.log("newMessage:", newMessage);

      const res = await sendMessage(token, newMessage);
      console.log(res);

      setMessageInput("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  const addAttachmentMessage = (file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif"].includes(extension);
    const isPdf = extension === "pdf";
    const isAudio = ["mp3", "wav", "ogg"].includes(extension);
    const fileUrl = URL.createObjectURL(file);

    const newMessage = {
      id: messages.length + 1,
      time: new Date().toLocaleTimeString(),
      type: "send",
      attachment: { url: fileUrl, isImage, isPdf, isAudio },
    };

    // Add the new message to the state
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile); // Create a URL for the file

      const extension = selectedFile.name.split(".").pop().toLowerCase();
      const isImage = ["jpg", "jpeg", "png", "gif"].includes(extension);
      const isPdf = extension === "pdf";
      const isAudio = ["mp3", "wav", "ogg"].includes(extension);

      if (isImage) {
        // Display image preview
        setPreview({
          type: "image",
          url: fileUrl,
        });
      } else if (isPdf) {
        // Display PDF preview or link
        setPreview({
          type: "pdf",
          url: fileUrl,
        });
      } else if (isAudio) {
        // Display audio preview
        setPreview({
          type: "audio",
          url: fileUrl,
        });
      } else {
        // Handle other file types if needed
        setPreview(null);
      }

      // Store the file in the state to be used later
      setFile(selectedFile);
    }
  };

  const handleCancelFile = () => {
    // Reset preview and file state
    setPreview(null);
    setFile(null);
  };

  const handleSearch = useCallback(
    (term) => {
      const filtered = Projects.map((project) => ({
        ...project,
        members: project.members.filter((member) =>
          member.name.toLowerCase().includes(term.toLowerCase())
        ),
      })).filter((project) => project.members.length > 0);
      setFilteredProjects(filtered);
    },
    [Projects]
  );

  // search by project
  // const handleSearch = useCallback(
  //   (term) => {
  //     const filtered = Projects.filter((project) =>
  //       project.name.toLowerCase().includes(term.toLowerCase())
  //     );
  //     setFilteredProjects(filtered);
  //   },
  //   [Projects]
  // );

  useEffect(() => {
    const timer = setTimeout(() => handleSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm, handleSearch]);

  // const renderMessageContent = (message) => {
  //   if (message.docs?.isImage) {
  //     return (
  //       <div
  //         className={`relative max-w-xs ${message.isSender === true ? "" : ""}`}
  //       >
  //         <img
  //           src={message.docs.url}
  //           alt="attachment"
  //           className="w-full  max-w-xs rounded-lg"
  //         />{" "}
  //         <span
  //           className={`absolute  bottom-2 p-2  rounded-full text-white ${
  //             message.isSender === true
  //               ? "right-2 bg-linear_1 "
  //               : "left-2 bg-linear_3  "
  //           } text-xs`}
  //         >
  //           {message.date}
  //         </span>
  //       </div>
  //     );
  //   }
  //   if (message.docs?.isPdf) {
  //     return (
  //       <div className="relative">
  //         <a
  //           href={message.docs.url}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           className="text-blue-500 underline"
  //         >
  //           Open PDF
  //         </a>
  //         <span
  //           className={`absolute  bottom-2 p-2  rounded-full text-white ${
  //             message.sender === userId ? "right-2  " : "left-2   "
  //           } text-xs`}
  //         >
  //           {message.date}
  //         </span>
  //       </div>
  //     );
  //   }
  //   if (message.audio) {
  //     return (
  //       <div className="relative max-w-xs">
  //         <CustomAudioPlayer
  //           src={message.voiceNote}
  //           className={`${
  //             message.sender === userId
  //               ? "bg-linear_1 send"
  //               : "bg-linear_3 receive"
  //           }`}
  //         />
  //         <span
  //           className={`absolute  bottom-2 p-2  rounded-full text-white ${
  //             message.isSender === true ? "right-2  " : "left-2   "
  //           } text-xs`}
  //         >
  //           {message.date}
  //         </span>
  //       </div>
  //     );
  //   }
  //   return (
  //     <div
  //       className={`message  ltr:text-start rtl:text-end
  //         relative p-2 m-2 w-full max-w-md ${
  //           message.sender === userId
  //             ? "bg-linear_1 send"
  //             : "bg-linear_3 receive"
  //         } text-white`}
  //     >
  //       <div className="text">{message.content}</div>
  //       <span className={`absolute bottom-2 rtl:left-2 ltr:right-2 text-xs`}>
  //         {message.date}
  //       </span>
  //     </div>
  //   );
  // };

  const renderMessageContent = (message) => {
    switch (true) {
      case message.docs?.isImage:
        return renderImage(message);
      case message.docs?.isPdf:
        return renderPDF(message);
      case message.audio:
        return renderAudio(message);
      default:
        return renderText(message);
    }
  };

  const renderImage = (message) => (
    <div className={`relative max-w-xs ${message.isSender === true ? "" : ""}`}>
      <img
        src={message.docs.url}
        alt="attachment"
        className="w-full  max-w-xs rounded-lg"
      />{" "}
      <span
        className={`absolute  bottom-2 p-2  rounded-full text-white ${
          message.isSender === true
            ? "right-2 bg-linear_1 "
            : "left-2 bg-linear_3  "
        } text-xs`}
      >
        {message.date}
      </span>
    </div>
  );

  const renderPDF = (message) => (
    <div className="relative">
      <a
        href={message.docs.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Open PDF
      </a>
      <span
        className={`absolute  bottom-2 p-2  rounded-full text-white ${
          message.sender === userId ? "right-2  " : "left-2   "
        } text-xs`}
      >
        {message.date}
      </span>
    </div>
  );

  const renderAudio = (message) => (
    <div className="relative max-w-xs">
      <CustomAudioPlayer
        src={message.voiceNote}
        className={`${
          message.sender === userId ? "bg-linear_1 send" : "bg-linear_3 receive"
        }`}
      />
      <span
        className={`absolute  bottom-2 p-2  rounded-full text-white ${
          message.isSender === true ? "right-2  " : "left-2   "
        } text-xs`}
      >
        {message.date}
      </span>
    </div>
  );

  const renderText = (message) => (
    <div
      className={`message  ltr:text-start rtl:text-end
          relative p-2 m-2 w-full max-w-md ${
            message.sender === userId
              ? "bg-linear_1 send"
              : "bg-linear_3 receive"
          } text-white`}
    >
      <div className="text">{message.content}</div>
      <span className={`absolute bottom-2 rtl:left-2 ltr:right-2 text-xs`}>
        {message.date}
      </span>
    </div>
  );

  const renderSkeletonLoader = () => (
    <div
      className={`message-skeletons flex items-center flex-col ${messages.map(
        (msg) => (msg.isSender === true ? "justify-start " : "justify-end")
      )}`}
    >
      {Array.from({ length: messages.length }).map((_, index) => (
        <div
          key={index}
          className={`skeleton-item  relative p-2 m-2 w-full max-w-md ${ 
            index % 2 === 0 ? "self-start" : "self-end"
          } 

            `}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={400}
            height={30}
            className={`rounded-lg !bg-gray-100`}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="Inbox h-screen overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <>
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
              className={`Inbox_sidebar bg-white rounded-3xl shadow-sm p-2 m-2 mt-4 ${
                isChatVisible ? "hidden" : ""
              } lg:flex flex-col h-[70vh] overflow-y-scroll`}
            >
              <div className="Inbox_search relative w-full my-4">
                <input
                  type="text"
                  className="w-full px-16 py-2 rounded-xl text-sm border"
                  placeholder={t("Search")}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute left-10 top-3 w-6 h-6 text-gray">
                  <BiSearch />
                </span>
              </div>
              <AccordionGroup>
                {filteredProjects
                  .filter(
                    (project) =>
                      project.members &&
                      project.members.length > 0 && // Ensure there are members in the project
                      project.members.some((member) => member._id !== userId) // Ensure at least one member's _id is not equal to userId
                  )

                  .map((project) => (
                    <Accordion key={project._id} className="">
                      <AccordionSummary className="hover:!bg-gray-100 p-2 rounded-lg">
                        {project.name}
                      </AccordionSummary>
                      <AccordionDetails>
                        <>
                          <CreateGroup
                            members={project.members.filter(
                              (member) =>
                                !member.isGroup && member._id !== userId
                            )}
                            projectId={project._id}
                          />

                          {project.combinedList
                            .filter((member) => member._id !== userId)
                            .map((member) => (
                              <div
                                key={member._id}
                                className="group-item flex items-center gap-2 p-2 m-1 rounded-3xl cursor-pointer"
                                onClick={() =>
                                  handleChatClick(member, project._id)
                                }
                              >
                                <ProfileAvatar
                                  profilePic={member?.profilePic}
                                  name={member?.name}
                                />
                                <div className="content flex flex-col">
                                  <span>{member?.name}</span>
                                  <span>{member?.role?.jobTitle}</span>
                                </div>
                              </div>
                            ))}
                        </>
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </AccordionGroup>
            </div>

            {!activeChat && (
              <div className="bg-white rounded-3xl max-w-3xl w-full shadow-sm p-4 mx-2 mt-4 min-h-[70vh] max-h-[90vh] flex flex-col items-center justify-center">
                <span className="material-icons text-gray-300 text-6xl">
                  <CiChat1 />
                </span>
                <h2 className="text-gray-500 text-lg font-semibold">
                  No Active Chat
                </h2>
                <p className="text-gray-400 text-sm">
                  Select a chat from the list to get started, or start a new
                  conversation.
                </p>
              </div>
            )}

            <div
              className={`chat bg-white rounded-3xl ${
                !isChatVisible ? "hidden" : ""
              } shadow-sm p-2 mֱx-2 mt-4 min-h-[70vh] max-h-[90vh]  max-w-3xl w-full`}
            >
              <div className="header flex items-center justify-between m-2 ">
                <div className="flex gap-2">
                  <ProfileAvatar
                    profilePic={activeChat?.member?.profilePic}
                    name={activeChat?.member?.name}
                  />
                  <div className="content flex flex-col">
                    <span>{activeChat?.member?.name || "Loading..."}</span>
                    {activeChat?.member?.isGroup ? (
                      <div className="avatars flex items-center  -space-x-2">
                        {activeChat?.member?.users?.slice(0, 3).map((user) => (
                          <ProfileAvatar
                            key={user._id}
                            profilePic={user?.profilePic}
                            name={user?.name}
                            className={`!w-6 !h-6 text-xs font-normal border border-gray-100 `}
                          />
                        ))}
                        {activeChat?.member?.users?.length > 3 && (
                          <div className="avatar-placeholder w-6 h-6 flex items-center justify-center text-xs font-normal border border-gray-100">
                            +{activeChat?.member?.users.length - 3}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="state flex items-center gap-1">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            isOnline ? "bg-green" : "bg-gray"
                          }`}
                        />
                        <span>{isOnline ? "online" : "offline"}</span>
                      </div>
                    )}
                  </div>
                </div>
                {activeChat?.member?.isGroup ? (
                  <div>add member</div>
                ) : (
                  <div className="dot">
                    <HiOutlineDotsHorizontal />
                  </div>
                )}
              </div>
              <Divider />
              <div className="chat_container overflow-y-scroll relative  h-[70vh] lg:h-[50vh] my-3 ">
                {ChatLoading
                  ? renderSkeletonLoader()
                  : messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-center ${
                          msg.sender !== userId
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >
                        {renderMessageContent(msg)}
                      </div>
                    ))}
              </div>
              <div className="preview relative flex items-center justify-center" >
                {preview && preview.type === "image" && (
                  <div className=" -bottom-10 p-2 absolute bg-gray-50  rounded-md">
                    <img
                      src={preview.url}
                      alt="File preview"
                      className="preview-image w-[80vh] h-[40vh] object-contain rounded-md"
                    />

                    <div className="actions mt-1 flex items-center justify-end gap-3">
                      <button
                        onClick={handleCancelFile}
                        className="p-2 font-bold text-red"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSendMessage}
                        className="py-2 px-4 font-bold bg-purple text-white rounded-md"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSendMessage}
                className="footer flex items-center gap-1 md:gap-2 p-2 md:p-2 "
              >
                {!preview && (
                  <>
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
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      <IoAttach className="text-yellow w-8 h-8" />
                    </button>
                    <button type="submit" className="bg-purple p-2 rounded-md">
                      <IoIosSend className="text-white" />
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Inbox;

