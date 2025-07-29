import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../common/Icon";

const ReserveButton = ({ ref }) => {
  const navigate = useNavigate();
  const handleGoToReservation = () => {
    navigate("/reserve");
  };
  return (
    <div id="ReserveButton" ref={ref} onClick={handleGoToReservation}>
      <h4>사전등록하기</h4>
      <Icon icon="arrow_right" size="2.5rem" />
    </div>
  );
};

export default ReserveButton;
