import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  TableContainer,
  Button,
  Zoom,
  MenuItem,
  TableFooter,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

import { getReqWithParams } from "../../../../Crud/Crud";
import { FILTERWORKERS } from "../../../../Crud/constsants";
import {
  capitalizeFirstLetter,
  reduxValueChecker,
} from "../../../../utils/utils";

import { btnStyles, secondaryBtnStyles } from "../../../../Crud/styles";
import { TableSuspenser } from "../../../common/components/TableSuspenser";
import { CustomTableRow } from "../../../common/components/CustomTableRows";
import { CustomTabelCell } from "../../../common/components/CustomTableCell";
import { useDispatch, useSelector } from "react-redux";

import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { CustomInput } from "../../../common/components/CustomInputField";
import { workerCategoryOptions } from "../../../common/components/WorkerOptions";
import { saveOrder } from "../../../../Redux/orders/order.actions";
import { CustomPagination } from "../../../common/components/CustomPagination";

const theme = createTheme();
export const WorkersList = () => {
  const [workers, setWorkers] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    recordsPerPage: 10,
    totalPages: 1,
    totalRecords: 0,
    filters: {},
    sort: {
      createdAt: 1,
    },
  });
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state?.user?.user);
  const { orders, paidOrders } = useSelector((state) => state?.orders);
  const filterWorkers = useCallback(() => {
    let filtersObj = { ...pagination?.filters };
    console.log(Object?.keys(filtersObj)?.length, "filtersObj");
    if (Object?.keys(filtersObj)?.length) {
      setWorkers("loading");
      getReqWithParams(
        FILTERWORKERS,
        `/?page=${pagination?.page}&sort=${JSON.stringify({
          ...pagination?.sort,
        })}&recorsPerPage=${pagination?.recordsPerPage}&filters=${
          Object?.keys(filtersObj)?.length ? JSON.stringify(filtersObj) : {}
        }`
      )
        .then((res) => {
          let { data, pager } = res?.data;
          setWorkers(data);
          setPagination((p) => ({
            ...p,
            totalRecords: pager?.totalRecords,
          }));
          if (Math.ceil(pager?.totalRecords / pager?.recordsPerPage)) {
            setPagination((p) => ({
              ...p,
              totalPages: Math.ceil(
                pager?.totalRecords / pager?.recordsPerPage
              ),
            }));
          }
        })
        .catch((e) => setWorkers("error"));
    }
  }, [
    pagination?.filters,
    pagination?.page,
    pagination?.recordsPerPage,
    pagination.sort,
  ]);
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
            value={pagination?.filters?.workerType}
            onChange={(e) => {
              let { value } = e.target;
              setPagination((p) => ({
                ...p,
                filters: value ? { workerType: value } : "",
              }));
            }}
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
        in={Object?.keys(pagination?.filters)?.length}
        mountOnEnter
        unmountOnExit
        orientation="horizontal"
        timeout={500}
      >
        <Box sx={{ mt: 5 }} component={Paper}>
          <TableContainer>
            <Table hover>
              <TableHead>
                <TableRow>
                  <CustomTabelCell>First Name</CustomTabelCell>
                  <CustomTabelCell>Last Name</CustomTabelCell>
                  <CustomTabelCell>Category</CustomTabelCell>
                  {/* <CustomTabelCell>Experience</CustomTabelCell> */}
                  {role === "RECRUITER" && (
                    <CustomTabelCell>Add To Cart</CustomTabelCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {typeof workers === "object" &&
                  workers?.length &&
                  workers?.map((worker) => {
                    // const { experience, workerType, userId, cvUrl, _id } =
                    //   worker;
                    const { workerType, userId, _id } = worker;
                    let hasInCart = reduxValueChecker(orders, "_id", _id);
                    let hasInPaidCvs = reduxValueChecker(
                      paidOrders,
                      "_id",
                      _id
                    );
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
                          {/* <TableCell key={Math.random()}>
                            {experience}
                          </TableCell> */}
                          {role === "RECRUITER" && (
                            <TableCell key={Math.random()}>
                              {/* <Grid container>
                                <Grid item xs={10} sm={10} md={8} lg={6} xl={5}> */}
                              <Button
                                disabled={
                                  hasInCart || hasInPaidCvs ? true : false
                                }
                                size="small"
                                onClick={() => addToCart(worker)}
                                sx={{
                                  mt: 0.3,
                                  ...(hasInCart
                                    ? { ...secondaryBtnStyles }
                                    : { ...btnStyles }),
                                }}
                                variant="contained"
                              >
                                {hasInCart
                                  ? "Added To Cart"
                                  : hasInPaidCvs
                                  ? "Paid"
                                  : "Add To Cart"}
                              </Button>
                              {/* </Grid> */}
                              {/* <Grid item xs={2} sm={2} md={4} lg={6} xl={7}>
                                  <Tooltip
                                    title="Download CV"
                                    arrow
                                    placement="top"
                                  >
                                    <IconButton
                                      onClick={() => {
                                        var a = document.createElement("a");
                                        a.href = cvUrl;
                                        a.setAttribute("download", "Cv.pdf");
                                        a.click();
                                      }}
                                      sx={{ color: secondaryColor }}
                                    >
                                      <DownloadForOfflineIcon
                                        sx={{ fontSize: "22px" }}
                                      />
                                    </IconButton>
                                  </Tooltip>{" "}
                                </Grid> */}
                              {/* </Grid> */}
                            </TableCell>
                          )}
                        </CustomTableRow>
                      </Zoom>
                    );
                  })}
                {typeof workers === "object" && !workers?.length && (
                  <TableRow>
                    <TableCell
                      sx={{ textAlign: "center" }}
                      colSpan={role === "RECRUITER" ? 4 : 2}
                    >
                      <Box>No Records!</Box>
                    </TableCell>
                  </TableRow>
                )}
                {workers === "loading" && (
                  <TableSuspenser
                    col={role === "RECRUITER" ? 4 : 3}
                    rows={10}
                  />
                )}
                {workers === "error" && (
                  <TableRow>
                    <TableCell colSpan={role === "RECRUITER" ? 4 : 2}>
                      <Box sx={{ textAlign: "center" }}>
                        <GppMaybeIcon sx={{ color: "red" }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>
                    <CustomPagination
                      pagination={pagination}
                      setPagination={setPagination}
                    />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Zoom>
    </ThemeProvider>
  );
};
