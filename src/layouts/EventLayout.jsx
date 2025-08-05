import React from "react";
import { useSelector } from "react-redux";

import PcEventPage from "@/pages/Event/PcEventPage";
import MobileEventPage from "@/pages/Event/MobileEventPage";

const EventLayout = () => {
  const { isMobile } = useSelector((state) => state.device);

  return isMobile ? <MobileEventPage /> : <PcEventPage />;
};

export default EventLayout;
