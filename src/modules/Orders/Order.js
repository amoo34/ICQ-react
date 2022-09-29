import { Box, Grid, Button, Zoom, Stack, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
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
            <Stack direction="row">
              <Box>
                <Avatar />
              </Box>
              <Box sx={{ mt: 1, ml: 1 }}>
                {capitalizeFirstLetter(firstName) +
                  " " +
                  capitalizeFirstLetter(lastName)}
              </Box>
            </Stack>

            <Box sx={{ color: "#7d7878", fontSize: "14px", mt: 0.2 }}>
              {capitalizeFirstLetter(address)}
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
              <Tooltip title="Delete From Cart!" arrow placement="top">
                <Button
                  color="error"
                  size="small"
                  variant="contained"
                  sx={{ textTransform: "none", mt: 2 }}
                  onClick={() => dispatch(deleteFromCart(order))}
                >
                  Delete
                </Button>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Zoom>
  );
};
