import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setIsShowModal } from "@/reducers/modalSlice";

import { reserve } from "@/api/apiActions";
import { fetchTracksData } from "@/api/public";

import { validateFields } from "@/utils/validateField";

import Input from "@/components/common/Input";
import PageHeader from "@/components/custom/PageHeader";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import EarlyBirdEvent from "@/components/custom/EarlyBirdEvent";
import TrackCard from "@/components/custom/TrackCard";
import ModalTerms from "@/components/modal/ModalTerms";

const initialFields = {
  name: "",
  phone: "",
  email: "",
  company: "",
  department: "",
  position: "",
  fav_content: "",
};

const initialAgreements = {
  agreeRequired: false,
};

const ReservationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fields, setFields] = useState(initialFields);
  const [agreements, setAgreements] = useState(initialAgreements);
  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // 특수문자 제거 대상
    const specialCharFields = ["name", "department", "position"];

    specialCharFields.forEach((field) => {
      if (name === field) {
        newValue = value.replace(/[^a-zA-Zㄱ-ㅎ가-힣]/g, "");
      }
    });

    // 전화번호: 숫자만
    if (name === "phone") {
      newValue = value.replace(/-/g, "").slice(0, 11);
    }

    // 이메일: 공백 제거
    if (name === "email") {
      newValue = newValue.replace(/\s/g, "");
    }
    // 이메일: 공백 제거
    if (name === "company") {
      newValue = value.replace(/[^a-zA-Zㄱ-ㅎ가-힣0-9]/g, "");
    }

    setFields((prev) => ({
      ...prev,
      [name]: newValue,
      year: 2025,
      type: "squp",
    }));
  };

  const handleCheckbox = () => {
    setAgreements((prev) => ({
      ...prev,
      agreeRequired: !prev.agreeRequired,
    }));
  };

  const handleSubmit = () => {
    if (isFormValid) {
      const validation = validateFields(fields, agreements);
      setErrors(validation);
      if (Object.keys(validation).length > 0) {
        const firstInvalid = Object.keys(validation)[0];
        inputRefs.current[firstInvalid]?.focus();

        return;
      }

      alert("✅ 유효성 통과!");
      dispatch(reserve(fields));
      setFields(initialFields);
      navigate("/");
    }
  };

  const isFormValid = useMemo(() => {
    return Object.keys(validateFields(fields, agreements)).length === 0;
  }, [fields, agreements]);

  const handleMoreClick = (e) => {
    e.preventDefault();
    console.log("more click");

    dispatch(
      setIsShowModal({
        isShowModal: true,
        type: "terms",
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTracksData();
        if (response?.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching tracks data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageHeader title={"Reservation"} />
      <article id="ReservationPage">
        <div className="page-container">
          <EarlyBirdEvent />

          {/* 정보 입력 항목 */}
          <div className="reservation-table grid">
            <div className="item col-6">
              <Input
                id="name"
                name="name"
                rowLabel="이름"
                placeholder="이름을 입력해 주세요."
                labelRequired={true}
                borderType="box"
                value={fields.name}
                onChange={handleChange}
                errorMsg={errors.name}
                ref={(el) => (inputRefs.current.name = el)}
                required
              />
            </div>
            <div className="item col-6">
              <Input
                id="phone"
                name="phone"
                rowLabel="휴대폰번호"
                placeholder='"-" 없이 숫자만 입력해 주세요.'
                labelRequired={true}
                borderType="box"
                value={fields.phone}
                onChange={handleChange}
                errorMsg={errors.phone}
                ref={(el) => (inputRefs.current.phone = el)}
                required
              />
            </div>
            <div className="item col-6">
              <Input
                id="email"
                name="email"
                rowLabel="이메일"
                placeholder="이메일을 입력해 주세요."
                labelRequired={true}
                borderType="box"
                value={fields.email}
                onChange={handleChange}
                errorMsg={errors.email}
                ref={(el) => (inputRefs.current.email = el)}
                required
              />
            </div>
            <div className="item col-6">
              <Input
                id="company"
                name="company"
                rowLabel="회사명"
                placeholder="회사명을 입력해 주세요."
                labelRequired={true}
                borderType="box"
                value={fields.company}
                onChange={handleChange}
                errorMsg={errors.company}
                ref={(el) => (inputRefs.current.company = el)}
                required
              />
            </div>
            <div className="item col-6">
              <Input
                id="department"
                name="department"
                rowLabel="부서명"
                placeholder="부서명을 입력해 주세요."
                labelRequired={true}
                borderType="box"
                value={fields.department}
                onChange={handleChange}
                errorMsg={errors.department}
                ref={(el) => (inputRefs.current.department = el)}
                required
              />
            </div>
            <div className="item col-6">
              <Input
                id="position"
                name="position"
                rowLabel="직급/직책"
                placeholder="직급/직책을 입력해 주세요."
                labelRequired={true}
                borderType="box"
                value={fields.position}
                onChange={handleChange}
                errorMsg={errors.position}
                ref={(el) => (inputRefs.current.position = el)}
                required
              />
            </div>
          </div>

          {/* 관심 트랙 항목 */}
          <div className="most-interested">
            <div className="title">
              <p>
                &lt;2025 시큐업&gt; 프로그램 중 가장 관심있는 트랙 1개를
                선택해주세요.
                <span>*</span>
              </p>
              <p>
                (단, 시큐업 행사 현장에서 관심있으신 트랙으로 자유롭게
                이동하시며 입장 가능합니다.)
              </p>
            </div>
            <div className="grid">
              {data?.map((track, trackIdx) => (
                <div
                  id="CustomRadio"
                  className="custom-radio col-4"
                  onChange={handleChange}
                  key={trackIdx}
                >
                  <input
                    type="radio"
                    id={track.tab}
                    value={track.tab}
                    name="fav_content"
                  />
                  <label htmlFor={track.tab}>
                    <span className="radio-marker" />
                    <TrackCard data={track} onClick={null} />
                  </label>
                </div>
              ))}

              {errors.fav_content && (
                <span className="error-msg">{errors.fav_content}</span>
              )}
            </div>
          </div>

          <div className="bottom flex-col align-start">
            <Checkbox
              id="agreeRequired"
              title={"개인정보 수집 및 이용 동의"}
              required="필수"
              moreText="상세보기"
              isChecked={agreements.agreeRequired}
              onChange={handleCheckbox}
              onClickIcon={(e) => handleMoreClick(e)}
            />
            {errors.agreements && (
              <span className="error-msg">{errors.agreements}</span>
            )}
          </div>

          <div className="button-group">
            <Button
              title={"등록하기"}
              btnSize={"lg"}
              btnColor={"squp"}
              disabled={!isFormValid}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </article>

      <ModalTerms />
    </>
  );
};

export default ReservationPage;
