import { MenuItem } from "@mui/material";
import {
  capitalizeFirstLetter,
  workerTypeOptions,
  workerExperienceOptions,
} from "../../../utils/utils";

export const workerCategoryOptions = workerTypeOptions.map((category) => (
  <MenuItem value={category} key={Math.random()}>
    {capitalizeFirstLetter(category)}
  </MenuItem>
));
export const workerExpOptions = workerExperienceOptions.map((exp) => (
  <MenuItem value={exp} key={Math.random()}>
    {exp}
  </MenuItem>
));
