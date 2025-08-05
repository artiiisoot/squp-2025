import React from "react";

import { useSelector } from "react-redux";

import PcFooter from "@/components/custom/PcFooter";
import MobileFooter from "@/components/custom/MobileFooter";

import ModalPrivacy from "@/components/modal/ModalPrivacy";

const Footer = () => {
  const { isMobile } = useSelector((state) => state.device);

  return (
    <>
      {isMobile ? <MobileFooter /> : <PcFooter />}

      <ModalPrivacy />
    </>
  );
};

export default Footer;
