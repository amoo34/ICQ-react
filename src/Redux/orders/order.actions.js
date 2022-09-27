import { SAVEORDER, DELETEFROMCART } from "./order.types";

export const saveOrder = (payLoad) => {
  console.log(payLoad, "payLoaddd");
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
