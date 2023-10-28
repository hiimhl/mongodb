import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LandingPage() {
  useEffect(() => {
    // axios.get("/api/hello").then((res) => console.log(res));
  }, []);

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
      <Link to={"/api/users/login"}>로그인페이지</Link>
      <Link to={"/api/users/register"}>회원가입</Link>
    </div>
  );
}

export default LandingPage;
