import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  TableCell,
  TableFooter,
  TableRow,
} from "@mui/material";
import React from "react";
import { rowsPerPageArray } from "../../../utils/utils";
import { CustomInput } from "./CustomInputField";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
export const CustomPagination = ({ setPagination, pagination }) => {
  const { recordsPerPage, page } = pagination;
  const onChangeHandler = (e, key) => {
    let { value } = e.target;
    setPagination((p) => ({ ...p, [key]: value }));
  };
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Box sx={{ width: "200px" }}>
            <CustomInput
              size="small"
              fullWidth
              label="Records/Page"
              onChange={(e) => onChangeHandler(e, "recordsPerPage")}
              value={recordsPerPage}
              select
            >
              {rowsPerPageArray?.map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </CustomInput>
          </Box>
          <Box sx={{ width: "200px" }}>
            <IconButton
              disabled={page === 1}
              onClick={() => {
                if (page !== 1) {
                  setPagination((p) => ({ ...p, page: p?.page - 1 }));
                }
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>
            Page : {pagination?.page}
            <IconButton
              onClick={() =>
                setPagination((p) => ({ ...p, page: p?.page + 1 }))
              }
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
