import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import { remove } from "./api.user";
import { isAuthenticated, clearJWT } from "./../auth/auth";
import { Redirect } from "react-router-dom";

export default function DeleteProfile({ userId }) {
  const [values, setValues] = useState({
    open: false,
    redirectToHome: false,
  });

  const handleClick = () => {
    setValues({ ...values, open: true });
  };

  const handleClose = () => {
    setValues({ ...values, open: false });
  };

  const handleDelete = () => {
    let jwt = isAuthenticated();
    remove({ userId: userId }, { t: jwt.token })
      .then((data) => {
        if (data && data.error) {
          console.error(data.error);
        } else {
          clearJWT(() => setValues({ ...values, redirectToHome: true }));
        }
      })
      .catch((e) => console.error(e.message));
  };

  if (values.redirectToHome) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <Delete style={{ color: "#e67c7c" }} />
      </IconButton>
      <Dialog open={values.open}>
        <DialogTitle>Delete account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" variant="outlined" onClick={handleDelete}>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
