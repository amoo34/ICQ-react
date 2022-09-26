import React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider, Field } from "formik";
import { convertToBase64 } from "../../../utils/utils";
import { postReq } from "../../../Crud/Crud";
import { UPLOAD_CV } from "../../../Crud/constsants";
import { useSelector } from "react-redux";
import {
  workerCategoryOptions,
  workerExpOptions,
} from "../../common/components/WorkerOptions";
import { CustomInput } from "../../common/components/CustomInputField";
import { Paper, Slide } from "@mui/material";
import { btnStyles, secondaryColor } from "../../../Crud/styles";

const theme = createTheme();

export const CVform = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log(user, "userConsole");
  const { _id: userId } = user;
  const SignupSchema = Yup.object().shape({
    workerType: Yup.string().required("Worker Type is required"),
    experience: Yup.string().required("Experience is required"),
    cvPdf: Yup.string().required("CV is required"),
  });

  const formik = useFormik({
    initialValues: {
      workerType: "",
      experience: "",
      cvPdf: "",
    },
    validationSchema: SignupSchema,

    onSubmit: async (values) => {
      console.log("Values of Form are", values);
      const { cvPdf } = values;
      const { name } = cvPdf;
      let trimmedName = name?.replace(".pdf", "");
      console.log(name, "File");
      let base64File = await convertToBase64(cvPdf);

      postReq(UPLOAD_CV, {
        ...values,
        cvPdf: base64File,
        cvPdfName: trimmedName?.replace(/\s/g, ""),
        userId: userId,
      })
        .then()
        .catch();
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
                    <Grid item xs={12} sm={6}>
                      <CustomInput
                        fullWidth
                        select
                        id="experience"
                        label="*Experience"
                        name="experience"
                        {...getFieldProps("experience")}
                        error={Boolean(touched.experience && errors.experience)}
                        helperText={touched.experience && errors.experience}
                      >
                        {workerExpOptions}
                      </CustomInput>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Field name="cvPdf">
                        {(props) => (
                          <CustomInput
                            onChange={(e) => {
                              handleChange(e);
                              setFieldValue("cvPdf", e?.target.files[0]);
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
