import React from "react";
import { useSelector } from "react-redux";

import MobileReservationListPage from "@/pages/Reservation/MobileReservationListPage";
import PcReservationListPage from "@/pages/Reservation/PcReservationListPage";

const ReservationListLayout = () => {
  const { isMobile } = useSelector((state) => state.device);
  return (
    <>{isMobile ? <MobileReservationListPage /> : <PcReservationListPage />}</>
  );
};

export default ReservationListLayout;
