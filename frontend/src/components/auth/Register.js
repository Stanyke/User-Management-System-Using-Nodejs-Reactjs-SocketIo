import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useApp from "../../store/contexts/AppContext";

export default function Register({ classes }) {
  const { registerUser, showToast } = useApp();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    password: "",
    gender: "",
    email: "",
    department: "",
  });

  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let allGood = true;
    Object.values(values).forEach((val) => {
      if (!val) {
        allGood = false;
      }
    });

    !allGood
      ? showToast("One or more input is empty")
      : registerUser({ ...values });
  };

  return (
    <Box className="card" sx={{ "& > :not(style)": { m: 1 } }}>
      <form onSubmit={handleRegister}>
        {
          {
            1: <PersonalInfo handleChange={handleChange} values={values} />,
            2: <OtherInfo handleChange={handleChange} values={values} />,
          }[step]
        }
        <div className="d-flex justify-content-around px-3 mt-4">
          {step > 1 ? (
            <button className="btn btn-danger" onClick={prevStep}>
              Back
            </button>
          ) : null}

          <Button
            type={step === 2 ? "submit" : "button"}
            variant="contained"
            size="small"
            className={classes.authBtn}
            onClick={nextStep}
          >
            {step === 2 ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </Box>
  );
}
