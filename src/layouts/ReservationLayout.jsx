import React from "react";
import { useSelector } from "react-redux";

import PcReservationPage from "@/pages/Reservation/PcReservationPage";
import MobileReservationPage from "@/pages/Reservation/MobileReservationPage";

const ReservationLayout = () => {
  const { isMobile } = useSelector((state) => state.device);
  return <>{isMobile ? <MobileReservationPage /> : <PcReservationPage />}</>;
};

export default ReservationLayout;
