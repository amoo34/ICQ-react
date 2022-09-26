import "./App.css";
import Signin from "./modules/auth/pages/Signin";
import Dashboard from "./modules/Dashboard/pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./Redux/store/store";
import { store } from "./Redux/store/store";
import { PublicRoute } from "./PublicRoute/PublicRoute";
import SignUp from "./modules/auth/pages/Signup";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastContainer } from "./modules/common/components/CustomToastContainer";
import { ErrorPage } from "./ErrorPage/ErrorPage";
import { RecruiterList } from "./modules/Recruiter/RecruiterList/RecruiterList";
import { WorkersList } from "./modules/Dashboard/components/workersList/WorkersList";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils/utils";
function App() {
  return (
    <>
      <CustomToastContainer />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HistoryRouter history={history}>
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
                path="/Recruiters"
                element={
                  <PrivateRoute>
                    <RecruiterList />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/Workers"
                element={
                  <PrivateRoute>
                    <WorkersList />
                  </PrivateRoute>
                }
              />
            </Routes>
          </HistoryRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
