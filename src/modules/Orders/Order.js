import { Box, Grid, Button, Fade, Zoom } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { primaryColor, secondaryColor } from "../../Crud/styles";
import { deleteFromCart } from "../../Redux/orders/order.actions";
import { capitalizeFirstLetter } from "../../utils/utils";

export const Order = ({ order, index }) => {
  const { firstName, lastName, address } = order?.userId;
  const dispatch = useDispatch();
  return (
    <Zoom in={order} style={{ transitionDelay: `${index}00ms` }}>
      <Box
        key={Math.random() + index}
        sx={{
          p: 2,
          "&:hover": {
            backgroundColor: "aliceBlue",
            transition: ".5s ease",
          },
        }}
      >
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box>
              {capitalizeFirstLetter(firstName) +
                " " +
                capitalizeFirstLetter(lastName)}
            </Box>
            <Box sx={{ color: "#7d7878", fontSize: "14px" }}>
              {capitalizeFirstLetter(address)}
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
              <Button
                color="error"
                size="small"
                variant="contained"
                sx={{ textTransform: "none" }}
                onClick={() => dispatch(deleteFromCart(order))}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Zoom>
  );
};
