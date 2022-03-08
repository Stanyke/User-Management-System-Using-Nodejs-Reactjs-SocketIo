import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { InputGroup, FormControl, Form } from "react-bootstrap";

export default function OtherInfo({ handleChange, values }) {
  return (
    <>
      <div className="text-align">
        <b>Other Details</b>
      </div>
      <hr />

      <InputGroup className="mb-3">
        <InputGroup.Text>
          <i className="bi bi-person-circle" style={{ fontSize: 20 }}></i>
        </InputGroup.Text>
        <Form.Select
          aria-label="gender"
          label="Gender"
          name="gender"
          type="text"
          value={values.gender}
          placeholder="Gender"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        >
          <option defaultValue="" readOnly disabled>Select Gender</option>
          <option defaultValue="male">Male</option>
          <option defaultValue="female">Female</option>
        </Form.Select>
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>
          <i className="bi bi-briefcase-fill" style={{ fontSize: 20 }}></i>
        </InputGroup.Text>
        <Form.Select
          aria-label="department"
          label="Department"
          name="department"
          type="text"
          value={values.department}
          placeholder="Department"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          required
        >
          <option defaultValue="" readOnly disabled>Select Department</option>
          <option defaultValue="software">Software</option>
          <option defaultValue="marketing">Marketing</option>
          <option defaultValue="finance">Finance</option>
          <option defaultValue="entertainment">Entertainment</option>
        </Form.Select>
      </InputGroup>
    </>
  );
}
