import React, { useEffect, useState } from "react";
import Button from "../../Components/UI/Button/Button";
import Loader from "../../Components/Loader/Loader";
import CheckboxGroup from "../../Components/UI/CheckboxGroup/CheckboxGroup";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import Select from "react-select";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getAllActionCodes,
  getAllDiscipline,
  getAllProjectsForUser,
  getAllReasons,
  sendRequest,
  updateProject,
} from "../../Services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "i18next";

const RequestForm = ({
  ReqTitle,
  showProjectName,
  showDiscipline,
  showActionCodes,
  showReasons,
  ApproveTitle,
}) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = location.state || {};
  const [actionCodes, setActionCodes] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isReviewed, setIsReviewed] = useState(false);
  const [Reasons, setReasons] = useState([]);
  const [selectedReasons, setSelectedReasons] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedActionCodes, setSelectedActionCodes] = useState([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [refNO, setRefNO] = useState("");
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
        const [
          actionCodeResponse,
          disciplineResponse,
          ReasonsResponse,
          projectsResponse,
        ] = await Promise.all([
          getAllActionCodes(),
          getAllDiscipline(),
          getAllReasons(),
          getAllProjectsForUser(user._id, token),
        ]);
        setActionCodes(actionCodeResponse.results);
        setDisciplines(disciplineResponse.results);
        setReasons(ReasonsResponse.reasons);
        setProjects(projectsResponse.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user._id, token]);

  const handleReviewChange = (e) => {
    setIsReviewed(e.target.checked);
  };

  const handleUpdateProject = async () => {
    try {
  
      console.log("ApproveTitle :", ApproveTitle);

      const res = await updateProject(projectId, {
        [ApproveTitle]: true,
      });
      console.log("res from update project => ", res);
    } catch (error) {
      console.error("Failed to update tasks:", error);
      toast.error(t("Failed to update tasks"));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !selectedActionCodes.length ||
      !selectedDisciplines.length ||
      !selectedProject
    ) {
      setError("All fields are required");
      return;
    }

    const requestData = {
      refNO,
      actionCode: selectedActionCodes,
      discipline: selectedDisciplines,

      project: selectedProject.value,
      comment: comments.map((comment) => comment.text),
      date: new Date().toLocaleDateString(),
      createdBy: user._id,
    };
    if (showReasons) {
      requestData.reason = selectedReasons;
    }
    console.log("Request Data:", requestData);
    try {
      await sendRequest(token, requestData);
      toast.success("Request sent successfully ");
      resetForm();
      handleUpdateProject();
      navigate("/Models", {
        state: {
          projectId,
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRefNO("");
    setSelectedProject(null);
    setSelectedActionCodes([]);
    setSelectedDisciplines([]);

    setComments([]);
    setCommentInput("");
  };

  const handleAddComment = () => {
    if (commentInput.trim() !== "") {
      setComments([...comments, { text: commentInput, isEditing: false }]);
      setCommentInput("");
    }
  };

  const handleEditComment = (index) => {
    const newComments = [...comments];
    newComments[index].isEditing = !newComments[index].isEditing;
    setComments(newComments);
  };

  const handleUpdateComment = (index, newText) => {
    const newComments = [...comments];
    newComments[index].text = newText;
    setComments(newComments);
  };

  const handleSaveComment = (index) => {
    const newComments = [...comments];
    newComments[index].isEditing = false;
    setComments(newComments);
  };

  const handleDeleteComment = (index) => {
    const newComments = comments.filter((_, i) => i !== index);
    setComments(newComments);
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      border: "1px solid var(--gray)",
      borderRadius: "12px",
      padding: "0  15px",
      boxShadow: "none",
      "&:hover": { borderColor: "var(--gray)" },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--gray)",
      "&:hover": { color: "var(--gray)" },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#CCABDA66" : "white",
      color: state.isSelected ? "var(--purple)" : "var(--gray)",
      padding: "10px",
      borderRadius: "8px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "var(--purple)",
        color: "white",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "10px",
      marginTop: "4px",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    }),
  };

  return (
    <div className="RequestForm">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="header bg-white p-4 rounded-l-3xl">
            <h5 className="font-bold text-base">{ReqTitle}</h5>
          </div>
          <div className="content bg-white p-4 rounded-3xl my-6 ">
            <form onSubmit={handleSubmit}>
              <div className="Ref flex items-center gap-2 my-6">
                <label
                  htmlFor="Ref"
                  className="font-bold text-base text-gray-dark"
                >
                  REF NO
                </label>
                <input
                  type="text"
                  id="Ref"
                  placeholder="ref no"
                  onChange={(e) => setRefNO(e.target.value)}
                  className="bg-white border border-gray rounded-lg p-1 max-w-52"
                />
              </div>
              <div className="Date flex items-center gap-2 my-6 ">
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
              {showProjectName && (
                <div className="ProjectName flex items-center gap-2 my-6">
                  <label
                    htmlFor="ProjectName"
                    className="font-bold text-base text-gray-dark"
                  >
                    Project Name
                  </label>
                  <Select
                    placeholder={"Project Name"}
                    id={"name"}
                    isClearable
                    isLoading={loading}
                    value={selectedProject}
                    options={projects.map((project) => ({
                      value: project._id,
                      label: project.name,
                    }))}
                    onChange={(e) => setSelectedProject(e)}
                    styles={customStyles}
                  />
                </div>
              )}
              {showReasons && (
                <CheckboxGroup
                  label="Reason"
                  options={Reasons?.map((item) => ({
                    id: item._id,
                    label: item.name,
                  }))}
                  namePrefix="reason"
                  selectedValue={selectedReasons}
                  onChange={setSelectedReasons}
                />
              )}
              {showDiscipline && (
                <CheckboxGroup
                  label="Discipline"
                  options={disciplines.map((item) => ({
                    id: item._id,
                    label: item.name,
                  }))}
                  namePrefix="discipline"
                  selectedValue={selectedDisciplines}
                  onChange={setSelectedDisciplines}
                />
              )}
              {showActionCodes && (
                <CheckboxGroup
                  label="Action Code"
                  options={actionCodes.map((item) => ({
                    id: item._id,
                    label: item.name,
                  }))}
                  namePrefix="actionCode"
                  selectedValue={selectedActionCodes}
                  onChange={setSelectedActionCodes}
                />
              )}

              <div className="comment flex flex-col my-6  ">
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

              <div className="comments-container my-6 ">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="comment-item flex justify-between items-center bg-gray-100 p-2 rounded-lg mb-2"
                  >
                    {comment.isEditing ? (
                      <input
                        type="text"
                        value={comment.text}
                        className="w-full max-w-3xl h-full  p-1 rounded-md"
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
              {error && (
                <div className="error-message text-red text-center">
                  {error}
                </div>
              )}
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

export default RequestForm;
