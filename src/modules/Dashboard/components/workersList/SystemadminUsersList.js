import {
  createTheme,
  TableContainer,
  ThemeProvider,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Collapse,
  IconButton,
  Stack,
  Tooltip,
  TableFooter,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { LISTUSERS } from "../../../../Crud/constsants";
import { getReqWithParams } from "../../../../Crud/Crud";
import HomeIcon from "@mui/icons-material/Home";
import { CustomTabelCell } from "../../../common/components/CustomTableCell";
import { CustomTableRow } from "../../../common/components/CustomTableRows";
import { TableSuspenser } from "../../../common/components/TableSuspenser";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { FilterUsers } from "./FilterUsers";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { CustomPagination } from "../../../common/components/CustomPagination";

export const SystemadminUsersList = ({ role }) => {
  const [users, setUsers] = useState("");
  const [openFilters, setOpenFilters] = useState(false);
  const [pagination, setPagination] = useState({
    sort: {
      createdAt: 1,
    },
    page: 1,
    recordsPerPage: 10,
    totalPages: 1,
    totalRecords: 0,
    filterFlag: 0,
  });
  const { sort, page, recordsPerPage, filterFlag } = pagination;

  const getUsers = useCallback(
    (params, navigationFlag) => {
      if (role) {
        if (filterFlag > 0 && !navigationFlag) {
          if (
            document.getElementById("navigateToHome").style.display === "none"
          ) {
            document.getElementById("navigateToHome").style.display = "block";
          }
        }

        setUsers("loading");
        getReqWithParams(LISTUSERS, params)
          .then((res) => {
            const { data, pager } = res?.data;
            setUsers(data);

            setPagination((p) => ({
              ...p,
              totalRecords: pager.totalRecords,
            }));
            if (Math.ceil(pager.totalRecords / pager.recordsPerPage)) {
              setPagination((p) => ({
                ...p,
                totalPages: Math.ceil(
                  pager.totalRecords / pager.recordsPerPage
                ),
              }));
            }
          })
          .catch((e) => setUsers("error"));
      }
    },
    [filterFlag, role]
  );
  const onRoleChange = useCallback(() => {
    if (role) {
      setOpenFilters(false);
      setPagination({
        sort: {
          createdAt: 1,
        },
        page: 1,
        recordsPerPage: 10,
        filterFlag: 0,
      });
    }
  }, [role]);
  useEffect(() => {
    if (filterFlag === 0) {
      getUsers(
        `?page=${page}&sort=${JSON.stringify({
          ...sort,
        })}&recordsPerPage=${recordsPerPage}&filters=${JSON.stringify({
          role: role,
        })}`,
        false
      );
    }
  }, [getUsers, role, page, sort, recordsPerPage, filterFlag]);
  useEffect(() => {
    return () => {
      onRoleChange();
    };
  }, [onRoleChange]);
  console.log(pagination?.filterFlag, "filterFlgacoming");
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Collapse
          in={openFilters}
          mountOnEnter
          unmountOnExit
          orientation="vertical"
        >
          <FilterUsers
            filterUsers={(params) => getUsers(params)}
            role={role}
            pagination={pagination}
            setPagination={setPagination}
          />
        </Collapse>
        <Stack direction="row" justifyContent="end">
          <Box sx={{ p: 1 }}>
            {filterFlag > 0 && (
              <Tooltip title="Navigate To Default" arrow placement="top">
                <IconButton
                  id="navigateToHome"
                  onClick={() => {
                    if (openFilters) {
                      setOpenFilters(false);
                    }

                    document.getElementById("navigateToHome").style.display =
                      "none";
                    let queryParams = `?page=${1}&sort=${JSON.stringify({
                      createdAt: "1",
                    })}&recordsPerPage=${10}&filters=${JSON.stringify({
                      role: role,
                    })}`;
                    getUsers(queryParams, true);
                  }}
                >
                  <HomeIcon color="primary" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Box sx={{ p: 1 }}>
            <IconButton onClick={() => setOpenFilters((p) => !p)}>
              {openFilters ? (
                <CloseIcon color="error" />
              ) : (
                <SearchIcon color="primary" />
              )}
            </IconButton>
          </Box>
        </Stack>

        <Table>
          <TableHead>
            <CustomTabelCell>First Name</CustomTabelCell>
            <CustomTabelCell>Last Name</CustomTabelCell>
            <CustomTabelCell>Email</CustomTabelCell>
            <CustomTabelCell>Address Name</CustomTabelCell>
            <CustomTabelCell>Phone Name</CustomTabelCell>
          </TableHead>
          <TableBody>
            {typeof users === "object" &&
              users?.length &&
              users?.map((user) => {
                let { firstName, lastName, email, phoneNumber, address } = user;
                return (
                  <CustomTableRow key={Math.random()}>
                    <TableCell>{firstName}</TableCell>
                    <TableCell>{lastName}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{address}</TableCell>
                    <TableCell>{phoneNumber}</TableCell>
                  </CustomTableRow>
                );
              })}

            {typeof users === "object" && !users?.length && (
              <TableRow>
                <TableCell sx={{ textAlign: "center" }} colSpan={5}>
                  <Box>No Records!</Box>
                </TableCell>
              </TableRow>
            )}
            {users === "loading" && <TableSuspenser col={5} rows={10} />}
            {users === "error" && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box sx={{ textAlign: "center" }}>
                    <GppMaybeIcon sx={{ color: "red" }} />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <CustomPagination
                  pagination={pagination}
                  setPagination={setPagination}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};
