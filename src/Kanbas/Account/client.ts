import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });


export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

console.log("REMOTE_SERVER:", REMOTE_SERVER);
console.log("USERS_API:", USERS_API);

export const signin = async (credentials: any) => {
  try {
    console.log("Sending signin request to:", `${USERS_API}/signin`, credentials);
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    console.log("Signin response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Signin error:", error);
    throw error;
  }
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signup = async (credentials: any) => {
  try {
    console.log("Sending signup request to:", `${USERS_API}/signup`, credentials);
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, credentials);
    console.log("Signup response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const updateProfile = async (userId : string, profileData : any) => {
    const response = await axios.put(`${USERS_API}/${userId}`, profileData);
    return response.data;
  };