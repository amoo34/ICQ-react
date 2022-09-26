import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Chart from "../components/Chart";
import Deposits from "../components/Deposit";
import Orders from "../components/Order";
import { CVform } from "../../CV/pages/CVForm";
import { WorkersList } from "../components/workersList/WorkersList";
import { useSelector } from "react-redux";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const mdTheme = createTheme();

const RecruiterDashboard = () => {
  return <WorkersList />;
};
const AdminDashBoard = () => {
  return (
    <ThemeProvider theme={mdTheme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
export default function Dashboard() {
  const { role } = useSelector((state) => state?.user?.user);
  const renderDashBoard = () => {
    if (role === "WORKER") {
      return <CVform />;
    } else if (role === "RECRUITER") {
      return <RecruiterDashboard />;
    } else if (role === "ADMIN") {
      return <AdminDashBoard />;
    }
  };
  return renderDashBoard();
}
