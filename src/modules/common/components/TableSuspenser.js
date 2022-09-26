import { TableCell, TableRow, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";

export const TableSuspenser = ({ rows, col }) => {
  const [suspenser, setSuspenser] = useState([]);
  useEffect(() => {
    const appenedArray = () => {
      let arr = [];
      for (let i = 0; i < rows; i++) {
        arr.push({
          [i]: true,
        });
      }
      if (arr?.length) {
        for (let i = 0; i < arr?.length; i++) {
          for (let iterator = 0; iterator < col; iterator++) {
            if (iterator !== 0) {
              arr[i] = { ...arr[i], [iterator + "ok"]: true };
            }
          }
        }
      }

      return arr;
    };
    setSuspenser(appenedArray());
  }, [rows, col]);

  const returnTableCells = (suspenser) => {
    let suspense = Object.keys(suspenser);
    for (let i = 0; i < suspense?.length; i++) {
      return suspense?.map((e) => (
        <TableCell>
          <Skeleton variant="rectangular" width={75} height={25} />
        </TableCell>
      ));
    }
  };
  return (
    <>
      {suspenser?.length &&
        suspenser?.map((sus) => {
          return (
            <TableRow key={Math.random()}>{returnTableCells(sus)}</TableRow>
          );
        })}
    </>
  );
};
