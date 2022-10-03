import React, { useRef } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider, Field } from "formik";
import { convertToBase64, errorToast } from "../../../utils/utils";
import { postReq } from "../../../Crud/Crud";
import { UPLOAD_CV } from "../../../Crud/constsants";
import { useSelector } from "react-redux";
import { workerCategoryOptions } from "../../common/components/WorkerOptions";
import { CustomInput } from "../../common/components/CustomInputField";
import { Paper, Slide } from "@mui/material";
import { btnStyles, secondaryColor } from "../../../Crud/styles";
import { CustomToastContainer } from "../../common/components/CustomToastContainer";
import { useConfirmation } from "../../Hooks/useConfirmation";

const theme = createTheme();

export const CVform = () => {
  const user = useSelector((state) => state?.user?.user);
  const valuesRef = useRef();
  const [modal, setOpen] = useConfirmation({
    modalTitle: "Payment",
    modalContent: (
      <>
        You have successfully passed the correct information in order to upload
        the CV you must have to pay 10$ !
      </>
    ),
    actionProps: {
      acceptText: "Pay",
      rejectText: "Cancel",
      actions: true,
      onAccept: () =>
        postReq(UPLOAD_CV, {
          ...valuesRef.current,
          price: "10$",
        })
          .then(() => {
            setOpen(false);
          })
          .catch(),
      onReject: () => setOpen(false),
    },
  });
  console.log(valuesRef.current, "okGettingIt");
  const { _id: userId } = user;
  const SignupSchema = Yup.object().shape({
    workerType: Yup.string().required("Worker Type is required"),
    firstName: Yup.string().required("First Name Type is required"),
    lastName: Yup.string().required("Last Name  is required"),
    cvPdf: Yup.string().required("CV is required"),
  });

  const formik = useFormik({
    initialValues: {
      workerType: "",
      firstName: "",
      lastName: "",
      cvPdf: "",
    },
    validationSchema: SignupSchema,

    onSubmit: async (values, { resetForm }) => {
      console.log("Values of Form are", values);
      const { cvPdf } = values;
      const { name } = cvPdf;
      let trimmedName = name?.replace(".pdf", "");
      console.log(name, "File");
      let base64File = await convertToBase64(cvPdf);
      setOpen(true);
      valuesRef.current = {
        ...values,
        cvPdf: base64File,
        cvPdfName: trimmedName?.replace(/\s/g, ""),
        userId: userId,
      };
      resetForm();
      document.getElementById("cvPdf").value = "";
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    handleChange,
    setFieldValue,
  } = formik;
  let hasMount = true;

  return (
    <ThemeProvider theme={theme}>
      {modal}
      <CustomToastContainer />
      <Container component="main" maxWidth="md">
        <Slide mountOnEnter unmountOnExit in={hasMount} timeout={500}>
          <Box component={Paper} sx={{ py: 3, px: 2, mt: 5 }}>
            <CssBaseline />
            <center>
              <Typography
                component="h2"
                variant="h4"
                color={secondaryColor}
                gutterBottom
              >
                Create Your CV
              </Typography>
            </center>

            <FormikProvider value={formik} onSubmit={handleSubmit}>
              <Form autoComplete="off">
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <CustomInput
                        fullWidth
                        id="firstName"
                        label="*First Name"
                        name="firstName"
                        {...getFieldProps("firstName")}
                        error={Boolean(touched.firstName && errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomInput
                        fullWidth
                        id="lastName"
                        label="*Last Name"
                        name="lastName"
                        {...getFieldProps("lastName")}
                        error={Boolean(touched.lastName && errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <CustomInput
                        select
                        fullWidth
                        id="workerType"
                        label="*Worker Type"
                        name="workerType"
                        {...getFieldProps("workerType")}
                        error={Boolean(touched.workerType && errors.workerType)}
                        helperText={touched.workerType && errors.workerType}
                      >
                        {workerCategoryOptions}
                      </CustomInput>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Field name="cvPdf">
                        {(props) => (
                          <CustomInput
                            onChange={(e) => {
                              if (e?.target.files[0]?.type?.includes("pdf")) {
                                handleChange(e);
                                console.log("reachingHereOK");
                                setFieldValue("cvPdf", e?.target.files[0]);
                              } else {
                                e.target.value = "";
                                errorToast("Only Pdf is allowed!");
                              }
                            }}
                            fullWidth
                            id="cvPdf"
                            name="cvPdf"
                            type="file"
                            {...props}
                            error={Boolean(touched.cvPdf && errors.cvPdf)}
                            helperText={touched.cvPdf && errors.cvPdf}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, ...btnStyles, width: "50%" }}
                  >
                    Create CV
                  </Button>
                </Box>
              </Form>
            </FormikProvider>
          </Box>
        </Slide>
      </Container>
    </ThemeProvider>
  );
};
