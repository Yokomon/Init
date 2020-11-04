import React from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { withRouter, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { isAuthenticated, clearJWT } from "./../auth/auth";

const isActive = (history, pathname) => {
  if (history.location.pathname === pathname) {
    return { color: "#e67c7c" };
  } else {
    return { color: "#1976d2" };
  }
};

const useStyles = makeStyles((theme) => ({
  space: {
    flexGrow: 1,
  },
  headerOptions: {
    display: "flex",
    justifyContent: "space-around",
  },
  root: {
    backgroundColor: "#fff",
  },
  span: {
    fontWeight: 500,
    fontSize: "35px",
    color: "#e67c7c",
  },
}));

const Menu = withRouter(({ history }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" elevation={0} className={classes.root}>
      <ToolBar>
        <Link to="/">
          <Typography variant="h5" color="primary">
            <span className={classes.span}> i</span>nit
          </Typography>
        </Link>

        <div className={classes.space} />
        <div className={classes.headerOptions}>
          <Link to="/users">
            <Button style={isActive(history, "/users")} className={classes.btn}>
              Users
            </Button>
          </Link>
          {isAuthenticated() ? (
            <>
              <Link to={`/user/${isAuthenticated().user._id}`}>
                <Button
                  style={isActive(
                    history,
                    `/user/${isAuthenticated().user._id}`
                  )}
                  className={classes.btn}
                >
                  Profile
                </Button>
              </Link>
              <Button
                style={{ color: "#1976d2" }}
                onClick={() => clearJWT(() => history.push("/"))}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <Button
                  style={isActive(history, "/signup")}
                  className={classes.btn}
                >
                  Sign up
                </Button>
              </Link>
              <Link to="/signin">
                <Button
                  style={isActive(history, "/signin")}
                  className={classes.btn}
                >
                  Sign in
                </Button>
              </Link>
            </>
          )}
        </div>
      </ToolBar>
    </AppBar>
  );
});

export default Menu;
