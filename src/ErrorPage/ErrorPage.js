import { Box } from "@mui/material";
import React from "react";
import errorImage from "../assets/images/6342464.jpg";
import css from "./errorPage.module.css";

export const ErrorPage = () => {
  return (
    <Box>
      <img className={css.image} src={errorImage} alt="error" />
    </Box>
  );
};
