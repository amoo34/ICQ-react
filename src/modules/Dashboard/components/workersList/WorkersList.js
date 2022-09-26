import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  Collapse,
  Checkbox,
  Button,
  Zoom,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import { FilterWorkers } from "./FilterWorkers";
import { getReqWithParams } from "../../../../Crud/Crud";
import { FILTERWORKERS } from "../../../../Crud/constsants";
import {
  capitalizeFirstLetter,
  errorToast,
  successToast,
} from "../../../../utils/utils";
import { btnStyles } from "../../../../Crud/styles";
import { TableSuspenser } from "../../../common/components/TableSuspenser";
import { CustomTableRow } from "../../../common/components/CustomTableRows";
import { CustomTabelCell } from "../../../common/components/CustomTableCell";
import { useSelector } from "react-redux";

import GppMaybeIcon from "@mui/icons-material/GppMaybe";

const theme = createTheme();
export const WorkersList = () => {
  const [openFilters, setOpenFilters] = useState(false);
  const [workers, setWorkers] = useState("");
  const { role } = useSelector((state) => state?.user?.user);
  const filterWorkers = useCallback((params) => {
    setWorkers("loading");
    getReqWithParams(FILTERWORKERS, params)
      .then((res) => {
        let { cv } = res?.data?.data;
        let mappedCVs = cv.map((cv) => {
          return { ...cv, checked: false };
        });
        setWorkers(mappedCVs);
      })
      .catch((e) => setWorkers("error"));
  }, []);
  useEffect(() => {
    filterWorkers("/?filters={}");
  }, [filterWorkers]);
  let checkedCVs = useMemo(() => {
    if (typeof workers === "object" && workers?.length) {
      return workers?.filter((cv) => {
        return cv?.checked;
      });
    }
  }, [workers]);
  const sendInvitaion = () => {
    if (checkedCVs?.length) {
      successToast("Invitation has been sent!");
    } else {
      errorToast("Please select at least one worker!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Collapse
          in={openFilters}
          mountOnEnter
          unmountOnExit
          orientation="vertical"
        >
          <FilterWorkers
            setWorkers={setWorkers}
            filterWorkers={(params) => filterWorkers(params)}
          />
        </Collapse>
        <Box sx={{ display: "flex", justifyContent: "end", p: 1 }}>
          <IconButton onClick={() => setOpenFilters((p) => !p)}>
            {openFilters ? (
              <CloseIcon color="error" />
            ) : (
              <SearchIcon color="primary" />
            )}
          </IconButton>
        </Box>
        <Table hover>
          <TableHead>
            <TableRow>
              <CustomTabelCell>First Name</CustomTabelCell>
              <CustomTabelCell>Last Name</CustomTabelCell>
              <CustomTabelCell>Category</CustomTabelCell>
              <CustomTabelCell>Experience</CustomTabelCell>
              {role === "RECRUITER" && (
                <CustomTabelCell>Invitation</CustomTabelCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {typeof workers === "object" &&
              workers?.length &&
              workers?.map((worker) => {
                const { experience, workerType, userId } = worker;
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
                      <TableCell key={Math.random()}>{experience}</TableCell>
                      {role === "RECRUITER" && (
                        <TableCell key={Math.random()}>
                          <Checkbox
                            onClick={() => {
                              let cvs = [...workers];
                              let mappedCvs = cvs.map((cv) => {
                                return {
                                  ...cv,
                                  checked: cv?.checked === true ? false : true,
                                };
                              });
                              setWorkers(mappedCvs);
                            }}
                            checked={worker.checked}
                          />
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
              <TableSuspenser col={role === "RECRUITER" ? 5 : 4} rows={10} />
            )}
            {workers === "error" && (
              <TableRow>
                <TableCell colSpan={2}>
                  <Box sx={{ textAlign: "center" }}>
                    <GppMaybeIcon sx={{ color: "red" }} />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {role === "RECRUITER" && (
          <Button
            size="small"
            onClick={() => sendInvitaion()}
            sx={{ m: 3, ...btnStyles }}
            variant="contained"
          >
            Send Invitaion
          </Button>
        )}
      </TableContainer>
    </ThemeProvider>
  );
};
