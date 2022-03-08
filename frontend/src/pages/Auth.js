import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Button, makeStyles } from "@material-ui/core";

import { AuthStyle } from "../assets/css/AuthStyle";
import AuthSidebar from "../components/auth/AuthSidebar";
import { useNavigate } from "react-router-dom";
import useApp from "../store/contexts/AppContext";
import AuthForm from "../components/auth/AuthForm";

const useStyles = makeStyles((theme) => AuthStyle(theme));
const { REACT_APP_AFTER_LOGIN_REDIRECT_URL } = process.env;

export default function Auth() {
  const {
    appState: { userToken },
  } = useApp();
  const [currentForm, setCurrentForm] = useState("login");
  let navigate = useNavigate();

  const classes = useStyles();

  const handleForms = async (form) => {
    setCurrentForm(form);
  };

  useEffect(() => {
    if (userToken) {
      navigate(REACT_APP_AFTER_LOGIN_REDIRECT_URL);
    }
  }, [userToken, navigate]);

  return (
    <Grid container className={classes.homeScreen}>
      <AuthSidebar styles={classes} />

      <Box className={classes.rightSideContainer}>
        <Grid className={classes.formBox}>
          <Box>
            <Grid container spacing={2} className={classes.highliter}>
              <Grid item xs={6}>
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  className={classes.authSmallBtn}
                  onClick={() => handleForms("login")}
                  disabled={currentForm === "login" ? true : false}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  className={classes.authSmallBtn}
                  onClick={() => handleForms("register")}
                  disabled={currentForm === "login" ? false : true}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Box>
              <Typography className={classes.formNotice}>
                {currentForm === "login" ? "Hello!" : "Register"}
              </Typography>
            </Box>

            <Box className={classes.boxContainer}>
              <AuthForm type={currentForm} classes={classes} />
            </Box>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}
