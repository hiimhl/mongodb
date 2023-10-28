import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../store/createSlice";
import MyForm from "../../UI/MyForm";

function LoginPage() {
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    // const body = {
    //   email,
    //   password,
    // };
    dispatch(userLogin(data));
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
      {/* <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />
        <br />
        <input type="submit" value={"Login"} />
      </form> */}
      <MyForm onSubmit={onSubmit} isLogin={true} />
    </div>
  );
}

export default LoginPage;
