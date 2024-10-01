import React, { useEffect, useState } from "react";
import Button from "../../Components/UI/Button/Button";
import { getAllActionCodes, getAllDiscipline } from "../../Services/api";
import Loader from "../../Components/Loader/Loader";
import CheckboxGroup from "../../Components/UI/CheckboxGroup/CheckboxGroup";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const RequestForMaterial = () => {
  const [isReviewed, setIsReviewed] = useState(false);
  const [ActionCode, setActionCode] = useState([]);
  const [Discipline, setDiscipline] = useState([]);
  const [selectedActionCodes, setSelectedActionCodes] = useState("");
  const [selectedDisciplines, setSelectedDisciplines] = useState("");
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the current date
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const actionCodeResponse = await getAllActionCodes();
        const disciplineResponse = await getAllDiscipline();
        setActionCode(actionCodeResponse.results);
        setDiscipline(disciplineResponse.results);
        console.log("actionCode => ", actionCodeResponse);
        console.log("discipline => ", disciplineResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleReviewChange = (e) => {
    setIsReviewed(e.target.checked);
  };

  const handleAddComment = () => {
    if (commentInput.trim() !== "") {
      setComments([...comments, { text: commentInput, isEditing: false }]);
      setCommentInput(""); // Clear the input field
    }
  };

  const handleEditComment = (index) => {
    const newComments = [...comments];
    newComments[index].isEditing = !newComments[index].isEditing; // Toggle editing state
    setComments(newComments);
  };

  const handleUpdateComment = (index, newText) => {
    const newComments = [...comments];
    newComments[index].text = newText; // Update comment text only
    setComments(newComments); // Do not stop editing yet
  };

  const handleSaveComment = (index) => {
    const newComments = [...comments];
    newComments[index].isEditing = false; // Stop editing when "Save" is clicked
    setComments(newComments);
  };

  const handleDeleteComment = (index) => {
    const newComments = comments.filter((_, i) => i !== index); // Remove comment
    setComments(newComments);
  };

  return (
    <div className="RequestForMaterial">
      {loading ? (
        <div className="loader flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="header bg-white p-4 rounded-l-3xl">
            <h5 className="font-medium text-base">
              Request for material submittal approval
            </h5>
          </div>
          <div className="content bg-white p-4 rounded-3xl my-4">
            <form action="submit">
              <div className="Ref flex items-center gap-2 my-4">
                <label
                  htmlFor="Ref"
                  className="font-bold text-base text-gray-dark"
                >
                  REF NO
                </label>
                <div className="inputs">
                  <input
                    type="text"
                    id="Ref"
                    name="Ref"
                    className="bg-white border border-gray rounded-2xl max-w-32"
                  />
                </div>
              </div>
              <div className="Date flex items-center gap-2 my-4">
                <label
                  htmlFor="currentDay"
                  className="font-bold text-base text-gray-dark"
                >
                  Date
                </label>
                <div className="inputs">
                  <input
                    type="text"
                    id="currentDay"
                    name="Date"
                    value={`${currentDay}`}
                    className="bg-white border border-gray rounded-2xl max-w-12 font-medium text-center mx-1 "
                    disabled
                  />
                  <input
                    type="text"
                    id="currentMonth"
                    name="Date"
                    value={`${currentMonth}`}
                    className="bg-white border border-gray rounded-2xl max-w-12 font-medium text-center mx-1 "
                    disabled
                  />
                  <input
                    type="text"
                    id="currentYear"
                    name="Date"
                    value={`${currentYear}`}
                    className="bg-white border border-gray rounded-2xl max-w-16 font-medium text-center mx-1 "
                    disabled
                  />
                </div>
              </div>

              <div className="ProjectName flex items-center gap-2 my-4">
                <label
                  htmlFor="ProjectName"
                  className="font-bold text-base text-gray-dark"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="ProjectName"
                  name="ProjectName"
                  className="bg-white border border-gray rounded-2xl py-1 px-3"
                  required
                  placeholder="Project Name"
                  maxLength={50}
                />
              </div>

              {Discipline.length > 0 && (
                <CheckboxGroup
                  label="Discipline"
                  options={Discipline.map((item) => ({
                    name: item.id,
                    label: item.name,
                  }))}
                  namePrefix="discipline"
                  selectedValues={selectedDisciplines}
                  onChange={(e) => setSelectedDisciplines(e.target.checked)}
                />
              )}

              {ActionCode.length > 0 && (
                <CheckboxGroup
                  label="Action Code"
                  options={ActionCode.map((item) => ({
                    name: item.id,
                    label: item.name,
                  }))}
                  namePrefix="actionCode"
                  selectedValues={selectedActionCodes}
                  onChange={(e) => setSelectedActionCodes(e.target.checked)}
                />
              )}

              <div className="comment flex flex-col">
                <label
                  htmlFor="comment"
                  className="font-bold text-base text-gray-dark"
                >
                  Comment
                </label>
                <input
                  type="text"
                  id="comment"
                  name="comment"
                  className="bg-white border border-gray rounded-2xl p-2"
                  placeholder="Add Comment"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <button
                  type="button"
                  className="text-purple underline underline-offset-1 text-end my-2 mx-1"
                  onClick={handleAddComment}
                >
                  +Add new
                </button>
              </div>

              <div className="comments-container my-4">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="comment-item flex justify-between items-center bg-gray-100 p-2 rounded-lg mb-2"
                  >
                    {comment.isEditing ? (
                      <input
                        type="text"
                        value={comment.text}
                        className="w-[550px] p-1 rounded-md"
                        onChange={(e) =>
                          handleUpdateComment(index, e.target.value)
                        }
                      />
                    ) : (
                      <span>{comment.text}</span>
                    )}
                    <div className="flex items-center  gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (comment.isEditing) {
                            handleSaveComment(index);
                          } else {
                            handleEditComment(index);
                          }
                        }}
                      >
                        {comment.isEditing ? (
                          <>
                            <FaSave className="text-blue w-5 h-5" />
                          </>
                        ) : (
                          <>
                            <MdOutlineEdit className="text-blue w-5 h-5" />
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(index)}
                      >
                        <MdDelete className="text-red w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="review flex items-center gap-2 m-2">
                <input
                  type="checkbox"
                  name="review"
                  id="review"
                  onChange={handleReviewChange}
                  className="appearance-none w-3 h-3 border border-gray rounded-sm cursor-pointer checked:bg-purple checked:border-purple duration-500"
                />
                <label
                  htmlFor="review"
                  className="text-purple font-medium text-base underline"
                >
                  Please review the following item(s) and return a copy with
                  your Action code
                </label>
              </div>

              <div className="send text-end mt-5">
                <Button disabled={!isReviewed} type="submit">
                  Send
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default RequestForMaterial;
