import "./App.css";
import Signin from "./modules/auth/pages/Signin";
import Dashboard from "./modules/Dashboard/pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./PublicRoute/PublicRoute";
import SignUp from "./modules/auth/pages/Signup";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastContainer } from "./modules/common/components/CustomToastContainer";
import { ErrorPage } from "./ErrorPage/ErrorPage";
import { Orders } from "./modules/Orders/Orders";
import { Profile } from "./modules/Dashboard/components/Profile/Profile";
import { SystemadminUsersList } from "./modules/Dashboard/components/workersList/SystemadminUsersList";
function App() {
  return (
    <div>
      <CustomToastContainer />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route exact path="*" element={<ErrorPage />} />
        <Route
          exact
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/home"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <PrivateRoute>
              <Orders isCart={true} />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/OrderedCv's"
          element={
            <PrivateRoute>
              <Orders isCart={false} />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/Recruiters"
          element={
            <PrivateRoute>
              <SystemadminUsersList role={"RECRUITER"} />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/Workers"
          element={
            <PrivateRoute>
              <SystemadminUsersList role={"WORKER"} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
