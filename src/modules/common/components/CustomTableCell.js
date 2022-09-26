import styled from "@emotion/styled";
import { tableCellClasses, TableCell } from "@mui/material";
import { secondaryColor } from "../../../Crud/styles";
export const CustomTabelCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: secondaryColor,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
