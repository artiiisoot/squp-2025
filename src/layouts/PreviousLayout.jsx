import React from "react";
import { useSelector } from "react-redux";

import PcPreviousPage from "@/pages/Previous/PcPreviousPage";
import MobilePreviousPage from "@/pages/Previous/MobilePreviousPage";

const PreviousLayout = () => {
  const { isMobile } = useSelector((state) => state.device);
  return <>{isMobile ? <MobilePreviousPage /> : <PcPreviousPage />}</>;
};

export default PreviousLayout;
