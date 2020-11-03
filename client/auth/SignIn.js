import React, { useState } from "react";
import { signin } from "./../auth/api.auth";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Lock from "@material-ui/icons/LockOpen";
import Avatar from "@material-ui/core/Avatar";
import Error from "@material-ui/icons/ErrorOutline";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import debounce from "lodash/debounce";
import { Redirect } from "react-router-dom";
import { authenticate } from "./../auth/auth";

const useStyles = makeStyles((theme) => ({
  input: {
    width: 320,
  },
  title: {
    margin: theme.spacing(1),
    color: "#4964f3",
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
    backgroundColor: "#4964f3",
  },
  error: {
    verticalAlign: "middle",
    margin: theme.spacing(1),
  },
}));

export default function SignIn() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    server_error: "",
    redirectToUsers: false,
  });
  const classes = useStyles();

  const handleInput = (name) => (event) => {
    event.persist();
    const { value } = event.target;
    switch (name) {
      case "email":
        debounce(() => {
          value.match(/.+\@.+\..+/)
            ? setValues({ ...values, error: "", [name]: value })
            : setValues({
                ...values,
                error: "Email address is invalid",
                [name]: value,
              });
        }, 2000)();
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
      email: values.email,
      password: values.password,
    };

    signin(user).then((data) => {
      if (data && data.error)
        setValues({ ...values, server_error: data.error });
      else
        authenticate(data, () => {
          setValues({ ...values, redirectToUsers: true });
        });
    });
  };

  if (values.redirectToUsers) {
    return <Redirect to={"/users"} />;
  }

  return (
    <Paper elevation={3} className={classes.paper}>
      <CardContent>
        <Avatar className={classes.avatar}>
          <Lock />
        </Avatar>
        <Typography variant={"h5"} className={classes.title}>
          Sign in
        </Typography>
        <TextField
          name="Email"
          label="Email"
          variant={"outlined"}
          type="email"
          className={classes.input}
          margin="normal"
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
        Log in
      </Button>
    </Paper>
  );
}
