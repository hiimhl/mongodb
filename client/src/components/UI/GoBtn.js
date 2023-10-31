import React from "react";
import { useNavigate } from "react-router-dom";

function GoBtn({ title, goTo }) {
  const navigate = useNavigate();
  const onGoHandler = () => navigate(goTo);

  return <button onClick={onGoHandler}>{title}</button>;
}

export default GoBtn;
