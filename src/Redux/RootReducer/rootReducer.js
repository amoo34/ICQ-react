import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { orderReducer } from "../orders/orders.reducer";
import { userReducer } from "../user/user.reducer";
import { LOGOUT } from "../user/user.types";

export const appReducer = combineReducers({
  user: userReducer,
  orders: orderReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    appReducer(undefined, action);
    storage.removeItem("persist:root");
  }

  return appReducer(state, action);
};
