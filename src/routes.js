import { useRoutes } from "react-router-dom";
import Signin from "./modules/auth/pages/Signin";
import Signup from "./modules/auth/pages/Signup";
import Dashboard from "./modules/Dashboard/pages/Dashboard";
import WorkerLayout from "./modules/common/components/WorkerLayout";
import { CVform } from "./modules/CV/pages/CVForm";

// ----------------------------------------------------------------------

export default function Router() {
  //   let newAccess_Token = null;
  //   newAccess_Token = localStorage.getItem('access_token');
  //   console.log("SSSSSSSSSSSSSSSSSSSS",newAccess_Token)
  return useRoutes([
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/cv",
      element: <WorkerLayout />,
      // element: <User />,
      children: [{ path: "", element: <CVform /> }],
    },
    {
      path: "/",
      element: <Signin />,
    },
    // {
    //   path: '/cv',
    //   element: <CVForm />,

    // },
    { path: "/recruiter", element: <Dashboard /> },
  ]);
}
