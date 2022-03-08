import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthForm({ type, classes }) {
  if (type === "login") {
    return <Login classes={classes} />;
  } else {
    return <Register classes={classes} />;
  }
}
