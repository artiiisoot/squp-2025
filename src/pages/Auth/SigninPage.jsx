import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData, login } from "@/api/apiActions";

import PageHeader from "@/components/custom/PageHeader";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, token } = useSelector((state) => state.auth);
  const [loginFields, setLoginFields] = useState({
    // id: "",
    pw: "",
  });

  const handleChangeLoginFields = (e) => {
    setLoginFields({ ...loginFields, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = async () => {
    await dispatch(login(loginFields));
    navigate("/mktadmin");
  };

  return (
    <article id="SignIn">
      <PageHeader title="사전예약확인" />
      <div className="auth-container">
        <div className="input-group">
          {/* <Input
            type="text"
            id="id"
            name="id"
            colLabel="아이디"
            value={loginFields.id}
            onChange={handleChangeLoginFields}
            required
          /> */}
          <Input
            type="password"
            id="pw"
            name="pw"
            colLabel="패스워드"
            value={loginFields.pw}
            onChange={handleChangeLoginFields}
            required
          />
        </div>

        <Button
          title={"로그인"}
          btnSize={"lg"}
          btnColor={"primary"}
          onClick={() => handleAdminLogin()}
        />
      </div>
    </article>
  );
};

export default SignIn;
