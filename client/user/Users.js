import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondary from "@material-ui/core/ListItemSecondaryAction";
import ArrowForward from "@material-ui/icons/ArrowForward";
import IconButton from "@material-ui/core/IconButton";
import { list } from "./api.user";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(6),
    textAlign: "center",
  },
  title: {
    color: theme.palette.openTitle,
    paddingTop: theme.spacing(2),
  },
  text: {
    color: theme.palette.openTitle,
  },
}));

const Users = () => {
  const [values, setValues] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal)
      .then((data) => {
        setValues(data);
      })
      .catch((e) => console.error(e.message));

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Paper elevation={4} className={classes.paper}>
      <Typography variant={"h6"} color="primary" className={classes.title}>
        All users
      </Typography>
      <List>
        {values.map((value, i) => {
          return (
            <Link to={`/api/user/${value._id}`} key={i}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary={value.name} className={classes.text} />
                <ListItemSecondary>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondary>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
};

export default Users;
