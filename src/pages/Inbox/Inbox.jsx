import { useEffect, useState, useCallback, useContext } from "react";
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
  getGroupData,
  getMessagesBetweenUsers,
  sendDocsAndVoiceNote,
  sendMessage,
} from "../../Services/api";
import { useSelector } from "react-redux";
import ProfileAvatar from "../../Components/UI/profilePic/profilePic";
import Loader from "../../Components/Loader/Loader";
import { CreateGroup } from "../../Components/CreateGroup/CreateGroup";
import { Skeleton } from "@mui/material";
import { CiChat1 } from "react-icons/ci";
import { toast } from "react-toastify";
import { ChatContext } from "../../context/ChatContext";


const Inbox = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const { messages, setMessages } = useContext(ChatContext);
  const [loading, setLoading] = useState(true);
  const [ChatLoading, setChatLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [Projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [IsGroup, setIsGroup] = useState(false);
  // const [limit] = useState(20);
  // const [offset, setOffset] = useState(1);
  // const [hasMoreMessages, setHasMoreMessages] = useState(true);

  useEffect(() => {
    if (activeChat?.member?.isGroup) {
      setIsGroup(true);
    } else {
      setIsGroup(false);
    }
  }, [activeChat]);
  console.log("IsGroup  :", IsGroup);
  useEffect(() => {
    const fetchGroupData = async () => {
      setLoading(true);
      try {
        const projectsData = await getGroupData(
          token,
          activeChat?.projectId,
          activeChat.member._id
        );

        setProjects(projectsData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (IsGroup) {
      fetchGroupData();
    }
  }, [activeChat, token]);

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
  }, [token, userId]);

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
        // setOffset(1);
        // setHasMoreMessages(true);
        try {
          const messagesData = await getMessagesBetweenUsers(
            token,
            activeChat.projectId,
            userId,
            activeChat.member._id
          );
          setMessages(messagesData.results);

          console.log(
            `Response from get messages between ${userId} & ${activeChat.member._id} in ${activeChat.projectId} `,
            messagesData.results
          );
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setChatLoading(false);
        }
      }
    };
    if (!IsGroup) {
      fetchMessages();
    }
  }, [activeChat, token, userId]);

  // const loadMoreMessages = async () => {
  //   if (!activeChat || !hasMoreMessages) return;
  //   try {
  //     const newOffset = offset + limit; // Update the offset
  //     console.log("newOffset", newOffset);
  //     const messagesData = await getMessagesBetweenUsers(
  //       token,
  //       activeChat.projectId,
  //       userId,
  //       activeChat.member._id,
  //       limit,
  //       newOffset
  //     );

  //     if (messagesData.results.length < limit) {
  //       setHasMoreMessages(false); // No more messages available
  //     }

  //     // Append new messages at the beginning of the current list
  //     setMessages((prevMessages) => [...messagesData.results, ...prevMessages]);
  //     setOffset(newOffset);
  //   } catch (error) {
  //     console.error("Error loading more messages:", error);
  //   }
  // };

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

  const addAttachmentMessage = async () => {
    try {
      if (!file) {
        console.error("No file selected for upload.");
        throw new Error("File is required to send an attachment.");
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.info("File size exceeds 10MB limit.");
      }

      // Ensure file is wrapped in FormData for upload
      const formData = new FormData();
      formData.append("docs", file);

      // Send the file using sendDocsAndVoiceNote
      const res = await sendDocsAndVoiceNote(formData);

      if (res && res.docs) {
        console.log("✅ Attachment uploaded successfully:", res);
        setFilePath(res.docs);
        console.log(filePath);

        setPreview(null);
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      console.error("❌ Error adding attachment:", err.message || err);

      // toast.error("Failed to upload attachment. Please try again.");
    } finally {
      setPreview(null);
      setFile(null);
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      // if (messageInput.trim() === "") return;
      if (file) {
        await addAttachmentMessage();
      }

      const newMessage = {
        sender: userId,
        receiver: activeChat.member._id,
        project: activeChat.projectId,
        isSender: true,
        type: messageInput ? "text" : file ? "doc" : "text",
      };
      if (messageInput.trim()) {
        newMessage.content = messageInput;
      }
      console.log(filePath);

      if (preview?.type === "image") {
        newMessage.docs = filePath;
      }

      console.log("newMessage:", newMessage);

      const res = await sendMessage(newMessage);
      console.log(res);

      setMessageInput("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log(selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile); // Create a URL for the file

      const extension = selectedFile.name.split(".").pop().toLowerCase();
      const isImage = ["jpg", "jpeg","png", "gif"].includes(extension);
      const isPdf = ["pdf", "docx"].includes(extension);
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
          name: selectedFile.name,
          size: selectedFile.size,
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

  const renderMessageContent = (message) => {
    switch (true) {
      case message.type === "doc":
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
        src={`https://api.request-sa.com/${message.docs}`}
        alt="attachment"
        className="w-full min-w-[200px]  max-w-xs rounded-lg"
      />{" "}
      <span
        className={`absolute  bottom-2 p-2  rounded-full text-white ${
          message.isSender === true
            ? "right-2 bg-linear_1 "
            : "left-2 bg-linear_3  "
        } text-xs`}
      >
        {message.date ||
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
      </span>
    </div>
  );

  const renderPDF = (message) => (
    <div className="relative">
      <a
        href={`https://api.request-sa.com/${message.docs.url}`}
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
        {message.date ||
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
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
        {message.date ||
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
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
        {message.date ||
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
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
                    {activeChat?.member?.isGroup && (
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
                    )}
                  </div>
                </div>
                {/* {activeChat?.member?.isGroup ? (
                  <div>add member</div>
                ) : ( */}
                  <div className="dot">
                    <HiOutlineDotsHorizontal />
                  </div>
                {/* )} */}
              </div>
              <Divider />
              <div className="chat_container overflow-y-scroll relative  h-[70vh] lg:h-[50vh] my-3 ">
                {/* <InfiniteScroll
                  dataLength={messages.length}
                  next={loadMoreMessages}
                  hasMore={hasMoreMessages}
                  loader={<h4>Loading...</h4>}
                  inverse={true}
                  endMessage={
                    <p className="text-red text-center">No more messages</p>
                  }
                > */}
                {/* <button className="" onclick={loadMoreMessages}>
                    load more{" "}
                  </button> */}
                {ChatLoading
                  ? renderSkeletonLoader()
                  : messages
                      .slice()
                      .reverse()
                      .map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center ${
                            msg.sender !== userId
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >
                          {renderMessageContent(msg)}
                        </div>
                      ))}
                {messages?.length === 0 && (
                  <div className="flex items-center justify-center text-center text-gray-500">
                    {IsGroup ? (
                      <p>
                        No messages in this group chat yet. Be the first to send
                        a message!
                      </p>
                    ) : (
                      <p>No messages in this chat yet. Start a conversation!</p>
                    )}
                  </div>
                )}

                {/* </InfiniteScroll> */}
              </div>
              <div className="preview relative flex items-center justify-center">
                {preview && preview.type === "image" && (
                  <div className=" -bottom-10 p-2 absolute bg-gray-50  rounded-md">
                    <img
                      src={preview.url}
                      alt="File preview"
                      className="preview-image !w-[80vh] !h-[40vh] object-contain rounded-md"
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
                {preview && preview.type === "pdf" && (
                  <div className=" -bottom-10 p-3 absolute bg-gray-100 w-full h-[20vh]  rounded-md">
                    <div className=" text-center my-3">
                      <h4 className="font-bold text-lg"> {preview.name}</h4>
                      <span className="font-bold text-sm text-gray">
                        {(preview.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>

                    <div className="actions mt-1 flex items-center  gap-3 bottom-2 absolute right-5">
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



