import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import parse from "html-react-parser";
import { formatText } from "@/utils/utils";

import Button from "@/components/common/Button";
import EarlybirdImg from "@/assets/images/event/earlybird_img.png";

const EarlyBirdEvent = () => {
  const navigate = useNavigate();
  const steps = [
    {
      step: 1,
      context: "2025 시큐업 세미나 사전등록 하기!",
    },
    {
      step: 2,
      context:
        "이메일로 발행 받은 배지를 시큐업 \n 행사 현장 데스크에 인증하기!",
    },
    {
      step: 1,
      context: "배지 인증 완료자 대상 \n 행사 종료 후 기프티콘 지급!",
    },
  ];

  return (
    <div id="PcEarlyBirdEvent">
      <div className="wrapper">
        <div className="left">
          <div className="event-img">
            <img src={EarlybirdImg} alt="earlybird_img" />
          </div>
        </div>
        <div className="right">
          <h4>
            <span>사전등록 Early Bird 이벤트</span>
            <span className="line-highlight" />
          </h4>
          <div className="desc">
            <p>
              오직 사전등록 완료자에게만 발행되는{" "}
              <b>[2025 시큐업 얼리버드 배지]</b>를
            </p>
            <p>
              행사 당일 <b>현장 등록데스크에서 인증</b>해주시면{" "}
              <b>스타벅스 기프티콘 1만원권(선착순 300명)을</b> 드립니다!
            </p>
          </div>

          <div className="step-content">
            {steps.map((step, idx) => (
              <div className="step-item" key={idx}>
                <span>{`STEP ${idx + 1}`}</span>
                <div className="context">
                  <p>{parse(formatText(step.context))}</p>
                </div>
              </div>
            ))}
          </div>

          <span>
            (사전등록 완료 후, 3일 내 제출해주신 메일주소로 [2025 시큐업
            얼리버드 배지]가 발송됩니다.)
          </span>
        </div>
      </div>

      <Button
        title={"사전등록하기"}
        btnColor={"squp-reverse"}
        btnSize={"lg"}
        iconName="arrow_right"
        iconSize="1.5rem"
        iconPosition="right"
        onClick={() => navigate("/reservation")}
      />
    </div>
  );
};

export default EarlyBirdEvent;
