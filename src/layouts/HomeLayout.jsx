import React from "react";
import { useSelector } from "react-redux";

import PcHomePage from "@/pages/Home/PcHomePage";
import MobileHomePage from "@/pages/Home/MobileHomePage";

const HomeLayout = () => {
  const { isMobile } = useSelector((state) => state.device);

  return <>{isMobile ? <MobileHomePage /> : <PcHomePage />}</>;
};

export default HomeLayout;
