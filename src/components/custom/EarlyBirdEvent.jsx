import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/common/Button";
import EarlybirdImg from "@/assets/images/event/earlybird_img.png";

const EarlyBirdEvent = () => {
  const navigate = useNavigate();
  return (
    <div id="EarlyBirdEvent">
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
            {Array.from({ length: 3 }, (_, i) => (
              <div className="step-item" key={i}>
                <span>{`STEP ${i + 1}`}</span>
                <div className="context">
                  <p>{`2025 시큐업 세미나 사전등록 하기!`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        title={"사전등록하기"}
        btnColor={"squp-reverse"}
        btnSize={"lg"}
        iconName="arrow_right"
        iconSize="1.5rem"
        iconPosition="right"
        onClick={() => navigate("/reserve")}
      />
    </div>
  );
};

export default EarlyBirdEvent;
