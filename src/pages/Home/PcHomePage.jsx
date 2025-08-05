import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setStartPosition } from "@/reducers/refSlice";

import { fetchTracksData } from "@/api/public";

// 컴포넌트
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import SectionTitle from "@/components/custom/SectionTitle";
import BottomBanner from "@/components/custom/BottomBanner";
import TrackCard from "@/components/custom/TrackCard";
import ReserveButton from "@/components/custom/ReserveButton";
import ModalProgramDetail from "@/components/modal/ModalProgramDetail";

// 오브젝트
import SqupLogoColor2 from "@/assets/images/squp_logo_color_2.svg";
// import RaonLogoWhite from "@/assets/images/raon_logo_white.svg";
import RaonLogoWhite from "@/assets/images/raon_logo_white.png";
import OverviewImg from "@/assets/images/home/overview/overview_img.png";
import EventImg from "@/assets/images/home/event/event_img.png";
import LocationImg from "@/assets/images/home/location/location_img.png";
import HostImg from "@/assets/images/home/partners/host/host.png";
import SponsorImg from "@/assets/images/home/partners/sponsor/sponsor.png";

const PcHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // const [hostImages, setHostImages] = useState([]);
  // const [sponsorImages, setSponsorImages] = useState([]);
  const startRef = useRef(null);
  const reserveButton = useRef(null);
  const { startPosition, endPosition } = useSelector((state) => state.ref);

  const handleMoveTrack = (trackId) => {
    navigate(`/tracks?track=${trackId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTracksData();
        if (!response || !response.data) return;
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // startRef 설정
  useEffect(() => {
    const updateStart = () => {
      if (startRef.current) {
        dispatch(setStartPosition(startRef.current.offsetTop));
      }
    };

    // 1. 렌더링 후 바로
    updateStart();
    // 2. resize될 때도 업데이트
    window.addEventListener("resize", updateStart);
    return () => {
      window.removeEventListener("resize", updateStart);
    };
  }, []);

  // 디렉토리에서 이미지 전부 가져오기
  // useEffect(() => {
  //   const importAll = (require) => {
  //     const unique = new Set();
  //     require
  //       .keys()
  //       .sort((a, b) => {
  //         const numA = parseInt(a.match(/logo_(\d+)\.png$/)?.[1] || 0);
  //         const numB = parseInt(b.match(/logo_(\d+)\.png$/)?.[1] || 0);
  //         return numA - numB;
  //       })
  //       .forEach((key) => {
  //         const mod = require(key);
  //         const url = mod?.default ?? mod;
  //         unique.add(url);
  //       });
  //     return Array.from(unique);
  //   };

  //   const hostContext = require.context(
  //     "@/assets/images/home/partners/host",
  //     false,
  //     /logo_\d+\.png$/
  //   );
  //   const sponsorContext = require.context(
  //     "@/assets/images/home/partners/sponsor",
  //     false,
  //     /logo_\d+\.png$/
  //   );

  //   setHostImages(importAll(hostContext));
  //   setSponsorImages(importAll(sponsorContext));
  // }, []);

  // 사전등록버튼 플로팅 이벤트
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // 유효한 시작/끝 위치가 없으면 동작 중단
      if (startPosition <= 0 || endPosition <= 0) return;

      const endTriggerY = endPosition - windowHeight;
      // 사전등록 버튼 표시 여부
      const isInReserveRange =
        scrollY > startPosition - 100 && scrollY <= endTriggerY;
      reserveButton.current?.classList.toggle("show", isInReserveRange);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [startPosition, endPosition]);

  return (
    <article id="PcHomePage">
      <section id="Intro">
        <div className="context flex-col">
          <div className="squp-logo">
            <img src={SqupLogoColor2} alt="squp_logo_color" />
          </div>

          <div className="title">
            <h1>Web3 & AI로 연결되는 미래</h1>
            <p>2025 시큐업 & 해커톤</p>
          </div>

          <div className="info-text">
            <p>2025. 09. 23(화)</p>
            <p>COEX 3F Conference Room E Hall</p>
          </div>

          <div className="raon-logo">
            <img src={RaonLogoWhite} alt="raon_logo_white" />
          </div>
        </div>

        <Icon icon="chevron_down" size="8rem" className="arrow" />
      </section>

      <section id="Overview">
        <div className="page-container flex-row">
          <div className="content-img">
            <img src={OverviewImg} alt="overview_img" />
          </div>

          <div className="content-context">
            <h4>2025 시큐업&해커톤에 여러분을 초대합니다.</h4>
            <ul>
              <li>
                디지털 기술은 이제 사회를 연결하고, 산업을 이끌며, 인류의 미래를
                설계하는 근간이 되었습니다. <br />
                그리고 지금, 우리는 기술의 진화가 새로운 문명의 방향을 다시 쓰고
                있는 결정적 전환점 위에 서 있습니다.
              </li>

              <li>
                Web3는 중앙의 통제를 벗어나 개인의 주권과 신뢰를 기반으로 한
                디지털 질서를 만들고 있으며, <br />
                AI는 인간의 사고를 넘어서는 속도로 학습하고 판단하며 산업과 삶의
                모든 영역을 재정의하고 있습니다.
              </li>

              <li>
                이처럼 기술과 사회가 급변하는 시대에,{" "}
                <b>&lt;2025 시큐업&gt;은 "Web3 & AI로 연결된 미래"</b>를 주제로{" "}
                <br />
                디지털 혁신이 만들어갈 새로운 가능성과, 그 속에서 우리가 준비한
                미래 전략과 비전을 나누는 <br />
                뜻깊은 자리가 될 것입니다.
              </li>

              <li>
                우리는 단순히 기술을 논하는 것을 넘어, 그 기술이 사회를 어떻게
                변화시키고, <br />
                신뢰와 안전의 가치를 어떻게 구현할 수 있는가를 함께 고민하고자
                합니다.
              </li>

              <li>
                이 외에도{" "}
                <b>메타버스, 딥페이크, 제로트러스트, 양자내성암호, 블록체인</b>{" "}
                등 디지털 보안의 주요 이슈를 <br />
                다양한 프로그램과 함께 심도 있게 다루며, 참석자 여러분이 다가올
                디지털 신뢰 시대를 먼저 체험하고, <br />그 안에서 새로운 기회와
                방향을 발견할 수 있기를 바랍니다.
              </li>

              <li>
                기술의 본질은 연결이고, 연결의 본질은 신뢰입니다. 지금, Web3와
                AI가 주도하는 변화의 물결 속에서 <br />
                우리는 디지털 신뢰 사회의 주춧돌을 함께 놓아가야 합니다.
              </li>

              <li>
                <b>
                  &lt;2025 시큐업&gt;에서 여러분의 생각과 통찰이 더해지기를
                  진심으로 기대합니다.
                </b>
              </li>

              <li>감사합니다.</li>
            </ul>
          </div>
        </div>

        <div className="button-group">
          <Button
            title={"사전등록하기"}
            btnColor={"squp"}
            btnSize={"lg"}
            iconName="arrow_right"
            iconSize="2rem"
            iconPosition="right"
          />
        </div>
      </section>

      <section id="Tracks" ref={startRef}>
        <SectionTitle title="TRACKS" />

        <div className="page-container">
          <div className="grid gap-4">
            {data?.map((track, trackIdx) => (
              <TrackCard
                data={track}
                key={trackIdx}
                onClick={handleMoveTrack}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="Event">
        <div className="page-container">
          <h3>
            <span>
              2025 시큐업 & 해커톤
              <br />
              사전등록 Early Bird 이벤트
            </span>
            <span className="line-highlight" />
          </h3>
          <div className="event-img">
            <img src={EventImg} alt="event_img" />
          </div>
          <div className="context">
            <p>
              <b>
                &lt;2025 시큐업&gt;에 사전등록 후 행사 당일 현장 등록 데스크에서
                발급받은
              </b>
              <br />
              <b>디지털 배지를 인증</b>한{" "}
              <b>선착순 300분께 스타벅스 기프티콘 1만원권</b>을 드립니다.
              <br />
              사전 등록 시, 제출한 이메일을 통해 꼭 옴니원 배지를 발급받으세요.
            </p>
          </div>
        </div>
        <div className="button-group">
          <Button
            title={"사전등록하기"}
            btnColor={"squp-reverse"}
            btnSize={"lg"}
            iconName="arrow_right"
            iconSize="2rem"
            iconPosition="right"
          />
        </div>
      </section>

      <section id="Location">
        <SectionTitle title="LOCATION" />
        <div className="page-container">
          <div className="location-img">
            <img src={LocationImg} alt="location_img" />
          </div>

          <div className="location-info">
            <div className="info-item">
              <div className="chip">일시</div>
              <p>2025년 9월 23일(화), 13:00~17:15, 해커톤 결선 : 11:20~17:15</p>
            </div>
            <div className="info-item">
              <div className="chip">장소</div>
              <p>
                서울시 강남구 영동대로 513(삼성동, 코엑스) 컨퍼런스룸 3층 E홀
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="Partners">
        <div className="page-container">
          <div className="group">
            <div className="partner-title">주최</div>

            <div className="logo-group">
              <div className="host-img">
                <img src={HostImg} alt="후원" />
              </div>
            </div>
          </div>
          <div className="group">
            <div className="partner-title">후원</div>

            <div className="logo-group">
              <div className="sponsor-img">
                <img src={SponsorImg} alt="후원" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomBanner />

      <ReserveButton ref={reserveButton} />

      {/* <ModalProgramDetail /> */}
    </article>
  );
};

export default PcHomePage;
