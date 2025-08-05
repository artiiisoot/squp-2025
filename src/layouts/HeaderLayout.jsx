import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PcGnb from "@/components/custom/PcGnb";
import MobileGnb from "@/components/custom/MobileGnb";
import Sidebar from "@/components/custom/Sidebar";

const Header = () => {
  const { isMobile } = useSelector((state) => state.device);

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      {isMobile ? <MobileGnb isFixed={isFixed} /> : <PcGnb isFixed={isFixed} />}

      <Sidebar />
    </>
  );
};

export default Header;
