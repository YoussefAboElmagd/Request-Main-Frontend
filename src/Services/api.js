import axiosInstance from "./axiosInstance";

// Sign up
export const signUp = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `auth/signup`,
      userData
    );
    console.log("Response => ", response);
    console.log("Response => ", response.data);

    return response.data;
  } catch (error) {
    console.error("Sign-up error: ", error);
    throw error;
  }
};
// Sign in

export const signIn = async (userData) => {
  try {
    const response = await axiosInstance.post(`auth/signin`, userData);
    console.log("Response => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Sign-in error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// resend verification code

export const resendVerificationCode = async (email) => {
  try {
    const response = await axiosInstance.post("auth/resend", { email });
    console.log("Response => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Resend verification code error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// forget password

export const forgetPassword = async (email) => {
  try {
    const response = await axiosInstance.post("auth/forget/", { email });
    console.log("Response => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Forget password error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Update User API Call
export const updateUser = async (userId, userData, token) => {
  try {
    const response = await axiosInstance.put(`users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response from update => ", response);
    return response.data;
  } catch (error) {
    console.error("Update user error: ", error.response?.data || error.message);
    throw error;
  }
};
export const uploadCompanyFiles = async (userId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `users/company/${userId}`,
      updatedData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Response from update => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Update company files error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// upload avatar

export const uploadAvatar = async (userId, profilePic, token) => {
  try {
    const formData = new FormData();
    formData.append("profilePic", profilePic);

    const response = await axiosInstance.put(
      `users/photo/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Response from avatar upload => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Upload avatar error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get all roles

export const getAllRoles = async (token) => {
  try {
    const response = await axiosInstance.get("type", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from roles => ", response);
    return response.data;
  } catch (error) {
    console.error("Get roles error: ", error.response?.data || error.message);
    throw error;
  }
};

// get all project For User

export const getAllProjectsForUser = async (userId, token) => {
  try {
    const response = await axiosInstance.get(`project/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from projects => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get projects error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get Project history
export const getProjectHistory = async (Status, userId, token) => {
  try {
    const response = await axiosInstance.get(
      `project/user/status/${userId}?status=${Status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response from project history => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get project history error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get analysis

export const getAnalysis = async (UserId, token) => {
  try {
    const response = await axiosInstance.get(
      `project/user/analytics/${UserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response from analysis => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get analysis error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get Project details

export const getProjectDetails = async (projectId) => {
  try {
    const response = await axiosInstance.get(`project/${projectId}`);

    console.log("Response from project details => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get project details error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// update project

export const updateProject = async (projectId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `project/${projectId}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response from update project => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Update project error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// add Project

export const addProject = async (token, projectData) => {
  console.log(projectData);
  try {
    const response = await axiosInstance.post(`project`, projectData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response from add project => ", response);
    return response.data;
  } catch (error) {
    console.error("Add project error: ", error.response?.data || error.message);
    throw error;
  }
};

// get all tasks Per Project

export const getAllTasksPerProject = async (projectId, Status) => {
  try {
    // Construct the query parameters

    // Append query parameters to the request URL
    const response = await axiosInstance.get(
      `task/project/${projectId}?status=${Status}`
    );

    console.log("Response from tasks => ", response);
    return response.data;
  } catch (error) {
    console.error("Get tasks error: ", error.response?.data || error.message);
    throw error;
  }
};

// get Task details

export const getTaskDetails = async (taskId) => {
  try {
    const response = await axiosInstance.get(`task/${taskId}`);

    console.log("Response from task details => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get task details error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get all Owners

export const getAllOwners = async (token) => {
  try {
    const response = await axiosInstance.get(`users/owners`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from owners => ", response);
    return response.data;
  } catch (error) {
    console.error("Get owners error: ", error.response?.data || error.message);
    throw error;
  }
};

//  get all consultant

export const getAllConsultants = async (token) => {
  try {
    const response = await axiosInstance.get(`users/consultant`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from consultants => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get consultants error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get all contractor

export const getAllContractors = async (token) => {
  try {
    const response = await axiosInstance.get(`users/contractor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from contractors => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get contractors error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// addTask function
export const addTask = async (taskData, lang) => {
  try {
    const response = await axiosInstance.post(`task?lang=${lang}`, taskData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response from add task => ", response);
    return response.data;
  } catch (error) {
    console.error("Add task error: ", error.response?.data || error.message);
    throw error;
  }
};

// get all tags

export const getAllTagsByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`tags/user/${userId}`);

    console.log("Response from tags => ", response);
    return response.data;
  } catch (error) {
    console.error("Get tags error: ", error.response?.data || error.message);
    throw error;
  }
};

//  Add  Tag
export const addTag = async (tag, userId, lang) => {
  try {
    console.log(`tags/${userId}`, "tag", tag);
    const response = await axiosInstance.post(
      `tags/${userId}?lang=${lang}`,
      tag
    );

    console.log("Response from add tag => ", response);
    return response.data;
  } catch (error) {
    console.error("Add tag error: ", error.response?.data || error.message);
    throw error;
  }
};

//  send email contact us

export const sendEmailContactUs = async (contactData, userId) => {
  try {
    const response = await axiosInstance.post(
      `users/contactUs/${userId}`,
      contactData
    );

    console.log("Response from send email contact us => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Send email contact us error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const sendEmailGetInTouch = async (contactData) => {
  try {
    const response = await axiosInstance.post(`users/getInTouch/`, contactData);

    console.log("Response from send email contact us => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Send email contact us error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  get all Docs
export const getAllDocs = async (userId) => {
  try {
    const response = await axiosInstance.get(`project/user/files/${userId}`);
    console.log("Response from docs => ", response);
    return response.data;
  } catch (error) {
    console.error("Get docs error: ", error.response?.data || error.message);
    throw error;
  }
};

//  get Files Per Tag

export const getFilesPerTag = async (tagId, projectId) => {
  try {
    const response = await axiosInstance.get(
      `project/files/${tagId}/${projectId}`
    );

    console.log("Response from files per tag => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get files per tag error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  download All Files

export const downloadAllFiles = async (tagId) => {
  try {
    const response = await axiosInstance.get(`project/download/${tagId}`);

    console.log("Response from download all files => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Download all files error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  get all discipline

export const getAllDiscipline = async () => {
  try {
    const response = await axiosInstance.get(`discipline`);

    console.log("Response from discipline => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get discipline error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get all ActionCodes

export const getAllActionCodes = async () => {
  try {
    const response = await axiosInstance.get(`action`);

    console.log("Response from action codes => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get action codes error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  get all reason

export const getAllReasons = async () => {
  try {
    const response = await axiosInstance.get(`reason`);

    console.log("Response from reasons => ", response);
    return response.data;
  } catch (error) {
    console.error("Get reasons error: ", error.response?.data || error.message);
    throw error;
  }
};

// send request

export const sendRequest = async (token, requestData) => {
  try {
    const response = await axiosInstance.post(`request`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response from send request => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Send request error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// add task table

export const addTasksTable = async (tasksTableData) => {
  try {
    const response = await axiosInstance.post(`table`, tasksTableData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response from add task table => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Add task table error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get all units

export const getAllUnits = async () => {
  try {
    const response = await axiosInstance.get(`units`);

    console.log("Response from units => ", response);
    return response.data;
  } catch (error) {
    console.error("Get units error: ", error.response?.data || error.message);
    throw error;
  }
};

//  get user-group
export const getUserGroup = async (token) => {
  try {
    const response = await axiosInstance.get(`userGroup`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from user-group => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get user-group error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  get all vocations
export const getAllVocations = async (userId, lang) => {
  try {
    const response = await axiosInstance.get(
      `vocation/user/${userId}?lang=${lang}`
    );

    console.log("Response from vocations => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get vocations error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// update team

export const updateTeam = async (token, teamId, teamData, lang) => {
  try {
    const response = await axiosInstance.put(
      `team/${teamId}?lang=${lang}`,
      teamData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response from update team => ", response);
    return response.data;
  } catch (error) {
    console.error("Update team error: ", error.response?.data || error.message);
    throw error;
  }
};

// delegated Team

export const delegatedTeam = async (token, teamId) => {
  try {
    const response = await axiosInstance.get(`team/delegate/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response from delegated team => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Delegated team error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  delete user from  project  in delegated Team
export const deleteUserFromProject = async (token, project, userId) => {
  try {
    const response = await axiosInstance.delete(`team/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { project },
    });

    console.log("Response from delete user from project => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Delete user from project error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get all  parent tasks
export const getAllParentTasks = async (userId, projectId) => {
  try {
    const response = await axiosInstance.get(
      `task/parentTasks/${userId}/${projectId}`
    );
    console.log("Response from parent tasks => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get parent tasks error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get all sub Tasks by Parent Task

export const getAllSubTasksByParentTask = async (parentTaskId) => {
  try {
    const response = await axiosInstance.get(`task/sub/${parentTaskId}`);

    console.log("Response from sub tasks by parent task => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get sub tasks by parent task error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get team count

export const getTeamCount = async (teamId) => {
  try {
    const response = await axiosInstance.get(`team/count/${teamId}`);

    console.log("Response from team count => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get team count error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get members by project

export const getMembersByProject = async (projectId) => {
  console.log("projectId from Api => ", projectId);

  try {
    const response = await axiosInstance.get(`project/members/${projectId}`);

    console.log("Response from members by project => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get members by project error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// add member for project

export const addMemberForProject = async (projectId, MemberData, token) => {
  console.log(projectId);

  try {
    const response = await axiosInstance.put(
      `project/member/${projectId}?lang=${lang}`,
      MemberData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response from add member for project => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Add member for project error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  delete member from project team

export const deleteMemberFromProjectTeam = async (projectId, Member) => {
  console.log(Member, "-----", projectId);
  try {
    const response = await axiosInstance.put(
      `project/pull/${projectId}`,
      Member,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response from delete member from project team => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Delete member from project team error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// update task

export const updateTask = async (token, taskId, userId, taskData) => {
  try {
    const response = await axiosInstance.put(
      `task/${taskId}?id=${userId}`,
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response from update task => ", response);
    return response.data;
  } catch (error) {
    console.error("Update task error: ", error.response?.data || error.message);
    throw error;
  }
};

//  get notification counts

export const getNotificationCounts = async (token, userId) => {
  try {
    const response = await axiosInstance.get(`project/counts/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from notification counts => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get notification counts error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get task history

export const getTaskHistory = async (token, taskId) => {
  try {
    const response = await axiosInstance.get(`taskLog/task/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from task history => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get task history error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  send invite
export const sendInvite = async (token, invitationData) => {
  try {
    const response = await axiosInstance.post(`users/invite`, invitationData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response from send invite => ", response);
    return response.data;
  } catch (error) {
    console.error("Send invite error: ", error.response?.data || error.message);
    throw error;
  }
};

// get data for invite
export const getDataForInvite = async (token, invitationId, userId) => {
  try {
    const response = await axiosInstance.get(
      `users/invite/${userId}?id=${invitationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response from get data for invite => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get data for invite error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//   approve invite
export const approveInvite = async (inviteId, inviteData) => {
  try {
    console.log(inviteData, inviteId);

    const response = await axiosInstance.put(
      `users/invite/${inviteId}`,
      inviteData
    );

    console.log("Response from approve invite => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Approve invite error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  cancel invite
export const cancelInvite = async (token, inviteId) => {
  try {
    const response = await axiosInstance.delete(`users/invite/${inviteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from cancel invite => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Cancel invite error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  get models
export const getModelsByProject = async (token, projectId) => {
  try {
    const response = await axiosInstance.get(`request/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from get models => ", response);
    return response.data;
  } catch (error) {
    console.error("Get models error: ", error.response?.data || error.message);
    throw error;
  }
};

// get model by id
export const getModelById = async (token, ReqId) => {
  try {
    const response = await axiosInstance.get(`request/${ReqId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from get model by id => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get model by id error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  update model

export const updateModel = async (token, ReqId, modelData) => {
  try {
    const response = await axiosInstance.put(`request/${ReqId}`, modelData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Response from update model => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Update model error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

// get all members by project

export const getAllMembersByProject = async (projectId, lang) => {
  console.log("projectId from Api => ", projectId);

  try {
    const response = await axiosInstance.get(
      `project/members/${projectId}?lang=${lang}`
    );

    console.log("Response from members by project => ", response);
    return response.data;
  } catch (error) {
    console.error(  
      "Get members by project error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  add vocation

export const addVocation = async (token, vocationData, lang) => {
  try {
    const response = await axiosInstance.post(
      `vocation?lang=${lang}`,
      vocationData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`vocation?lang=${lang}`);

    console.log("Response from add vocation => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Add vocation error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  get all tags by project

export const getAllTagsByProject = async (projectId, lang) => {

  try {
    const response = await axiosInstance.get(
      `tags/project/${projectId}?lang=${lang}`
    );

    console.log("Response from tags by project => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get tags by project error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};


//  get project tag progress 

export const getProjectTagProgress = async ( projectId, lang) => {

  try {
    const response = await axiosInstance.get(
      `project/tags/progress/${projectId}?lang=${lang}`
    );

    console.log("Response from get project tag progress => ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Get project tag progress error: ",
      error.response?.data || error.message
    );
    throw error;
  }
};

//  get all notifications 

    export const getAllNotifications = async (token, userId, days) => {
      try {
        const response = await axiosInstance.get(
          `notification/${userId}?days=${days}`
        );

        console.log("Response from get all notifications => ", response);
        return response.data;
      } catch (error) {
        console.error(
          "Get all notifications error: ",
          error.response?.data || error.message
        );
        throw error;
      }
    };