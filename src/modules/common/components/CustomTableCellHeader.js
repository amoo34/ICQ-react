import styled from "@emotion/styled";
import { TableCell } from "@mui/material";

export const CustomTableCellHeader = styled(TableCell)(({ theme, open }) => ({
  fontWeight: "bold",
}));
