import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { setIsShowModal } from "@/reducers/modalSlice";

// 컴포넌트
import Dropdown from "@/components/common/Dropdown";

// 오브젝트
// import RaonLogoWhite from "@/assets/images/raon_logo_white.svg";
import RaonLogoWhite from "@/assets/images/raon_logo_white.png";
import SnsCircleBlog from "@/assets/images/footer/sns/circle_blog.svg";
import SnsCircleFacebook from "@/assets/images/footer/sns/circle_facebook.svg";
import SnsCircleInstagram from "@/assets/images/footer/sns/circle_instagram.svg";
import SnsCircleYoutube from "@/assets/images/footer/sns/circle_youtube.svg";
import SnsCircleX from "@/assets/images/footer/sns/circle_x.svg";
import SnsCircleLinkedin from "@/assets/images/footer/sns/circle_linkedin.svg";

const PcFooter = () => {
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
  ];

  const snsButtons = [
    {
      img: SnsCircleBlog,
      alt: "블로그",
      url: "https://blog.naver.com/funraon",
    },
    {
      img: SnsCircleFacebook,
      alt: "페이스북",
      url: "https://www.facebook.com/raonsecure",
    },
    {
      img: SnsCircleInstagram,
      alt: "인스타그램",
      url: "https://www.instagram.com/raonsecure",
    },
    {
      img: SnsCircleYoutube,
      alt: "유튜브",
      url: "https://www.youtube.com/channel/UCKolDleelO3jVKNDO35nDOg",
    },
    {
      img: SnsCircleX,
      alt: "X",
      url: "https://x.com/raonsecure",
    },
    {
      img: SnsCircleLinkedin,
      alt: "링크드인",
      url: "https://www.linkedin.com/company/raonsecure/",
    },
  ];

  const [optionValue, setOptionValue] = useState(siteOption[0]);

  // DROPDOWN 핸들러
  const handleTypeChange = (item) => {
    setOptionValue(item);
    window.open(item.url, "_blank");
  };

  // 개인정보처리방침 핸들러
  const handlePrivacy = (e) => {
    e.preventDefault();
    dispatch(
      setIsShowModal({
        isShowModal: true,
        type: "privacy",
      })
    );
  };

  // SNS BUTTON 핸들러
  const handleSnsButton = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div id="PcFooter">
      <div className="footer-container">
        <div className="left">
          <div className="raon-logo">
            <img src={RaonLogoWhite} alt="raon_logo" />
          </div>
          <div className="group">
            <p className="copyright">©RaonSecure All rights reserved.</p>
            <p to="/" className="footer-link" onClick={handlePrivacy}>
              개인정보처리방침
            </p>
          </div>
        </div>
        <div className="right">
          <div className="sns-group">
            {snsButtons.map((sns, idx) => (
              <div
                className="sns-circle"
                key={idx}
                onClick={() => handleSnsButton(sns.url)}
              >
                <img src={sns.img} alt={sns.alt} />
              </div>
            ))}
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
  );
};

export default PcFooter;
