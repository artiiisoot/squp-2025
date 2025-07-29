import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Icon from "../common/Icon";

function BottomBanner() {
  const navigate = useNavigate();
  const { isMobile } = useSelector((state) => state.device);
  const handleGoToReservation = () => {
    navigate("/reserve");
  };
  return (
    <div id="BottomBanner" onClick={handleGoToReservation}>
      <div className="page-container">
        <div className="content">
          {isMobile ? (
            <h5>
              지금 바로 <br /> 사전 예약 하러가기
            </h5>
          ) : (
            <h3>지금 바로 사전 예약 하러가기</h3>
          )}
          <Icon icon="arrow_right" size={isMobile ? "2rem" : "3.5rem"} />
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
