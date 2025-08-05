import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/common/Icon";
import { useSelector } from "react-redux";

const ReserveButton = ({ ref }) => {
  const navigate = useNavigate();
  const { isMobile } = useSelector((state) => state.device);
  const handleGoToReservation = () => {
    navigate("/reservation");
  };
  return (
    <div id="ReserveButton" ref={ref} onClick={handleGoToReservation}>
      <h4>사전등록하기</h4>
      <Icon icon="arrow_right" size={isMobile ? "2rem" : "2.5rem"} />
    </div>
  );
};

export default ReserveButton;
