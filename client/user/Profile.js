import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { read } from "./api.user";
import { isAuthenticated } from "./../auth/auth";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import Edit from "@material-ui/icons/EditOutlined";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 600,
    margin: "auto",
    position: "relative",
    top: theme.spacing(5),
  },
  title: {
    color: theme.palette.openTitle,
    textAlign: "center",
    margin: theme.spacing(1),
  },
  listItemText: {
    margin: "8px 0px 3px 15px",
  },
}));

export default function Profile({ match }) {
  const [values, setValues] = useState({});
  const classes = useStyles();
  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;
    let jwt = isAuthenticated();
    read({ userId: match.params.userId }, { t: jwt.token }, signal)
      .then((data) => {
        data && data.error
          ? setValues({ ...values, error: data.error })
          : setValues(data);
      })
      .catch((e) => console.error(e));
  }, [match.params.userId]);

  if (values.error) {
    return <Redirect to="/signin" />;
  }

  return (
    <Paper elevation={2} className={classes.paper}>
      <List dense>
        <Typography variant={"h5"} className={classes.title}>
          Profile
        </Typography>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={values.name} secondary={values.email} />
          <ListItemSecondaryAction>
            <Link to={`/user/edit/${values._id}`}>
              <IconButton>
                <Edit color="primary" />
              </IconButton>
            </Link>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItemText
          primary={`Joined: ${new Date(values.created).toDateString()}`}
          className={classes.listItemText}
        />
      </List>
    </Paper>
  );
}
