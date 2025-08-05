import React from "react";
import { Link, useLocation } from "react-router-dom";

// import SqupLogoColor from "@/assets/images/squp_logo_color.svg";
// import SqupLogoWhite from "@/assets/images/squp_logo_white.svg";
import SqupLogoColor from "@/assets/images/squp_logo_color.png";
import SqupLogoWhite from "@/assets/images/squp_logo_white.png";

const PcGnb = ({ isFixed }) => {
  const location = useLocation();

  const menus = [
    {
      name: "Tracks",
      path: "/tracks",
    },
    {
      name: "Event",
      path: "/event",
    },
    {
      name: "Previous",
      path: "/previous",
    },
  ];

  return (
    <nav id="PcGnb" className={isFixed ? "fixed" : ""}>
      <div className="header-container">
        <Link to={"/"} className="squp-logo">
          <img
            src={isFixed ? SqupLogoColor : SqupLogoWhite}
            alt="squp_logo_color"
          />
        </Link>
        <ul>
          {menus.map((menu, idx) => (
            <li key={idx}>
              <Link
                to={menu.path}
                className={location.pathname === menu.path ? "active" : ""}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="right-menu">
          <li>
            <Link to={"/reservation"}>사전등록</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PcGnb;
