import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/api/apiActions";

export const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isLogin, token } = useSelector((state) => state.auth);

  const [checking, setChecking] = useState(true);
  const [denied, setDenied] = useState(false);

  const [loginFields, setLoginFields] = useState({ pw: "0923" });

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLogin && !token) {
        const password = prompt("비밀번호를 입력하세요:");

        if (password !== loginFields.pw) {
          setDenied(true);
        } else {
          await dispatch(login({ pw: password }));
        }
      }
      setChecking(false);
    };

    checkAuth();
  }, [dispatch, isLogin, token]);

  if (checking) return null;

  if (denied) return <Navigate to="/" />;

  return children;
};
