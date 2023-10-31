import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAuth } from "../store/thunk";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  // null => 아무나 출입 가능
  // true => 로그인한 유저만 출입 가능
  // false => 로그인한 유저는 출입 불가능

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(userAuth()).then((res) => {
        // 로그인 하지 않은 상태
        if (!res.payload.isAuth) {
          if (option) navigate("/login");
        } else {
          // 로그인 한 상태
          if (adminRoute && !res.payload.isAuth) {
            navigate("/");
          } else {
            if (!option) navigate("/");
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
