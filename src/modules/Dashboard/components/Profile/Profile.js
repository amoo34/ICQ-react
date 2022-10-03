import { Box, Button, Chip, Grid, Paper, Zoom } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { UPDATEUSER } from "../../../../Crud/constsants";
import { patchReq } from "../../../../Crud/Crud";
import { btnStyles } from "../../../../Crud/styles";
import {
  capitalizeFirstLetter,
  dynamicObjectCreator,
} from "../../../../utils/utils";
import { CustomInput } from "../../../common/components/CustomInputField";

export const Profile = () => {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [inputToEdit, setinputToEdit] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const onChangeHandler = (e, key) => {
    let { value } = e.target;
    setinputToEdit((p) => ({ ...p, [key]: value }));
    setValues((p) => ({ ...p, [key]: value }));
  };
  const inputRef = useRef();
  useEffect(() => {
    if (updateFlag) {
      inputRef.current.focus();
    }
  }, [updateFlag]);
  const {
    role,
    address,
    phoneNumber,
    email,
    firstName,
    lastName,
    createdAt,
    updatedAt,
    _id,
  } = useSelector((state) => state?.user?.user);

  useEffect(() => {
    let obj = {
      role,
      address,
      phoneNumber,
      email,
      firstName,
      lastName,
    };
    setValues(obj);
  }, [role, address, phoneNumber, email, firstName, lastName]);
  const chipColorDecider = () => {
    if (role === "ADMIN") {
      return "success";
    } else if (role === "RECRUITER") {
      return "info";
    } else if (role === "WORKER") {
      return "primary";
    }
  };
  const dateConverter = (date) => {
    return date.replace("-", "/").split("T")[0].replace("-", "/");
  };
  let hasMOunt = true;
  return (
    <Zoom in={hasMOunt} mountOnEnter unmountOnExit>
      <Box
        sx={{ mt: 5, width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Box
          component={Paper}
          sx={{
            width: { xs: "100%", sm: "70%", md: "70%", lg: "70%", xl: "70%" },
            p: 5,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomInput
                fullWidth
                inputProps={{
                  ref: inputRef,
                }}
                value={values?.firstName}
                type="text"
                onChange={(e) => onChangeHandler(e, "firstName")}
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomInput
                fullWidth
                value={values?.lastName}
                type="text"
                onChange={(e) => onChangeHandler(e, "lastName")}
                label="Last Name"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <CustomInput
                fullWidth
                value={values?.phoneNumber}
                type="text"
                onChange={(e) => onChangeHandler(e, "phoneNumber")}
                label="Phone Number"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              <CustomInput
                fullWidth
                value={values?.email}
                type="text"
                onChange={(e) => onChangeHandler(e, "email")}
                label="Email"
              />
            </Grid>
            <Grid item xs={8} sm={12} md={8} lg={8} xl={8}>
              <CustomInput
                fullWidth
                value={values?.address}
                multiline
                type="text"
                onChange={(e) => onChangeHandler(e, "address")}
                label="Address"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              Registered : {dateConverter(createdAt)}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              Last Time Updated : {dateConverter(updatedAt)}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Chip
                  sx={{ mt: 1.5 }}
                  color={chipColorDecider()}
                  label={`Role : ${capitalizeFirstLetter(role)}`}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
                <Button
                  onClick={async () => {
                    if (!updateFlag) {
                      setUpdateFlag(true);
                    } else {
                      let values = await dynamicObjectCreator(inputToEdit);
                      console.log(values, "valuesChecking");
                      if (Object?.keys(values)?.length) {
                        patchReq(`${UPDATEUSER}/${_id}`, {
                          ...values,
                        })
                          .then()
                          .catch();
                      }
                    }
                  }}
                  sx={{ ...btnStyles, width: !updateFlag ? "250px" : "200px" }}
                  variant="contained"
                >
                  {updateFlag ? "Update" : "Want To Update Click Me!"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Zoom>
  );
};
