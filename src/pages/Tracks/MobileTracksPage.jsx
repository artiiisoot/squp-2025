import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { fetchTracksData } from "@/api/public";

import { formatText } from "@/utils/utils";
import parse from "html-react-parser";

// 컴포넌트
import PageHeader from "@/components/custom/PageHeader";

// 오브젝트
import ImgRaonsecure from "@/assets/images/tracks/list/raonsecure.png";
import ImgMetademy from "@/assets/images/tracks/list/metademy.png";
import ImgHackathon from "@/assets/images/tracks/list/hackathon.png";
import LineButton from "@/components/common/LineButton";

const MobileTracksPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(1);
  const [query, setQuery] = useSearchParams();
  const queryId = parseInt(query.get("track"));
  const tracksImage = [ImgRaonsecure, ImgMetademy, ImgHackathon];

  const moveToHome = () => {
    navigate("/");
  };

  const handleTabButton = (idx) => {
    setCurrentIdx(idx);
    navigate(`/tracks?track=${idx}`);
  };

  useEffect(() => {
    setCurrentIdx(queryId);
  }, [queryId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTracksData();
        if (response?.data) {
          setData(response.data);
          console.log("response", response.data);
        }
      } catch (error) {
        console.error("Error fetching tracks data:", error);
      }
    };

    fetchData();
  }, [currentIdx]);

  return (
    <>
      <PageHeader title={"Tracks"} />

      <article id="MobileTracksPage">
        {/* TRACKS TAB */}
        <ul id="Tabs" className="line">
          {data?.map((track) => (
            <li
              className={
                ("tab",
                track.id === currentIdx && queryId === currentIdx
                  ? "active"
                  : "")
              }
              key={track.id}
              onClick={() => handleTabButton(track.id)}
            >
              <div className="text-item">
                <p>{track.tab}</p>
                <p>{parse(formatText(track.trackTitle))}</p>
              </div>
              <span className="border" />
            </li>
          ))}
        </ul>

        {/* TRACKS DATA */}
        {data?.map((track, trackIdx) => (
          <div
            className={
              track.id === currentIdx && queryId === currentIdx
                ? "tab-container active"
                : "tab-container"
            }
            key={trackIdx}
          >
            <div className="track-info">
              {tracksImage.map((img, imgIdx) => (
                <>
                  {trackIdx === imgIdx && (
                    <div className="track-img" key={imgIdx}>
                      <img src={img} alt="track_img" />
                    </div>
                  )}
                </>
              ))}

              <p>{parse(formatText(track.trackDesc))}</p>

              <div className="box">
                <div className="info-item">
                  <div className="box-label">세션 발표</div>
                  <p>{track.trackInfo?.presentation}</p>
                </div>
                {track.trackInfo.booth && (
                  <div className="info-item">
                    <div className="box-label">전시 부스</div>
                    <p>{track.trackInfo?.booth}</p>
                  </div>
                )}
                <div className="info-item">
                  <div className="box-label">진행 시간</div>
                  <p>{track.trackInfo?.time}</p>
                </div>
              </div>
            </div>

            {/* TRACKS TABLE */}
            <div
              id="Table"
              className={
                track.id === currentIdx && queryId === currentIdx
                  ? "track active"
                  : "track"
              }
              key={track.id}
            >
              <div className="thead">
                <div className="th">Time</div>
                <div className="th">Session</div>
              </div>

              {track?.track.map((item, itemIdx) => (
                <div className="tbody" key={itemIdx}>
                  <div className={`td ${item.class}`}>{item.time}</div>

                  <div className={`td ${item.class}`}>
                    {item.type && <p className="type">{item.type}</p>}
                    <p className="title">{item.title}</p>
                    {item.description && (
                      <p className="description">{item.description}</p>
                    )}
                    {item.speaker && (
                      <div className="speaker-item">
                        <p className="speaker">{item.speaker}</p>
                        {item.from && (
                          <>
                            <span>|</span>
                            <p className="from">{item.from}</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* AWARDS */}
            {currentIdx === 3 && (
              <div className="awards">
                <h5>Awards & Benefits</h5>
                <div className="awards-wrapper">
                  <div className="top">
                    <div className="awards-title">시상규모</div>
                    <div className="group">
                      <h6>
                        <b>대상</b>(1팀)
                      </h6>
                      <div className="text-group">
                        <span>1,500만원</span>
                        <div className="item-right">
                          <span>행정안전부 장관상</span>
                        </div>
                      </div>
                    </div>
                    <div className="group">
                      <h6>
                        <b>최우수상</b>(1팀)
                      </h6>
                      <div className="text-group">
                        <span>600만원</span>
                        <div className="item-right">
                          <span>한국조폐공사 사장상</span>
                        </div>
                      </div>
                    </div>
                    <div className="group">
                      <h6>
                        <b>우수상</b>(3팀)
                      </h6>
                      <div className="text-group">
                        <span>300만원</span>
                        <div className="item-right">
                          <span>한국지능정보사회진흥원(NIA) 원장상</span>
                          <span>정보통신산업진흥원(NIPA) 원장상</span>
                          <span>한국인터넷진흥원(KISA) 원장상</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="awards-title">입상팀 특전</div>
                    <p>
                      입상팀(우수상 이내) 대상 <br />
                      별도 논의 심사 후
                    </p>
                    <div className="info-box">
                      <ul className="dot-style">
                        <li>
                          <p>창업 지원금 최대 10억 지원</p>
                        </li>
                        <li>
                          <p>창업 공간 및 인프라 추가 지원</p>
                        </li>
                        <li>
                          <p>
                            글로벌 진출 및 해외 투자유치 지원, <br /> 경영
                            컨설팅 제공
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BOTTOM BUTTON GROUP */}
            <div className="button-group">
              {currentIdx === 1 && (
                <>
                  <LineButton
                    title={"Track C"}
                    btnColor={"squp"}
                    btnSize={"lg"}
                    iconName="chevron_left"
                    iconSize="1.5rem"
                    iconPosition="left"
                    onClick={() => handleTabButton(3)}
                  />
                  <LineButton
                    title={"Track B"}
                    btnColor={"squp"}
                    btnSize={"lg"}
                    iconName="chevron_right"
                    iconSize="1.5rem"
                    iconPosition="right"
                    onClick={() => handleTabButton(currentIdx + 1)}
                  />
                </>
              )}
              {currentIdx === 2 && (
                <>
                  <LineButton
                    title={"Track A"}
                    btnColor={"squp"}
                    btnSize={"lg"}
                    iconName="chevron_left"
                    iconSize="1.5rem"
                    iconPosition="left"
                    onClick={() => handleTabButton(currentIdx - 1)}
                  />
                  <LineButton
                    title={"Track C"}
                    btnColor={"squp"}
                    btnSize={"lg"}
                    iconName="chevron_right"
                    iconSize="1.5rem"
                    iconPosition="right"
                    onClick={() => handleTabButton(currentIdx + 1)}
                  />
                </>
              )}
              {currentIdx === 3 && (
                <>
                  <LineButton
                    title={"Track B"}
                    btnColor={"squp"}
                    btnSize={"lg"}
                    iconName="chevron_left"
                    iconSize="1.5rem"
                    iconPosition="left"
                    onClick={() => handleTabButton(currentIdx - 1)}
                  />
                  <LineButton
                    title={"Track A"}
                    btnColor={"squp"}
                    btnSize={"lg"}
                    iconName="chevron_right"
                    iconSize="1.5rem"
                    iconPosition="right"
                    onClick={() => handleTabButton(1)}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </article>
    </>
  );
};

export default MobileTracksPage;
