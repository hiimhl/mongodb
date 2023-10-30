import React from "react";
import MyForm from "../../UI/MyForm";
import { useDispatch } from "react-redux";
import { userRegister } from "../../../store/thunk";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(userRegister(data));
    navigate("/");
    window.confirm("회원가입이 되었습니다.");
  };

  return (
    <div>
      <h1>회원가입</h1>
      <MyForm onSubmit={onSubmit} isLogin={false} />
    </div>
  );
}

export default RegisterPage;
