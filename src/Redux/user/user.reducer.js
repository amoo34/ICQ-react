import { LOGOUT, SIGIN } from "./user.types";

const initialState = {
  user: "",
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGIN:
      return { ...state, user: action.payLoad };
    case LOGOUT:
      return { ...state, user: action.payLoad };
    default:
      return state;
  }
};
