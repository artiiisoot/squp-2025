import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../common/Icon";
import SqupLogoColor from "@/assets/images/squp_logo_color.svg";
import SqupLogoWhite from "@/assets/images/squp_logo_white.svg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { deviceType, isMobile } = useSelector((state) => state.device);
  const [isShow, setIsShow] = useState(false);
  const headerRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

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

  const handleMoveToPage = (pathname) => {
    navigate(pathname);
    setIsShow(false);
  };

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
      <nav id="GNB" ref={headerRef} className={isFixed ? "fixed" : ""}>
        {isMobile ? (
          <div className="header-container">
            <h5>
              <Link to={"/"}>LOGO</Link>
            </h5>
            <Icon
              icon="hamburger"
              size="2rem"
              onClick={() => {
                setIsShow(true);
              }}
            />
          </div>
        ) : (
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
                <Link to={"/reserve"}>사전등록</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {isShow && (
        <div id="Sidebar">
          <div className="header">
            <Icon
              icon="close"
              size="2rem"
              onClick={() => {
                setIsShow(false);
              }}
            />
          </div>
          <div className="body">
            <ul>
              {menus.map((menu, idx) => (
                <li key={idx} onClick={() => handleMoveToPage(menu.path)}>
                  {menu.name}
                </li>
              ))}
              <li onClick={() => handleMoveToPage("/reserve")}>사전등록</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
