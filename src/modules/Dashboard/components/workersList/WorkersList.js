import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  TableContainer,
  Button,
  Zoom,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { saveAs } from "file-saver";
import { getReqWithParams } from "../../../../Crud/Crud";
import { FILTERWORKERS } from "../../../../Crud/constsants";
import { capitalizeFirstLetter } from "../../../../utils/utils";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import {
  btnStyles,
  primaryColor,
  secondaryColor,
} from "../../../../Crud/styles";
import { TableSuspenser } from "../../../common/components/TableSuspenser";
import { CustomTableRow } from "../../../common/components/CustomTableRows";
import { CustomTabelCell } from "../../../common/components/CustomTableCell";
import { useDispatch, useSelector } from "react-redux";

import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { CustomInput } from "../../../common/components/CustomInputField";
import { workerCategoryOptions } from "../../../common/components/WorkerOptions";
import { saveOrder } from "../../../../Redux/orders/order.actions";

const theme = createTheme();
export const WorkersList = () => {
  const [filter, setFilter] = useState("");
  const [workers, setWorkers] = useState("");
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state?.user?.user);
  const filterWorkers = useCallback(() => {
    setWorkers("loading");
    let filtersObj = { filter: filter };
    if (filter) {
      getReqWithParams(FILTERWORKERS, `/?filters={}`)
        .then((res) => {
          let { cv } = res?.data?.data;
          let mappedCVs = cv.map((cv) => {
            return { ...cv, checked: false };
          });
          setWorkers(mappedCVs);
        })
        .catch((e) => setWorkers("error"));
    }
  }, [filter]);
  useEffect(() => {
    filterWorkers();
  }, [filterWorkers]);

  const addToCart = (worker) => {
    dispatch(saveOrder(worker));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
      >
        <Box sx={{ width: "50%" }}>
          <CustomInput
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
            label="Select Worker Type"
            select
          >
            <MenuItem value="">Select</MenuItem>
            {workerCategoryOptions}
          </CustomInput>
        </Box>
      </Box>

      <Zoom
        in={filter}
        mountOnEnter
        unmountOnExit
        orientation="horizontal"
        timeout={500}
      >
        <Box sx={{ mt: 5 }}>
          <TableContainer component={Paper}>
            <Table hover>
              <TableHead>
                <TableRow>
                  <CustomTabelCell>First Name</CustomTabelCell>
                  <CustomTabelCell>Last Name</CustomTabelCell>
                  <CustomTabelCell>Category</CustomTabelCell>
                  <CustomTabelCell>Experience</CustomTabelCell>
                  {role === "RECRUITER" && (
                    <CustomTabelCell>Add To Cart</CustomTabelCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {typeof workers === "object" &&
                  workers?.length &&
                  workers?.map((worker) => {
                    const { experience, workerType, userId, cvUrl } = worker;
                    const { firstName, lastName } = userId;
                    return (
                      <Zoom
                        mountOnEnter
                        unmountOnExit
                        in={typeof workers === "object" && workers?.length}
                      >
                        <CustomTableRow>
                          <TableCell key={Math.random()}>
                            {capitalizeFirstLetter(firstName)}
                          </TableCell>
                          <TableCell key={Math.random()}>
                            {capitalizeFirstLetter(lastName)}
                          </TableCell>
                          <TableCell key={Math.random()}>
                            {capitalizeFirstLetter(workerType)}
                          </TableCell>
                          <TableCell key={Math.random()}>
                            {experience}
                          </TableCell>
                          {role === "RECRUITER" && (
                            <TableCell key={Math.random()}>
                              <Button
                                size="small"
                                onClick={() => addToCart(worker)}
                                sx={{ ...btnStyles }}
                                variant="contained"
                              >
                                Add to Cart
                              </Button>
                              <Tooltip title="Download" arrow placement="top">
                                <IconButton
                                  onClick={() => {
                                    var a = document.createElement("a");
                                    a.href = cvUrl;
                                    a.setAttribute("download", "Cv.pdf");
                                    a.click();
                                  }}
                                  sx={{ ml: 2, color: secondaryColor }}
                                >
                                  <DownloadForOfflineIcon
                                    sx={{ fontSize: "30px" }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          )}
                        </CustomTableRow>
                      </Zoom>
                    );
                  })}
                {typeof workers === "object" && !workers?.length && (
                  <TableRow>
                    <TableCell sx={{ textAlign: "center" }} colSpan={4}>
                      <Box>No Records!</Box>
                    </TableCell>
                  </TableRow>
                )}
                {workers === "loading" && (
                  <TableSuspenser
                    col={role === "RECRUITER" ? 5 : 4}
                    rows={10}
                  />
                )}
                {workers === "error" && (
                  <TableRow>
                    <TableCell colSpan={role === "RECRUITER" ? 5 : 2}>
                      <Box sx={{ textAlign: "center" }}>
                        <GppMaybeIcon sx={{ color: "red" }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Zoom>
    </ThemeProvider>
  );
};
