import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setIsShowModal } from "@/reducers/modalSlice";

// 컴포넌트
import Icon from "@/components/common/Icon";

// 오브젝트
// import SqupLogoColor from "@/assets/images/squp_logo_color.svg";
// import SqupLogoWhite from "@/assets/images/squp_logo_white.svg";
import SqupLogoColor from "@/assets/images/squp_logo_color.png";
import SqupLogoWhite from "@/assets/images/squp_logo_white.png";

const MobileGnb = ({ isFixed }) => {
  const dispatch = useDispatch();
  const handleShowSidebar = () => {
    dispatch(
      setIsShowModal({
        isShowModal: true,
        type: "sidebar",
      })
    );
  };

  return (
    <nav id="MobileGnb" className={isFixed ? "fixed" : ""}>
      <div className="header-container">
        <Link to={"/"} className="squp-logo">
          <img
            src={isFixed ? SqupLogoColor : SqupLogoWhite}
            alt="squp_logo_color"
          />
        </Link>

        <div className="group">
          <Link to={"/reservation"} className="reserve">
            사전등록
          </Link>
          <Icon icon="hamburger" size="2rem" onClick={handleShowSidebar} />
        </div>
      </div>
    </nav>
  );
};

export default MobileGnb;
