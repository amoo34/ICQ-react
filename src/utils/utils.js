import { toast } from "react-toastify";
import { secondaryColor } from "../Crud/styles";
import { createBrowserHistory } from "history";
export const convertToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const filReader = new FileReader();
    filReader.readAsDataURL(file);
    filReader.onload = () => {
      resolve(filReader.result);
    };
    filReader.onerror = (error) => {
      reject(error);
    };
  });
};
export const workerTypeOptions = ["GARDNER", "CLEANER", "SWEAPER", "GUARD"];
export const workerExperienceOptions = [
  "6 Months",
  "1 Year",
  "2 Years",
  "2.5 Years",
];

export const capitalizeFirstLetter = (str) => {
  let firstLetter = str?.charAt(0)?.toUpperCase();
  let string = str.slice(1, str?.length);
  string = string?.toLowerCase();
  return firstLetter.concat(string);
};

export const activeSideBarBackground = (pathName, key) => {
  return pathName === key
    ? {
        color: "white",
        backgroundColor: secondaryColor,
        "&:hover": {
          color: "white",
          backgroundColor: secondaryColor,
        },
      }
    : "";
};
export const activeSideBarColor = (pathName, key) => {
  return pathName === key ? { color: "white" } : {};
};

export const errorToast = (msg) => {
  return toast.error(msg, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const successToast = (msg) =>
  toast.success(msg, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const dynamicObjCreator = (obj) => {
  let objectToreturn = {};
  for (const i in obj) {
    if (obj[i]?.length > 0) {
      objectToreturn = {
        ...objectToreturn,
        [i]: obj[i],
      };
    }
  }
  return objectToreturn;
};
export const history = createBrowserHistory();
