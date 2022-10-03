import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { btnStyles } from "../../../../Crud/styles";
import { dynamicObjCreator, errorToast } from "../../../../utils/utils";
import { CustomInput } from "../../../common/components/CustomInputField";

export const FilterUsers = ({
  filterUsers,
  role,
  pagination,
  setPagination,
}) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
  });
  const { firstName, lastName, address, email, phoneNumber } = values;
  const { page, recordsPerPage, sort } = pagination;
  const onChangeHandler = (e, key) => {
    const { value } = e?.target;
    setValues((p) => ({ ...p, [key]: value }));
  };
  const searchWorker = () => {
    if (!firstName && !lastName && !address && !email && !phoneNumber) {
      errorToast(
        "Please select at least one search filter either Experienrce or Category!"
      );
    } else {
      setPagination((p) => ({ ...p, filterFlag: p?.filterFlag + 1 }));
      let filtersObj = dynamicObjCreator({
        ...values,
        role: role,
      });
      let query = `?page=${page}&sort=${JSON.stringify({
        ...sort,
      })}&recordsPerPage=${recordsPerPage}`;
      filterUsers(`/?${query}&filters=${JSON.stringify(filtersObj)}`, false);
    }
  };
  return (
    <Grid sx={{ p: 2 }} container columnSpacing={2} rowSpacing={2}>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          fullWidth
          size="small"
          label="First Name"
          value={firstName}
          onChange={(e) => onChangeHandler(e, "firstName")}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          fullWidth
          size="small"
          label="Last Name"
          value={lastName}
          onChange={(e) => onChangeHandler(e, "lastName")}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          fullWidth
          size="small"
          label="Email"
          value={email}
          onChange={(e) => onChangeHandler(e, "email")}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          fullWidth
          size="small"
          label="phoneNumber"
          value={phoneNumber}
          onChange={(e) => onChangeHandler(e, "phoneNumber")}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          fullWidth
          size="small"
          label="address"
          value={address}
          onChange={(e) => onChangeHandler(e, "address")}
        />
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "end" }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Button
          onClick={() => searchWorker()}
          sx={{ ...btnStyles }}
          variant="contained"
        >
          Filter
        </Button>
      </Grid>
    </Grid>
  );
};
