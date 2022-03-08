import ACTIONS from "../actions";
const { SET_USER, LOGOUT_USER, DATA_LOADED, SET_ALL_USERS, SET_NEW_USER } =
  ACTIONS;

export default function appReducer(state, action) {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem("userToken", action.payload.token);
      return {
        ...state,
        user: action.payload,
        userToken: action.payload.token,
      };
    case LOGOUT_USER:
      localStorage.removeItem("userToken");
      return {
        ...state,
        user: {},
        userToken: "",
      };
    case DATA_LOADED:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ALL_USERS:
      let obj = {};
      action.payload.forEach((data) => {
        obj[data._id] = data;
      });
      const updatedData = {
        ...obj,
      };
      return { ...state, users: updatedData };
    case SET_NEW_USER:
      let newDataObj = {};
      newDataObj[action.payload._id] = action.payload;
      return { ...state, users: { ...state.users, ...newDataObj } };
    default:
      return state;
  }
}
