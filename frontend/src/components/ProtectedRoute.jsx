import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute(props) {
  const { Component } = props;
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get("token");
    const isloggedin = cookies.get("isloggedin");

    if (!token) {
      cookies.remove("isloggedin");
      navigate("/");
    }

    if (!isloggedin) {
      cookies.remove("token");
      navigate("/");
    }
  });

  return (
    <div>
      <Component />
    </div>
  );
}
