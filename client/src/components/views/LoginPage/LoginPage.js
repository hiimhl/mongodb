import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MyForm from "../../UI/MyForm";
import { userLogin } from "../../../store/thunk";
import GoBtn from "../../UI/GoBtn";

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
        <GoBtn title={"홈"} goTo={"/"} />
        <GoBtn title={"회원가입"} goTo={"/register"} />
      </div>
      <MyForm onSubmit={onSubmit} isLogin={true} />
    </div>
  );
}

export default LoginPage;
