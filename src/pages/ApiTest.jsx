import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, login, logout, reserve } from "@/api/apiActions";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { setLogin } from "@/reducers/authSlice";
import { callApi } from "@/api/callApi";

const ApiTest = () => {
  const dispatch = useDispatch();

  const { data, res } = useSelector((state) => state.data);

  const [loginFields, setLoginFields] = useState({
    id: "admin",
    pw: "password",
  });

  const [filters, setFilters] = useState({
    ra_column: "",
    search_text: "",
    s_date: "",
    e_date: "",
    ra_sort: "desc",
  });

  const [result, setResult] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [data, setData] = useState([]);

  const [reserveFields, setReserveFields] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    year: 2025,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleGetData = () => {
    dispatch(getData());
  };

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleResevation = () => {
    dispatch(reserve(reserveFields));
  };

  const handleChangeLoginFields = (e) => {
    setLoginFields({ ...loginFields, [e.target.name]: e.target.value });
  };

  const handleChangeReserveFields = (e) => {
    setReserveFields({ ...reserveFields, [e.target.name]: e.target.value });
    // console.log("e.target.name", e.target.value);
  };

  const SECRET_KEY = process.env.REACT_APP_API_KEY;
  const PER_PAGE = 2;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const fetchData = async (targetPage = 1) => {
    const payload = {
      ...filters,
      page: targetPage,
      perPage: PER_PAGE,
    };

    // const response = await callApi({
    //   endpoint: "/member_list",
    //   method: "POST",
    //   body: payload,
    //   useHash: true,
    // });

    // if (response?.data) {
    //   setData(response.data);
    //   setResult(
    //     `쿼리: ${response.query}\n\n데이터:\n${JSON.stringify(
    //       response.data,
    //       null,
    //       2
    //     )}`
    //   );
    //   setTotal(response.total);
    //   setPage(response.page);
    //   setTotalPages(Math.ceil(response.total / response.per_page));
    // } else {
    //   setResult("데이터를 불러오는 중 오류 발생.");
    //   setData([]);
    // }

    dispatch(getData(payload));
  };

  const handleSearch = () => {
    setPage(1);
    fetchData(1);
  };

  const renderPagination = () => {
    const buttons = [];

    const makeBtn = (label, disabled, targetPage) => (
      <button
        key={label}
        disabled={disabled}
        onClick={() => fetchData(targetPage)}
        style={{ marginRight: 4 }}
      >
        {label}
      </button>
    );

    buttons.push(makeBtn("맨처음", page === 1, 1));
    buttons.push(makeBtn("이전", page === 1, page - 1));
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(makeBtn(i, i === page, i));
    }
    buttons.push(makeBtn("다음", page === totalPages, page + 1));
    buttons.push(makeBtn("맨끝", page === totalPages, totalPages));

    return buttons;
  };

  // useEffect(()=> {
  //   console.log("result", result);

  // })

  return (
    <article id="ApiTest">
      {/* <div className="container">
        <h5>기본 API 호출</h5>

        <Button
          title={"API 데이터 가져오기"}
          btnSize={"lg"}
          btnColor={"primary"}
          onClick={() => handleGetData()}
        />

        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div> */}

      <pre>{res}</pre>

      <div>
        <h2>기본 API 호출</h2>
        <select
          id="ra_column"
          value={filters.ra_column}
          onChange={handleChange}
        >
          <option value="">전체</option>
          <option value="ra_name">이름</option>
          <option value="ra_phone">전화번호</option>
          <option value="ra_email">이메일</option>
          <option value="ra_company">회사</option>
        </select>
        <input
          id="search_text"
          type="text"
          value={filters.search_text}
          placeholder="검색어 입력"
          onChange={handleChange}
        />
        <br />
        <input
          id="s_date"
          type="date"
          value={filters.s_date}
          onChange={handleChange}
        />{" "}
        ~{" "}
        <input
          id="e_date"
          type="date"
          value={filters.e_date}
          onChange={handleChange}
        />
        <br />
        <select id="ra_sort" value={filters.ra_sort} onChange={handleChange}>
          <option value="desc">최신순</option>
          <option value="asc">오래된순</option>
        </select>
        <br />
        <button onClick={handleSearch}>API 데이터 가져오기</button>
        <pre style={{ background: "#f0f0f0", padding: "10px" }}>{result}</pre>
        <div style={{ marginTop: "10px" }}>{renderPagination()}</div>
        <div style={{ margin: "8px 0" }}>총 {total}건</div>
      </div>

      <div className="container">
        <h5>로그인</h5>

        <div className="input-group">
          <Input
            id="id"
            name="id"
            textLabel="아이디"
            value={loginFields.id}
            onChange={handleChangeLoginFields}
            required
          />
          <Input
            inputType="password"
            id="password"
            name="password"
            textLabel="패스워드"
            value={loginFields.pw}
            onChange={handleChangeLoginFields}
            required
          />
        </div>

        <Button
          title={"로그인"}
          btnSize={"lg"}
          btnColor={"primary"}
          onClick={() => handleLogin()}
        />
        <Button
          title={"로그아웃"}
          btnSize={"lg"}
          btnColor={"primary"}
          onClick={() => handleLogout()}
        />

        <div className="test-box">
          {/* <pre>
            {JSON.stringify(currentType === "login" && result, null, 2)}
          </pre> */}
        </div>
      </div>

      <div className="container">
        <div className="input-group">
          <Input
            id="name"
            name="name"
            rowLabel="이름"
            value={reserveFields.name}
            onChange={handleChangeReserveFields}
            required
          />

          <Input
            id="phone"
            name="phone"
            rowLabel="휴대폰번호"
            value={reserveFields.phone}
            onChange={handleChangeReserveFields}
            required
          />

          <Input
            id="email"
            name="email"
            rowLabel="이메일"
            value={reserveFields.email}
            onChange={handleChangeReserveFields}
            required
          />

          <Input
            id="company"
            name="company"
            rowLabel="회사명"
            value={reserveFields.company}
            onChange={handleChangeReserveFields}
            required
          />

          {errorMessage && <span className="error-msg">{errorMessage}</span>}
        </div>

        <Button
          title={"사전예약하기"}
          btnSize={"lg"}
          btnColor={"primary"}
          onClick={() => handleResevation()}
        />

        <div className="test-box">
          {/* <pre>
            {JSON.stringify(currentType === "reserve" && result, null, 2)}
          </pre> */}
        </div>
      </div>
    </article>
  );
};

export default ApiTest;
