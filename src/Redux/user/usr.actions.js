import { LOGOUT, SIGIN } from "./user.types";

export const hadleLogin = (payLoad) => {
  console.log(payLoad, "okPayload");
  return {
    type: SIGIN,
    payLoad: payLoad,
  };
};
export const handleLogout = (payLoad) => {
  return {
    type: LOGOUT,
    payLoad: payLoad,
  };
};
