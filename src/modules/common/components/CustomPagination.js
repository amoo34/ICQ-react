import { Box, Grid, IconButton, MenuItem } from "@mui/material";
import React from "react";
import { rowsPerPageArray } from "../../../utils/utils";
import { CustomInput } from "./CustomInputField";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
export const CustomPagination = ({ setPagination, pagination }) => {
  const { recordsPerPage, page, totalRecords, totalPages } = pagination;
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
          <Box sx={{ ml: 1 }}>
            <IconButton
              onClick={() => setPagination((p) => ({ ...p, page: 1 }))}
              disabled={page !== 1 ? false : true}
            >
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
            <IconButton
              disabled={page !== 1 ? false : true}
              onClick={() =>
                setPagination((p) => ({ ...p, page: p?.page - 1 }))
              }
            >
              <NavigateBeforeIcon />
            </IconButton>
            {page * recordsPerPage -
              recordsPerPage +
              1 +
              "-" +
              (page * recordsPerPage > totalRecords
                ? totalRecords
                : page * recordsPerPage) +
              " of " +
              totalRecords}
            <IconButton
              disabled={page !== totalPages ? false : true}
              onClick={() =>
                setPagination((p) => ({ ...p, page: p?.page + 1 }))
              }
            >
              <NavigateNextIcon />
            </IconButton>
            <IconButton
              onClick={() => setPagination((p) => ({ ...p, page: totalPages }))}
              disabled={page !== totalPages ? false : true}
            >
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
