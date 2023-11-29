import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { UserManagementData } from "../components/pagecontents/user-management-form/UserManagementForm";

const API_URL = "/api/users/";

const login = async (email: string, password: string) => {
  return await axios.post(API_URL + "signin", {
    email,
    password,
  });

  // try {
  //   const response = await axios.post(API_URL + "signin", {
  //     email,
  //     password,
  //   });

  //   if (response.data) {
  //     console.log(response);
  //     return response.data;
  //   }
  // } catch (error) {
  //   throw error;
  // }
};

const verifyEmail = async (token: string) => {
  return await axios.get("/api/users/verify/" + token);
};

const resetPassword = async (token: string, password: string) => {
  return await axios.post("/api/users/resetpassword", {
    token,
    password,
  });
};
const resetInvitePassword = async (token: string, password: string) => {
  return await axios.post("/api/users/resetinvitepassword", {
    token,
    password,
  });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshtoken");
  localStorage.removeItem("parentuser");
  localStorage.removeItem("roles");
};

const signup = async (
  username: string,
  fullName: string,
  email: string,
  phone: string,
  password: string,
  usertype: string,
  parentuser: string,
  roles: string,
  active: boolean
) => {
  return axios.post(API_URL + "signup", {
    username,
    fullName,
    email,
    phone,
    password,
    usertype,
    parentuser,
    roles,
    active,
  });
};
const update = async (
  username: string,
  fullName: string,
  email: string,
  phone: string,
  password: string,
  usertype: string,
  parentuser: string,
  roles: string,
  active: boolean
) => {
  return axios.post(API_URL + "update", {
    username,
    fullName,
    email,
    phone,
    password,
    usertype,
    parentuser,
    roles,
    active,
  });
};
// export const signUp = async (
//   { data } = {} as { data?: UserManagementData }
// ) => {
//   return await axios.post(API_URL + "signup", data);
// };

const getChildAccounts = async () => {
  const headers = { Authorization: localStorage.getItem("token") };
  try {
    const response = await axios.post(
      API_URL + "getchildaccounts",
      {},
      { headers }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
const getcurrentuser = () => {
  const userStr = String(localStorage.getItem("user"));
  try {
    if (userStr) return JSON.parse(userStr);
  } catch {
    return null;
  }
};
const is_jwt_expired = async () => {
  const token = String(localStorage.getItem("token"));
  const refreshtoken = String(localStorage.getItem("refreshtoken"));
  let isExpired = false;
  if (token == "") {
    logout();
    isExpired = true;
  }
  try {
    axios
      .post(API_URL + "is_jwt_expired", {
        token,
        refreshtoken,
      })
      .then((result) => {
        localStorage.setItem("token", result.data.data.token);
        localStorage.setItem("refreshtoken", result.data.data.refreshtoken);
        isExpired = false;
      })
      .catch((error) => {
        isExpired = true;
      });
  } catch {
    logout();
    isExpired = true;
  } finally {
    return isExpired;                                             
  }
};
const forgotPassword = async (email: string) => {
  return await axios.get(API_URL + "forgotpassword/" + email);
};

export default {
  login,
  logout,
  signup,
  resetPassword,
  resetInvitePassword,
  forgotPassword,
  update,
  getcurrentuser,
  getChildAccounts,
  is_jwt_expired,
  verifyEmail,
};
