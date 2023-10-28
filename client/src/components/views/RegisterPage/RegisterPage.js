import React from "react";
import MyForm from "../../UI/MyForm";
import { useDispatch } from "react-redux";
import { userJoin } from "../../../store/createSlice";

function RegisterPage() {
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(userJoin(data));
  };

  return (
    <div>
      <h1>RegisterPage</h1>
      <MyForm onSubmit={onSubmit} isLogin={false} />
    </div>
  );
}

export default RegisterPage;
