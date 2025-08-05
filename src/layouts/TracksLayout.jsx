import React from "react";
import { useSelector } from "react-redux";

import MobileTracksPage from "@/pages/Tracks/MobileTracksPage";
import PcTracksPage from "@/pages/Tracks/PcTracksPage";

const TracksLayout = () => {
  const { isMobile } = useSelector((state) => state.device);
  return <>{isMobile ? <MobileTracksPage /> : <PcTracksPage />}</>;
};

export default TracksLayout;
