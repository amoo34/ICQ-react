import { errorToast, successToast } from "../../utils/utils";
import { LOGOUT } from "../user/user.types";
import { DELETEFROMCART, SAVEORDER, PAIDORDERS } from "./order.types";

const initialState = {
  orders: [],
  paidOrders: [],
};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVEORDER:
      let hasBefore = state?.orders?.find(
        (order) => order?._id === action?.payLoad?._id
      );

      if (hasBefore) {
        errorToast(`You can't add same person's CV again! `);
        return {
          ...state,
        };
      } else {
        successToast("Added To Cart!");
        return {
          ...state,
          orders: [...state?.orders, { ...action?.payLoad }],
        };
      }
    case DELETEFROMCART:
      let filteredOrders = state?.orders?.filter((order) => {
        return order?._id === action?.payLoad?._id;
      });
      let saveOrders = state?.orders?.filter((order) => {
        return order?._id !== action?.payLoad?._id;
      });
      if (filteredOrders) {
        successToast("Item is successfully deleted!");
        return {
          ...state,
          orders: saveOrders,
        };
      } else {
        return { ...state };
      }
    case PAIDORDERS:
      return {
        ...state,
        paidOrders: [...state?.paidOrders, ...action.payLoad],
        orders: [],
      };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};
