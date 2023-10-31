import axios from "axios";
import React from "react";
import GoBtn from "../../UI/GoBtn";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../store/createSlice";

function LandingPage() {
  const isLogin = useSelector((state) => state.reducer.loggedIn);
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    axios.get("/api/users/logout").then((rep) => {
      if (rep.data.success) {
        alert("로그아웃 성공");
        dispatch(userLogout());
      } else {
        alert("로그아웃 실패");
      }
    });
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
      <h2>시작 페이지</h2>
      {isLogin ? (
        <button onClick={onLogoutHandler}>로그아웃</button>
      ) : (
        <GoBtn title={"로그인"} goTo={"/login"} />
      )}
    </div>
  );
}

export default LandingPage;
