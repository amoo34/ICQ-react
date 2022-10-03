import {
  Box,
  Grid,
  Button,
  Zoom,
  Stack,
  Tooltip,
  Icon,
  IconButton,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { deleteFromCart } from "../../Redux/orders/order.actions";
import { capitalizeFirstLetter } from "../../utils/utils";
import { btnStyles, secondaryColor } from "../../Crud/styles";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
export const Order = ({ order, index, isCart }) => {
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
              <Box sx={{ ml: 1 }}>
                <Box>
                  {capitalizeFirstLetter(firstName) +
                    " " +
                    capitalizeFirstLetter(lastName)}
                </Box>
                <Box sx={{ color: "#7d7878", fontSize: "16px" }}>10$</Box>
              </Box>
            </Stack>

            <Box sx={{ color: "#7d7878", fontSize: "16px", mt: 0.2 }}>
              {capitalizeFirstLetter(address)}
            </Box>
          </Grid>

          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
              {isCart ? (
                <Tooltip title="Delete From Cart!" arrow placement="top">
                  <Button
                    {...(isCart && { color: "error" })}
                    size="small"
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      mt: 2,
                      ...(!isCart && { ...btnStyles }),
                    }}
                    onClick={() => dispatch(deleteFromCart(order))}
                  >
                    Delete
                  </Button>
                </Tooltip>
              ) : (
                <>
                  <Tooltip arrow title="Purchased!" placement="top">
                    <Icon sx={{ mt: 5, color: secondaryColor }}>
                      <ShoppingBasketIcon />
                    </Icon>
                  </Tooltip>
                  <Tooltip arrow title="Download!" placement="top">
                    <IconButton sx={{ mt: 4.2, color: secondaryColor }}>
                      <DownloadForOfflineIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Zoom>
  );
};
