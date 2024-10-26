import axiosInstance from "./axiosInstance";

// Sign up
export const signUp = async (userData) => {
  try {
    const response = await axiosInstance.post("auth/signup", userData);
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
    const response = await axiosInstance.post("auth/signin", userData);
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

export const getProjectHistory = async (Status, token) => {
  try {
    const response = await axiosInstance.get(`project?status=${Status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

export const updateProject = async ( projectId, updatedData) => {
  try {
    const response = await axiosInstance.put(`project/${projectId}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response from update project => ", response);
    return response.data;
  } catch (error) {
    console.error("Update project error: ", error.response?.data || error.message);
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
export const addTask = async (taskData) => {
  try {
    const response = await axiosInstance.post(`task`, taskData, {
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
export const addTag = async (tag, userId) => {
  try {
    const response = await axiosInstance.post(`tags/${userId}`, tag, {
      headers: {
        "Content-Type": "application/json",
      },
    });

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

//  get all Docs

export const getAllDocs = async () => {
  try {
    const response = await axiosInstance.get(`project/admin/files`);

    console.log("Response from docs => ", response);
    return response.data;
  } catch (error) {
    console.error("Get docs error: ", error.response?.data || error.message);
    throw error;
  }
};

//  get Files Per Tag

export const getFilesPerTag = async (tagId) => {
  try {
    const response = await axiosInstance.get(`project/files/${tagId}`);

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
    console.error(
      "Get reasons error: ",
      error.response?.data || error.message
    );
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
    console.error(
      "Get units error: ",
      error.response?.data || error.message
    );
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

export const getAllVocations = async () => {
  try {
    const response = await axiosInstance.get(`vocation`);

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

export const updateTeam = async (token, teamId, teamData) => {
  try {
    const response = await axiosInstance.put(`team/${teamId}`, teamData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

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

export const getAllParentTasks = async ({userId, projectId}) => {
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