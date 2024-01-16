import React, { useEffect, useReducer } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { validateAuth } from "src/auth/auth.controller";

const reducer = (prev, { field, value }) => {
  const next = Object.assign({ pending: true, logged: null }, prev, {
    [field]: value,
  });

  return next;
};

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const [{ logged, pending }, dispatch] = useReducer(reducer, {
    pending: true,
    logged: null,
  });

  useEffect(() => {
    validateAuth().then((logged) => {
      dispatch({ field: "logged", value: logged });
      dispatch({ field: "pending", value: false });

      if (!logged) {
        // navigate('/signin');
      }
    });
  }, [logged, pending]);

  if (pending) {
    return <div>checking auth..</div>;
  }

  if (!logged) {
    return <Link to="signin">Sign In</Link>;
  }

  return children;
};
