import {
  Box,
  Collapse,
  createTheme,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Zoom,
  Paper,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../../../utils/utils";
import { CustomTabelCell } from "../../common/components/CustomTableCell";
import { CustomTableRow } from "../../common/components/CustomTableRows";
import { TableSuspenser } from "../../common/components/TableSuspenser";
import { FilterRecruiters } from "../FilterRecruiters";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { getReqWithParams } from "../../../Crud/Crud";
const theme = createTheme();
export const RecruiterList = () => {
  const [recruiters, setRecruiters] = useState("");
  const [openFilters, setOpenFilters] = useState(false);
  const filterRecruiters = useCallback((params) => {
    setRecruiters("loading");
    getReqWithParams("getREquiters", params)
      .then((res) => setRecruiters(res?.data))
      .catch((e) => setRecruiters("error"));
  }, []);
  useEffect(() => {
    filterRecruiters("?filters={}");
  }, [filterRecruiters]);
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Collapse
          in={openFilters}
          mountOnEnter
          unmountOnExit
          orientation="vertical"
        >
          <FilterRecruiters
            filterRecruiters={(params) => filterRecruiters(params)}
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
            </TableRow>
          </TableHead>
          <TableBody>
            {typeof workers === "object" &&
              recruiters?.length &&
              recruiters?.map((worker) => {
                const { userId } = worker;
                const { firstName, lastName } = userId;
                return (
                  <Zoom
                    mountOnEnter
                    unmountOnExit
                    in={typeof recruiters === "object" && recruiters?.length}
                  >
                    <CustomTableRow>
                      <TableCell key={Math.random()}>
                        {capitalizeFirstLetter(firstName)}
                      </TableCell>
                      <TableCell key={Math.random()}>
                        {capitalizeFirstLetter(lastName)}
                      </TableCell>
                    </CustomTableRow>
                  </Zoom>
                );
              })}
            {typeof recruiters === "object" && !recruiters?.length && (
              <TableRow>
                <TableCell sx={{ textAlign: "center" }} colSpan={2}>
                  <Box>No Records!</Box>
                </TableCell>
              </TableRow>
            )}
            {recruiters === "loading" && <TableSuspenser col={2} rows={10} />}
            {recruiters === "error" && (
              <TableRow>
                <TableCell colSpan={2}>
                  <Box sx={{ textAlign: "center" }}>
                    {" "}
                    <GppMaybeIcon sx={{ color: "red" }} />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};
