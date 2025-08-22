import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setIsShowModal } from "@/reducers/modalSlice";
import { setIsModalAlert, setPopupReset } from "@/reducers/alertSlice";

import { reserve } from "@/api/apiActions";
import { fetchTracksData } from "@/api/public";

import { validateFields } from "@/utils/validateField";

import Input from "@/components/common/Input";
import PageHeader from "@/components/custom/PageHeader";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import MobileEarlyBirdEvent from "@/components/custom/MobileEarlyBirdEvent";
import TrackCard from "@/components/custom/TrackCard";
import ModalTerms from "@/components/modal/ModalTerms";
import Dropdown from "@/components/common/Dropdown";

const initialFields = {
  name: "",
  phone: "",
  email: "",
  // industry: "",
  company: "",
  department: "",
  // job_category: "",
  position: "",
  fav_content: "",
};

const initialAgreements = {
  agreeRequired: false,
};

const MobileReservationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fields, setFields] = useState(initialFields);
  const [agreements, setAgreements] = useState(initialAgreements);
  const [errors, setErrors] = useState({});
  const inputRefs = useRef({});
  const [data, setData] = useState([]);

  const industryOptions = [
    {
      text: "공공",
      value: "공공",
    },
    {
      text: "금융",
      value: "금융",
    },
    {
      text: "기업/IT",
      value: "기업/IT",
    },
    {
      text: "기업/일반",
      value: "기업/일반",
    },
    {
      text: "기관/협회",
      value: "기관/협회",
    },
    {
      text: "교육/학생",
      value: "교육/학생",
    },
    {
      text: "언론",
      value: "언론",
    },
    {
      text: "기타",
      value: "기타",
    },
  ];
  const jobOptions = [
    {
      text: "개발/엔지니어",
      value: "개발/엔지니어",
    },
    {
      text: "판매/영업",
      value: "판매/영업",
    },
    {
      text: "마케팅/PR",
      value: "마케팅/PR",
    },
    {
      text: "일반사무",
      value: "일반사무",
    },
    {
      text: "임원/매니징",
      value: "임원/매니징",
    },
    {
      text: "교육/학생",
      value: "교육/학생",
    },
    {
      text: "기자",
      value: "기자",
    },
    {
      text: "기타",
      value: "기타",
    },
  ];

  const [industryValue, setIndustryValue] = useState("");
  const [jobValue, setJobValue] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // 특수문자 제거 대상
    const specialCharFields = ["name", "department", "position", "company"];
    if (specialCharFields.includes(name)) {
      newValue = newValue.replace(/^\s+/, ""); // 앞 공백 제거
      newValue = newValue.replace(/\s{2,}/g, " "); // 연속 공백 1칸
    }

    // 전화번호: 숫자만
    if (name === "phone") {
      newValue = value.replace(/[^0-9]/g, "").slice(0, 11);
    }

    // 이메일: 공백 제거, 일부 특수문자 허용
    if (name === "email") {
      newValue = value.replace(/[^a-zA-Z0-9@._%+-]/g, "").replace(/\s/g, "");
    }

    setFields((prev) => ({
      ...prev,
      [name]: newValue,
      year: 2025,
      type: "squp",
    }));

    // --- 에러 즉시 검증 ---
    const newErrors = { ...errors };
    const validation = validateFields(
      { ...fields, [name]: newValue },
      agreements
    );

    if (validation[name]) {
      newErrors[name] = validation[name];
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
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

      dispatch(
        setIsModalAlert({
          isShowModal: true,
          title: null,
          context:
            "사전등록이 완료되었습니다. <br /> 성원에 감사드리며, 3일 내 제출해주신 메일주소로 <br /> [2025 시큐업 얼리버드배지]가 발송될 예정이오니, <br /> 현장에서 진행하는 사전등록 이벤트에 많은 참여 바랍니다.",
          btnName: "확인",
          onConfirm: () => {
            dispatch(setPopupReset());
          },
        })
      );
      dispatch(reserve(fields));
      setFields(initialFields);
      navigate("/");
    }
  };

  const handleIndustryChange = (item) => {
    // console.log("item", item);

    setIndustryValue(item);
    setFields((prev) => ({
      ...prev,
      industry: item.value,
    }));
  };
  const handleJobChange = (item) => {
    // console.log("item", item);
    setFields((prev) => ({
      ...prev,
      job_category: item.value,
    }));
    setJobValue(item);
  };

  // useEffect(() => {
  //   dispatch(
  //     setIsModalAlert({
  //       isShowModal: true,
  //       title: null,
  //       context:
  //         "사전등록이 완료되었습니다. <br /><br /> 성원에 감사드리며, 3일 내 제출해주신 메일주소로 <br /> [2025 시큐업 얼리버드배지]가 발송될 예정이오니, <br /> 현장에서 진행하는 사전등록 이벤트에 많은 참여 바랍니다.",
  //       btnName: "확인",
  //       onConfirm: () => {
  //         dispatch(setPopupReset());
  //       },
  //     })
  //   );
  // });

  const isFormValid = useMemo(() => {
    return Object.keys(validateFields(fields, agreements)).length === 0;
  }, [fields, agreements]);

  const handleMoreClick = (e) => {
    e.preventDefault();

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
      <article id="MobileReservationPage">
        <div className="page-container">
          <MobileEarlyBirdEvent />

          {/* 정보 입력 항목 */}
          <div className="reservation-table grid">
            <div className="item">
              <Input
                id="name"
                name="name"
                colLabel="이름"
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
            <div className="item">
              <Input
                id="phone"
                name="phone"
                colLabel="휴대폰번호"
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
            <div className="item">
              <Input
                id="email"
                name="email"
                colLabel="이메일"
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
            {/* <div className="item">
              <Dropdown
                colLabel={"업종"}
                labelRequired={true}
                selectedType="box"
                readonly={false}
                showPosition="show-bottom"
                getCurrentText={
                  industryValue ? industryValue.value : "업종을 선택해 주세요."
                }
                options={industryOptions}
                onChanage={handleIndustryChange}
                errorMsg={errors.industry}
                ref={(el) => (inputRefs.current.industry = el)}
              />
            </div> */}
            <div className="item">
              <Input
                id="company"
                name="company"
                colLabel="회사명"
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
            <div className="item">
              <Input
                id="department"
                name="department"
                colLabel="부서명"
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
            {/* <div className="item">
              <Dropdown
                colLabel={"직군"}
                labelRequired={true}
                selectedType="box"
                readonly={false}
                showPosition="show-bottom"
                getCurrentText={
                  jobValue ? jobValue.value : "직군을 선택해 주세요."
                }
                options={jobOptions}
                onChanage={handleJobChange}
                errorMsg={errors.job_category}
                ref={(el) => (inputRefs.current.job_category = el)}
              />
            </div> */}
            <div className="item">
              <Input
                id="position"
                name="position"
                colLabel="직급/직책"
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
                &lt;2025 시큐업&gt; 프로그램 중 <br /> 가장 관심있는 트랙 1개를
                선택해주세요.
                <span>*</span>
              </p>
              <p>
                (시큐업 행사 현장에서 관심있으신 트랙으로 자유롭게 <br />
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
              className={"gtn-cover gtn-submit"}
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

export default MobileReservationPage;
