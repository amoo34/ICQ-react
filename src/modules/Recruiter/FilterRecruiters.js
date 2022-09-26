import React from "react";
import { FilterWorkers } from "../Dashboard/components/workersList/FilterWorkers";

export const FilterRecruiters = ({ filterRecruiters }) => {
  return <FilterWorkers filterWorkers={(params) => filterRecruiters(params)} />;
};
