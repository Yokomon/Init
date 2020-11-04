import React, { useState, useEffect } from "react";
import { read, update } from "./api.user";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Error from "@material-ui/icons/ErrorOutline";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "./../auth/auth";
import Picture from "@material-ui/icons/PhotoSizeSelectActualRounded";

const useStyles = makeStyles((theme) => ({
  input: {
    width: 320,
  },
  title: {
    color: theme.palette.openTitle,
    position: "relative",
    top: "5px",
  },
  paper: {
    textAlign: "center",
    margin: "auto",
    maxWidth: 550,
    position: "relative",
    top: theme.spacing(10),
  },
  pic: {
    position: "relative",
    top: "15px",
    color: "#e67c7c",
  },
  content: {
    padding: "16px",
    paddingBottom: "24px",
  },
  btn: {
    margin: "auto",
    marginBottom: theme.spacing(3),
  },
  error: {
    verticalAlign: "middle",
    margin: theme.spacing(1),
  },
}));

export default function EditProfile({ match }) {
  let abortController = new AbortController();
  let signal = abortController.signal;
  let jwt = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    email: "",
    error: "",
    about: "",
    profile_picture: "",
    server_error: "",
    redirectToProfile: false,
  });
  const classes = useStyles();

  useEffect(() => {
    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        data && data.error ? (
          <Redirect to="/signin" />
        ) : (
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            about: data.about,
          })
        );
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  const handleInput = (name) => (event) => {
    const { value } = event.target;
    switch (name) {
      case "name":
        value.length <= 0
          ? setValues({
              ...values,
              error: "Name field is required",
              [name]: value,
            })
          : setValues({ ...values, [name]: value, error: "" });
        break;
      case "about":
        value.length === 150
          ? setValues({
              ...values,
              error: "Max characters reached",
              [name]: value,
            })
          : setValues({ ...values, error: "", [name]: value });
        break;
      case "profile_picture":
        let pic = event.target.files[0];
        setValues({ ...values, error: "", [name]: pic });
        break;
      case "email":
        value.match(/.+\@.+\..+/)
          ? setValues({ ...values, error: "", [name]: value })
          : setValues({
              ...values,
              error: "Email address is invalid",
              [name]: value,
            });
        break;
      default:
        setValues({ ...values, [name]: value });
        break;
    }
  };

  const handleSubmit = () => {
    const userData = {
      name: values.name || undefined,
      email: values.email || undefined,
      about: values.about || undefined,
    };

    update({ userId: match.params.userId }, { t: jwt.token }, userData)
      .then((data) => {
        if (data && data.error)
          setValues({ ...values, server_error: data.error });
        else setValues({ ...values, redirectToProfile: true, id: data._id });
      })
      .catch((e) => console.error(e));
  };

  if (values.redirectToProfile) {
    return <Redirect to={`/user/${values.id}`} />;
  }

  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography variant={"h5"} className={classes.title}>
        Edit profile
      </Typography>
      <input
        accept="image/*"
        type="file"
        style={{ display: "none" }}
        onChange={handleInput("profile_picture")}
        id="profile_pic"
      />
      <label htmlFor="profile_pic">
        <Picture className={classes.pic} />
      </label>
      <span>{values.profile_picture}</span>
      <CardContent>
        <TextField
          name="Name"
          label="Name"
          variant={"outlined"}
          value={values.name}
          className={classes.input}
          margin="normal"
          type="text"
          helperText={
            values.error.substring(0, 4) === "Name" ? values.error : false
          }
          required
          onChange={handleInput("name")}
        />
        <TextField
          name="About"
          label="About"
          variant={"outlined"}
          type="text"
          multiline
          rows={4}
          value={values.about}
          inputProps={{ maxLength: 150 }}
          className={classes.input}
          margin="normal"
          error={values.error.substring(0, 3) === "Max" ? true : false}
          helperText={
            values.error.substring(0, 3) === "Max" ? values.error : false
          }
          required
          onChange={handleInput("about")}
        />
        <TextField
          name="Email"
          label="Email"
          variant={"outlined"}
          type="email"
          value={values.email}
          className={classes.input}
          margin="normal"
          helperText={
            values.error.substring(0, 5) === "Email" ? values.error : false
          }
          required
          onChange={handleInput("email")}
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
        color={"primary"}
        className={classes.btn}
        onClick={handleSubmit}
      >
        Update
      </Button>
    </Paper>
  );
}
