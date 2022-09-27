import React from "react";
import { useSelector } from "react-redux";
import { Layout } from "../Layout/Layout";
import { history } from "../utils/utils";

export const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state?.user?.user);
  return user ? <Layout>{children}</Layout> : history.push("/signin");
};
