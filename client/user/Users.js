import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import People from "@material-ui/icons/PeopleOutline";
import Person from "@material-ui/icons/PersonOutline";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 600,
    margin: "auto",
    position: "relative",
    top: theme.spacing(6),
    textAlign: "center",
  },
  title: {
    color: theme.palette.openTitle,
    paddingTop: theme.spacing(2),
  },
  text: {
    color: theme.palette.primary.main,
  },
  avatar: {
    margin: "auto",
    width: 50,
    height: 50,
    marginBottom: theme.spacing(3),
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
      <List>
        <Avatar
          className={classes.avatar}
          style={{ backgroundColor: "#1976d2b5" }}
        >
          <People />
        </Avatar>
        {values.map((value, i) => {
          return (
            <Link to={`/user/${value._id}`} key={i}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
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
