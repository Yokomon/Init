import React, { useState } from "react";
import { create } from "./api.user";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Lock from "@material-ui/icons/Lock";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import Error from "@material-ui/icons/ErrorOutline";
import { makeStyles } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  input: {
    width: 320,
  },
  title: {
    margin: theme.spacing(1),
  },
  paper: {
    textAlign: "center",
    margin: "auto",
    maxWidth: 550,
    position: "relative",
    top: theme.spacing(10),
  },
  content: {
    padding: "16px",
    paddingBottom: "24px",
  },
  btn: {
    margin: "auto",
    marginBottom: theme.spacing(3),
  },
  avatar: {
    width: 50,
    height: 50,
    margin: "auto",
    backgroundColor: theme.palette.openTitle,
  },
  error: {
    verticalAlign: "middle",
    margin: theme.spacing(1),
  },
}));

export default function SignUp() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    server_error: "",
    open: false,
  });
  const classes = useStyles();

  const handleInput = (name) => (event) => {
    event.persist();
    const { value } = event.target;
    switch (name) {
      case "name":
        debounce(() => {
          value.length <= 0
            ? setValues({
                ...values,
                error: "Name field is required",
                [name]: value,
              })
            : setValues({ ...values, [name]: value, error: "" });
        }, 1000)();
        break;
      case "email":
        debounce(() => {
          value.match(/.+\@.+\..+/)
            ? setValues({ ...values, error: "", [name]: value })
            : setValues({
                ...values,
                error: "Email address is invalid",
                [name]: value,
              });
        }, 2500)();
        break;
      case "password":
        value.length < 6
          ? setValues({
              ...values,
              error: "Password must be 6 characters or more",
              [name]: value,
            })
          : setValues({ ...values, error: "", [name]: value });
        break;
      default:
        setValues({ ...values, [name]: value });
        break;
    }
  };

  const handleSubmit = () => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    create(user).then((data) => {
      if (data && data.error)
        setValues({ ...values, server_error: data.error });
      else setValues({ ...values, open: true, redirectToUsers: true });
    });
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <CardContent>
        <Avatar className={classes.avatar}>
          <Lock />
        </Avatar>
        <Typography variant={"h5"} className={classes.title}>
          Sign up
        </Typography>
        <TextField
          name="Name"
          label="Name"
          variant={"outlined"}
          className={classes.input}
          margin="normal"
          type="text"
          error={values.error.substring(0, 4) === "Name" ? true : false}
          helperText={
            values.error.substring(0, 4) === "Name" ? values.error : false
          }
          required
          onChange={handleInput("name")}
        />
        <TextField
          name="Email"
          label="Email"
          variant={"outlined"}
          type="email"
          className={classes.input}
          margin="normal"
          error={values.error.substring(0, 5) === "Email" ? true : false}
          helperText={
            values.error.substring(0, 5) === "Email" ? values.error : false
          }
          required
          onChange={handleInput("email")}
        />
        <TextField
          name="Password"
          label="Password"
          variant={"outlined"}
          className={classes.input}
          margin="normal"
          type="password"
          required
          helperText={
            values.error.substring(0, 8) === "Password" ? values.error : false
          }
          onChange={handleInput("password")}
        />
      </CardContent>
      {values.server_error && (
        <Typography component={"p"} color="error">
          <Error className={classes.error} />
          {values.server_error}
        </Typography>
      )}
      <Button
        variant={"outlined"}
        color="primary"
        className={classes.btn}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Dialog open={values.open}>
        <DialogTitle>Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            User account successfully created
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Link to={"/users"}>
            <Button color={"primary"} variant={"contained"} size={"small"}>
              Users
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
