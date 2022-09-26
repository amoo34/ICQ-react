import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { primaryColor } from "../../../Crud/styles";
export const CustomInput = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ theme, color }) => ({
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: primaryColor,
    },
  },
}));
