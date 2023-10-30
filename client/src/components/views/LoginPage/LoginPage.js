import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MyForm from "../../UI/MyForm";
import { userLogin } from "../../../store/thunk";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(userLogin(data));
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div>
        <Link to={"/"}>홈</Link>
      </div>
      <MyForm onSubmit={onSubmit} isLogin={true} />
    </div>
  );
}

export default LoginPage;
