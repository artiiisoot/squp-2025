import React from "react";
import { useSelector } from "react-redux";

import PcPreviousDetailPage from "@/pages/Previous/PcPreviousDetailPage";
import MobilePreviousDetailPage from "@/pages/Previous/MobilePreviousDetailPage";

const PreviousLayout = () => {
  const { isMobile } = useSelector((state) => state.device);
  return (
    <>{isMobile ? <MobilePreviousDetailPage /> : <PcPreviousDetailPage />}</>
  );
};

export default PreviousLayout;
