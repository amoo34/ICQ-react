import styled from "@emotion/styled";
import { Badge } from "@mui/material";
import { primaryColor } from "../../../Crud/styles";

export const CustomBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: primaryColor,
    color: "black",
  },
}));
