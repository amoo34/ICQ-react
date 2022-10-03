import { SAVEORDER, DELETEFROMCART, PAIDORDERS } from "./order.types";

export const saveOrder = (payLoad) => {
  return {
    type: SAVEORDER,
    payLoad: payLoad,
  };
};
export const deleteFromCart = (payLoad) => {
  return {
    type: DELETEFROMCART,
    payLoad: payLoad,
  };
};
export const savePaidOrders = (payLoad) => {
  return {
    type: PAIDORDERS,
    payLoad: payLoad,
  };
};
