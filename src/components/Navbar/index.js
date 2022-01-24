import { AppBar, IconButton, makeStyles, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    textAlign: "center",
  },
  appBar: {
    background: "#3f51b5",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography onClick={() => history.push("/home")} style={{ cursor: "pointer" }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Financepeer
          </Typography>
          <div>
            <IconButton aria-label="logout" color="inherit" onClick={logout}>
              <Tooltip title="Logout" placement="top-start">
                <ExitToApp />
              </Tooltip>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
