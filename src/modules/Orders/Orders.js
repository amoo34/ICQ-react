import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { secondaryColor } from "../../Crud/styles";
import { history } from "../../utils/utils";
import { Order } from "./Order";

export const Orders = () => {
  const { role } = useSelector((state) => state?.user?.user);
  const { orders } = useSelector((state) => state?.orders);
  console.log(orders, "takenOrders");

  return role === "RECRUITER" ? (
    <Box sx={{ width: "100%" }}>
      <Box component={Paper} sx={{ width: "70%", margin: "auto", mt: 5 }}>
        {orders?.length ? (
          orders?.map((order, index) => <Order order={order} index={index} />)
        ) : (
          <Box sx={{ textAlign: "center", p: 1 }}>
            {" "}
            <Typography variant="h6" sx={{ color: secondaryColor }}>
              Cart is Empty !
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  ) : (
    <Navigate to="/home" />
  );
};
