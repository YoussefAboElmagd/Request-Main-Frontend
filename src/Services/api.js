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
      error.response? error.response.data : error.message
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
    // Check userData before sending the request

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
export const uploadCompanyFiles = async (userId, token, formData) => {
  try {
    const response = await axiosInstance.put(
      `users/company/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

// add Project

export const addProject = async (token, projectData) => {
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

export const getAllTasksPerProject = async (projectId, params = {}) => {
  try {
    // Construct the query parameters
    const queryParams = new URLSearchParams(params).toString();

    // Append query parameters to the request URL
    const response = await axiosInstance.get(
      `task/project/${projectId}?${queryParams}`
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

export const getAllTags = async (token) => {
  try {
    const response = await axiosInstance.get(`tags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response from tags => ", response);
    return response.data;
  } catch (error) {
    console.error("Get tags error: ", error.response?.data || error.message);
    throw error;
  }
};


//  Add  Tag
export const addTag = async ( tag) => {
  try {
    const response = await axiosInstance.post(
      `tags`,
      tag,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response from add tag => ", response);
    return response.data;
  } catch (error) {
    console.error("Add tag error: ", error.response?.data || error.message);
    throw error;
  }
};
