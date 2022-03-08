import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { InputGroup, FormControl } from "react-bootstrap";

import useApp from "../../store/contexts/AppContext";

export default function Login({ classes }) {
  const {
    appState: { userToken },
    loginUser,
  } = useApp();

  const [passwordStatus, setPasswordStatus] = useState("bi bi-eye-slash");

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    loginUser({ email, password });
  };

  const togglePassword = () => {
    if (passwordStatus === "bi bi-eye-slash") {
      setPasswordStatus("bi bi-eye-fill");
    } else {
      setPasswordStatus("bi bi-eye-slash");
    }
  };

  return (
    <Box className="card" sx={{ "& > :not(style)": { m: 1 } }}>
      <form onSubmit={handleLogin}>
        <>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <i className="bi bi-envelope" style={{ fontSize: 20 }}></i>
            </InputGroup.Text>
            <FormControl
              aria-label="email"
              label="Email"
              name="email"
              type="email"
              placeholder="Email Address"
              required
            />
          </InputGroup>

          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-lock-fill" style={{ fontSize: 20 }}></i>
            </InputGroup.Text>
            <FormControl
              id="input-with-icon-textfield"
              aria-label="password"
              label="Password"
              name="password"
              type={passwordStatus === "bi bi-eye-slash" ? "password" : "text"}
              placeholder="Password"
              required
            />
            <InputGroup.Text onClick={() => togglePassword()}>
              <i className={passwordStatus} style={{ fontSize: 20 }}></i>
            </InputGroup.Text>
          </InputGroup>
        </>

        <Grid className="mt-4">
          <Button
            type="submit"
            variant="contained"
            size="large"
            className={classes.authBtn}
          >
            Login
          </Button>
        </Grid>
      </form>
    </Box>
  );
}
