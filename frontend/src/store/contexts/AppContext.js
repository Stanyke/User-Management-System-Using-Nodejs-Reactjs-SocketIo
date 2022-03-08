import * as React from "react";
import axios from "axios";
import ACTIONS from "../actions";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { DATA_LOADED, SET_ALL_USERS, SET_USER, LOGOUT_USER, SET_NEW_USER } =
  ACTIONS;

const { REACT_APP_SERVER_URL, REACT_APP_AFTER_LOGIN_REDIRECT_URL } =
  process.env;

export const AppContext = React.createContext();

function useApp() {
  const context = React.useContext(AppContext);
  const location = useLocation();

  const [appState, dispatch] = context;

  const { socket, userToken } = appState;

  axios.defaults.baseURL = REACT_APP_SERVER_URL;
  axios.defaults.headers["Content-Type"] = "application/json";
  axios.defaults.headers["x-access-token"] = userToken;

  React.useEffect(() => {
    //Only fetch all users when user is logged in and user is in dashboard
    userToken &&
      location.pathname === REACT_APP_AFTER_LOGIN_REDIRECT_URL &&
      getUsersFromDb() &&
      getMyProfileFromDb();

    socket.on("recieveNewUser", async (data) => {
      dispatch({
        type: SET_NEW_USER,
        payload: data,
      });
    });
  }, []);

  const pageLoaderhandler = (status) => {
    dispatch({
      type: DATA_LOADED,
      payload: status,
    });
  };

  const loginUser = async (options) => {
    try {
      const { data } = await axios.post("/api/v1/users/login", options);
      dispatch({
        type: SET_USER,
        payload: data.data,
      });
      socket.emit("newUser", data.data);
    } catch (err) {
      showToast(err.response.data.message);
    }
  };

  const registerUser = async (options) => {
    try {
      const { data } = await axios.post("/api/v1/users/register", options);
      dispatch({
        type: SET_USER,
        payload: data.data,
      });
      socket.emit("newUser", data.data);
    } catch (err) {
      showToast(err.response.data.message);
    }
  };

  const showToast = async (message) => {
    toast(message);
  };

  const getUsersFromDb = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users`);
      pageLoaderhandler(true);
      dispatch({
        type: SET_ALL_USERS,
        payload: data.data,
      });
    } catch (err) {
      showToast(err.response.data.message);
    }
  };

  const getMyProfileFromDb = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users/view-profile/me`);
      dispatch({
        type: SET_USER,
        payload: data.data,
      });
    } catch (err) {
      showToast(err.response.data.message);
    }
  };

  const removeUser = async () => {
    dispatch({
      type: LOGOUT_USER,
      payload: "",
    });
  };

  const submitUser = async (options) => {
    try {
      const { data } = await axios.user("/api/v1/users", options);
      dispatch({
        type: SET_NEW_USER,
        payload: data.data,
      });
      socket.emit("newUser", data.data);
    } catch (err) {
      alert(err.response.data);
    }
  };

  const getUserById = async (userId, command) => {
    try {
      !command && pageLoaderhandler(false);
      const { data } = await axios.get(`/api/v1/users/${userId}`);
      pageLoaderhandler(true);
      return data.data;
    } catch (err) {
      alert(
        "User with such id does not exist or internet connection is not available"
      );
      window.location = REACT_APP_AFTER_LOGIN_REDIRECT_URL;
    }
  };

  const submitComment = async (options) => {
    try {
      await axios.user(`/api/v1/users/${options.userId}/comments`, options);
      const data = await getUserById(options.userId, "dontLoad");
      socket.emit("userAndAllComments", data);
      return data;
    } catch (err) {
      alert(err.response.data);
    }
  };

  const editUserComment = async (options) => {
    try {
      const { userId, commentId, message } = options;
      await axios.patch(`/api/v1/users/${userId}/comments/${commentId}`, {
        message,
      });
      const data = await getUserById(options.userId, "dontLoad");
      socket.emit("userAndAllComments", data);
      return data;
    } catch (err) {
      alert(err.response.data);
    }
  };

  const deleteUserComment = async (options) => {
    try {
      const { userId, commentId } = options;
      await axios.delete(`/api/v1/users/${userId}/comments/${commentId}`);
      const data = await getUserById(userId, "dontLoad");
      socket.emit("userAndAllComments", data);
      return data;
    } catch (err) {
      alert(err.response.data);
    }
  };

  return {
    appState,
    dispatch,
    loginUser,
    registerUser,
    showToast,
    getUsersFromDb,
    removeUser,
    submitUser,
    getUserById,
    submitComment,
    socket,
    editUserComment,
    deleteUserComment,
  };
}

export default useApp;
