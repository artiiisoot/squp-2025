import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setIsShowModal } from "@/reducers/modalSlice";

import Dropdown from "@/components/common/Dropdown";
import RaonLogoWhite from "@/assets/images/raon_logo_white.svg";
import SnsCircleFacebook from "@/assets/images/footer/sns/circle_facebook.svg";
import SnsCircleInstagram from "@/assets/images/footer/sns/circle_instagram.svg";
import SnsCircleYoutube from "@/assets/images/footer/sns/circle_youtube.svg";
import SnsCircleLinkedin from "@/assets/images/footer/sns/circle_linkedin.svg";
import ModalPrivacy from "@/components/modal/ModalPrivacy";

const Footer = ({ ref: endRef }) => {
  const dispatch = useDispatch();
  const siteOption = [
    { text: "Raon IT Group", value: 1, url: "https://www.raoncorp.com" },
    { text: "RaonSecure", value: 2, url: "https://www.raonsecure.com" },
    { text: "RaonVentures", value: 3, url: "https://www.raon.vc" },
    { text: "INBIZNET", value: 4, url: "https://www.inbiznetcorp.com" },
    {
      text: "Digital Trust Networks",
      value: 5,
      url: "https://www.digitaltrustnetworks.com",
    },
    { text: "OmniOne", value: 6, url: "https://www.omnione.net" },
    { text: "Security IQ UP", value: 7, url: "https://www.squp.kr" },
  ];

  const [optionValue, setOptionValue] = useState(siteOption[0]);

  // DROPDOWN 핸들러
  const handleTypeChange = (item) => {
    setOptionValue(item);
    window.open(item.url, "_blank");
  };

  const handleMoreClick = (e) => {
    e.preventDefault();
    console.log("more click");

    dispatch(
      setIsShowModal({
        isShowModal: true,
        type: "privacy",
      })
    );
  };

  return (
    <>
      <div id="Footer" ref={endRef}>
        <div className="footer-container">
          <div className="left">
            <div className="raon-logo">
              <img src={RaonLogoWhite} alt="raon_logo" />
            </div>
            <div className="group">
              <p className="copyright">©RAON IT GROUP. All rights reserved.</p>
              <p to="/" className="footer-link" onClick={handleMoreClick}>
                개인정보처리방침
              </p>
            </div>
          </div>
          <div className="right">
            <div className="sns-group">
              <div className="sns-circle">
                <img src={SnsCircleFacebook} alt="sns_circle_facebook" />
              </div>
              <div className="sns-circle">
                <img src={SnsCircleInstagram} alt="sns_circle_instagram" />
              </div>
              <div className="sns-circle">
                <img src={SnsCircleYoutube} alt="sns_circle_youtube" />
              </div>
              <div className="sns-circle">
                <img src={SnsCircleLinkedin} alt="sns_circle_linkedin" />
              </div>
            </div>
            <Dropdown
              selectedType="box"
              readonly={false}
              showPosition="show-top"
              getCurrentText={"FAMILY SITE"}
              options={siteOption}
              onChanage={handleTypeChange}
            />
          </div>
        </div>
      </div>

      <ModalPrivacy />
    </>
  );
};

export default Footer;
