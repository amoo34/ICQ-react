import { useSelector } from "react-redux";
import { history } from "../utils/utils";

export const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state?.user?.user);
  return !user ? children : history.push("/home");
};
