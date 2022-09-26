import { Button, Grid, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { btnStyles } from "../../../../Crud/styles";
import { dynamicObjCreator, errorToast } from "../../../../utils/utils";
import { CustomInput } from "../../../common/components/CustomInputField";

import {
  workerCategoryOptions,
  workerExpOptions,
} from "../../../common/components/WorkerOptions";

export const FilterWorkers = ({ filterWorkers }) => {
  const [values, setValues] = useState({
    exp: "",
    cat: "",
    catNum: "",
    expNum: "",
  });
  const { exp, cat, expNum, catNum } = values;
  const onChangeHandler = (e, key) => {
    const { value } = e?.target;
    setValues((p) => ({ ...p, [key]: value }));
  };
  const searchWorker = () => {
    console.log(exp, "category", cat);
    if (!exp && !cat) {
      errorToast(
        "Please select at least one search filter either Experienrce or Category!"
      );
    } else {
      let filtersObj = dynamicObjCreator({ ...values });

      filterWorkers(`/?filters=${JSON.stringify(filtersObj)}`);
    }
  };
  return (
    <Grid sx={{ p: 2 }} container columnSpacing={2} rowSpacing={2}>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          select
          fullWidth
          size="small"
          id="filterWorkerExp"
          name="filterWorkerExp"
          label="Woker Experience"
          value={exp}
          onChange={(e) => onChangeHandler(e, "exp")}
        >
          <MenuItem value={""}>Select</MenuItem>
          {workerExpOptions}
        </CustomInput>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          select
          fullWidth
          size="small"
          id="filterWorkerCategory"
          label="Woker Category"
          name="filterWorkerCategory"
          value={cat}
          onChange={(e) => onChangeHandler(e, "cat")}
        >
          <MenuItem value={""}>Select</MenuItem>
          {workerCategoryOptions}
        </CustomInput>
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          fullWidth
          size="small"
          id="filterWorkerExpNUm"
          label="Required Woker Experience No."
          name="filterWorkerExpNUm"
          value={expNum}
          type="number"
          inputProps={{ min: 4, max: 10 }}
          onChange={(e) => onChangeHandler(e, "expNum")}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <CustomInput
          fullWidth
          size="small"
          id="filterWorkerCategoryNUm"
          label="Required Woker Category No."
          name="filterWorkerCategoryNUm"
          value={catNum}
          type="number"
          inputProps={{ min: 4, max: 10 }}
          onChange={(e) => onChangeHandler(e, "catNum")}
        >
          {workerCategoryOptions}
        </CustomInput>
      </Grid>
      <Grid
        sx={{ display: "flex", justifyContent: "end" }}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        <Button
          onClick={() => searchWorker()}
          sx={{ ...btnStyles }}
          variant="contained"
        >
          Filter
        </Button>
      </Grid>
    </Grid>
  );
};
