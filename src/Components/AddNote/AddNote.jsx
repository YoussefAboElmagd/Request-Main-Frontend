import { useState } from "react";
import { FaCommentMedical } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoIosSend } from "react-icons/io";
import { updateProject } from "../../Services/api";
import { useSelector } from "react-redux";
import { RiCloseCircleLine } from "react-icons/ri";
import avatar from "../../assets/images/Avatar.jpg";

export const AddNote = ({ projectId, Notes }) => {
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [notes, setNotes] = useState(Notes || []);

  const handleAddNote = async () => {
    if (!messageInput.trim()) return;

    try {
      const payload = {
        notes: {
          content: messageInput,
          postedBy: user._id,
        },
      };

      // Send request to add the note
      const res = await updateProject(projectId, payload);
      setNotes(res.updatedProject.notes);
      const newNote = {
        content: messageInput,
        postedBy: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar || avatar,
        },
        createdAt: new Date().toISOString(), 
      };

      setNotes([newNote, ...notes]);
      setMessageInput("");
  
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => setOpen(!open);
  return (
    <div className="AddNote">
      <button className="addNote m-1" onClick={handleOpen}>
        <span>
          <FaCommentMedical className="h-7 w-7 " style={{ color: "#81D4C2" }} />
        </span>
      </button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="relative">
          <button onClick={handleOpen}>
            <RiCloseCircleLine className="text-red absolute right-4 top-4 cursor-pointer" />
          </button>
        </DialogHeader>
        <DialogBody className="h-[300px] overflow-y-scroll">
          {notes?.map((note) => (
            <div className="note flex items-start gap-2 p-2">
              <img
                src={avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col w-full">
                <div className="font-semibold">Sender's name</div>
                <div
                  className="  p-3 rounded-xl w-full border border-solid border-purple"
                  style={{
                    backgroundColor: "#fcfcfd",
                  }}
                >
                  <p className="text-gray-dark">{note.content}</p>
                  <div className="text-right text-xs text-gray-500">
                    {/* {moment(note.createdAt).format("hh:mm A MM/DD/YYYY")} */}
                    12.21 PM 23-8-2024
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DialogBody>
        <DialogFooter>
          <div className="footer flex items-center gap-1 md:gap-2 p-2 md:p-2  w-full">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type something"
              className={`w-full p-2 rounded-md border `}
            />
            <button
              className="bg-purple p-2 rounded-md"
              onClick={handleAddNote}
            >
              <IoIosSend className="text-white" />
            </button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
