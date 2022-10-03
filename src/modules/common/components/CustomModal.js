import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  DialogActions,
  Button,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { btnStyles, secondaryBtnStyles } from "../../../Crud/styles";
export const CustomModal = ({ modalProps, title, children, actionProps }) => {
  const { actions, onAccept, onReject, acceptText, rejectText } = actionProps;
  const { onClose } = modalProps;
  return (
    <Dialog {...modalProps}>
      <DialogTitle sx={{ p: 1 }}>
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            {title}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <IconButton
                sx={{ mt: -0.5, color: "red" }}
                onClick={() => onClose()}
              >
                <ClearIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
      {actions && (
        <>
          <Divider />
          <DialogActions>
            <Button
              sx={{ textTransform: "none", ...btnStyles }}
              onClick={() => onAccept()}
              variant="contained"
              size="small"
            >
              {acceptText}
            </Button>
            <Button
              sx={{ textTransform: "none", ...secondaryBtnStyles }}
              onClick={() => onReject()}
              variant="contained"
              size="small"
              color="error"
            >
              {rejectText}
            </Button>
          </DialogActions>
        </>
      )}
      <Divider />
    </Dialog>
  );
};
