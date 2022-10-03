import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { btnStyles, secondaryColor } from "../../Crud/styles";
import { savePaidOrders } from "../../Redux/orders/order.actions";
import { Order } from "./Order";

export const Orders = ({ isCart }) => {
  const { role } = useSelector((state) => state?.user?.user);
  const { orders, paidOrders } = useSelector((state) => state?.orders);
  const dispatch = useDispatch();
  const decideRender = (key, stringKey) => {
    return (
      <Box sx={{ width: "100%" }}>
        <Box
          component={Paper}
          sx={{
            width: { xs: "100%", sm: "70%", md: "70%", lg: "70%", xl: "70%" },
            margin: "auto",
            mt: 5,
          }}
        >
          {key?.length ? (
            key?.map((order, index) => (
              <Order order={order} index={index} isCart={isCart} />
            ))
          ) : (
            <Box sx={{ textAlign: "center", p: 1 }}>
              {" "}
              <Typography variant="h6" sx={{ color: secondaryColor }}>
                {stringKey === "orders" ? "Cart is Empty !" : "No Paid Orders!"}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              ...(isCart && {
                px: 2,
                py: 1,
                backgroundColor: "#4aabedd1",
                color: "white",
                backdropFilter: "blur(10px)",
              }),
            }}
          >
            {stringKey === "orders" && key?.length ? (
              <Grid container>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Box>
                    <Typography variant="h6">
                      Total csv's : {key?.length}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">Total Payment : 200$</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      onClick={() => dispatch(savePaidOrders(key))}
                      sx={{ ...btnStyles, width: "50%", mt: 1.5 }}
                      variant="contained"
                      size="large"
                    >
                      Pay
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            ) : null}
          </Box>
        </Box>
      </Box>
    );
  };
  return role === "RECRUITER" ? (
    decideRender(isCart ? orders : paidOrders, isCart ? "orders" : "paidOrders")
  ) : (
    <Navigate to="/home" />
  );
};
