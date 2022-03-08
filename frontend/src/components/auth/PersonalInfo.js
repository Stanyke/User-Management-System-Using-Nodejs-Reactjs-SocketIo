import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { InputGroup, FormControl } from "react-bootstrap";

export default function PersonalInfo({ handleChange, values }) {
  const [passwordStatus, setPasswordStatus] = useState("bi bi-eye-slash");

  const togglePassword = () => {
    if (passwordStatus === "bi bi-eye-slash") {
      setPasswordStatus("bi bi-eye-fill");
    } else {
      setPasswordStatus("bi bi-eye-slash");
    }
  };

  return (
    <>
      <div className="text-align">
        <b>Personal Details</b>
      </div>
      <hr />
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <i className="bi bi-person-fill" style={{ fontSize: 20 }}></i>
        </InputGroup.Text>
        <FormControl
          aria-label="firstname"
          label="Firstname"
          name="firstname"
          type="text"
          placeholder="Firstname"
          value={values.firstname}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>
          <i className="bi bi-person-fill" style={{ fontSize: 20 }}></i>
        </InputGroup.Text>
        <FormControl
          aria-label="lastname"
          label="Lastname"
          name="lastname"
          type="text"
          placeholder="Lastname"
          value={values.lastname}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        />
      </InputGroup>

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
          value={values.email}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
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
          value={values.password}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        />
        <InputGroup.Text onClick={() => togglePassword()}>
          <i className={passwordStatus} style={{ fontSize: 20 }}></i>
        </InputGroup.Text>
      </InputGroup>
    </>
  );
}
