import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { fetchTracksData } from "@/api/public";

import { formatText } from "@/utils/utils";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import PageHeader from "@/components/custom/PageHeader";
import Icon from "@/components/common/Icon";

import ImgRaonsecure from "@/assets/images/tracks/raonsecure.png";
import ImgMetademy from "@/assets/images/tracks/metademy.png";
import ImgHackathon from "@/assets/images/tracks/hackathon.png";
import LineButton from "@/components/common/LineButton";

const Tracks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useSelector((state) => state.device);
  const [query, setQuery] = useSearchParams();
  const [currentIdx, setCurrentIdx] = useState(1);
  const queryId = parseInt(query.get("track"));
  const [data, setData] = useState([]);
  const [trackC, setTrackC] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedTrackIdx, setSelectedTrackIdx] = useState(null);
  // const [selectedItemIdx, setSelectedItemIdx] = useState(null);
  // const [selectedTrack, setSelectedTrack] = useState(null);
  const modalRef = useRef(null);
  const tracksImage = [ImgRaonsecure, ImgMetademy, ImgHackathon];

  const triggerAnimation = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("keyframe");

      setTimeout(() => {
        modalRef.current?.classList.remove("keyframe");
      }, 100); // 0.1초 후 제거
    }
  };
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

  // const handlePrevious = () => {
  //   const currentTrack = data[selectedTrackIdx];
  //   const previousItemIdx = selectedItemIdx - 1;
  //   if (previousItemIdx >= 0) {
  //     const previousTrack = currentTrack.track[previousItemIdx];
  //     setSelectedTrack(previousTrack);
  //     setSelectedItemIdx(previousItemIdx);
  //     triggerAnimation();
  //   } else {
  //     alert("이전 세션이 없습니다.");
  //   }
  // };

  // const handleNext = () => {
  //   const currentTrack = data[selectedTrackIdx];
  //   const nextItemIdx = selectedItemIdx + 1;
  //   if (nextItemIdx < currentTrack.track.length) {
  //     const nextTrack = currentTrack.track[nextItemIdx];
  //     setSelectedTrack(nextTrack);
  //     setSelectedItemIdx(nextItemIdx);
  //     triggerAnimation();
  //   } else {
  //     alert("다음 세션이 없습니다.");
  //   }
  // };

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

  console.log("data", data);

  return (
    <>
      <PageHeader title={"Tracks"} />

      <article id="Tracks">
        <div className="page-container">
          <div className="tabs-group">
            {isMobile ? (
              <Swiper
                className="tabs-swiper"
                slidesPerView={"auto"}
                spaceBetween={16}
              >
                {data?.map((track) => (
                  <SwiperSlide
                    className={
                      track.id === currentIdx && queryId === currentIdx
                        ? "active"
                        : ""
                    }
                    onClick={() => handleTabButton(track.id)}
                  >
                    <p style={{ fontSize: "1.5rem" }}>{track.tab}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
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
                    <p style={{ fontSize: "1.5rem" }}>
                      {`${track.tab} : ${track.trackTitle}`}
                    </p>
                    <span className="border" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TRACKS DATA */}
          {data?.map((track, trackIdx) => (
            <>
              {/* TRACKS INFOMATION */}
              <div
                className={
                  track.id === currentIdx && queryId === currentIdx
                    ? "context active"
                    : "context"
                }
              >
                {tracksImage.map((img, imgIdx) => (
                  <>
                    {trackIdx === imgIdx && (
                      <div className="track-img">
                        <img src={img} alt="track_img" />
                      </div>
                    )}
                  </>
                ))}

                <div className="track-content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: formatText(track.trackDesc),
                    }}
                  />
                  <div className="track-info">
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
              </div>

              {/* TRACKS TABLE */}
              {track.id === currentIdx && currentIdx === 3 ? (
                <div id="Table" className="track active">
                  <div className="thead">
                    <div className="th">Time</div>
                    <div className="th">Session</div>
                    <div className="th">Speaker</div>
                  </div>
                  {track?.track.map((item, itemIdx) => (
                    <>
                      <div className="tbody hackathon" key={item.type}>
                        <div className="group flex-col">
                          {item.sessions.map((session, sessionIdx) => (
                            <div className="group" key={sessionIdx}>
                              <div className="td">{session.time}</div>
                              <div className="td">{session.session}</div>
                            </div>
                          ))}
                        </div>

                        <div className="speaker">
                          <div className="td">
                            <div className="speaker">
                              <p>{item.speaker}</p>
                              <span>|</span>
                              <p>{item.from}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tbody hackathon" key={itemIdx}>
                        <div className="group flex-col">
                          {item.break.map((list, listIdx) => (
                            <div className="group" key={listIdx}>
                              <div className={`td ${list.class}`}>
                                {list.time}
                              </div>
                              <div className={`td ${list.class}`}>
                                {list.session}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              ) : (
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
                    {currentIdx === 3 && <div className="th">Speaker</div>}
                  </div>

                  {track?.track.map((item, itemIdx) => (
                    <div
                      className="tbody"
                      key={itemIdx}
                      // onClick={() => handleTrackDetail(trackIdx, itemIdx)}
                    >
                      <div className={`td ${item.class}`}>{item.time}</div>
                      {isMobile ? (
                        <div className={`td ${item.class}`}>
                          {item.type && <p className="type">{item.type}</p>}
                          <p className="title">{item.title}</p>
                          {item.description && (
                            <p className="description">{item.description}</p>
                          )}
                          {item.speaker && <div className="speaker"></div>}
                        </div>
                      ) : (
                        <div className={`td ${item.class}`}>
                          {item.type && <p className="type">{item.type}</p>}

                          <div className="group flex-col align-start">
                            <p className="title">{item.title}</p>
                            {item.description && (
                              <p className="description">{item.description}</p>
                            )}
                            {item.speaker && (
                              <div className="speaker">
                                <p>{item.speaker}</p>
                                <span>|</span>
                                <p>{item.from}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ))}

          {/* AWARDS */}
          {currentIdx === 3 && (
            <div className="awards">
              <h3>Awards & Prizes</h3>
              <div className="awards-wrapper">
                <div className="left">
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
                      <span>1,500만원</span>
                      <div className="item-right">
                        <span>한국지능정보사회진흥원(NIA) 원장상</span>
                        <span>정보통신산업진흥원(NIPA) 원장상</span>
                        <span>한국인터넷진흥원(KISA) 원장상</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="awards-title">입상팀 특전</div>
                  <h5>
                    입상팀(우수상 이내) 대상 <br />
                    별도 논의 심사 후
                  </h5>
                  <div className="info-box">
                    <ul className="dot-style">
                      <li>창업 지원금 최대 10억 지원</li>
                      <li>
                        창업 공공간 및 인프라 추가 지원 글로벌 진출 및 해외
                        투자유치 지원,
                      </li>
                      <li>경영 컨설팅 제공</li>
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
                  title={"메인화면"}
                  btnColor={"squp"}
                  btnSize={"lg"}
                  iconName="chevron_left"
                  iconSize="1.5rem"
                  iconPosition="left"
                  onClick={moveToHome}
                />
                <LineButton
                  title={"Track B : 메타데미"}
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
                  title={"Track A : 라온시큐어"}
                  btnColor={"squp"}
                  btnSize={"lg"}
                  iconName="chevron_right"
                  iconSize="1.5rem"
                  iconPosition="right"
                  onClick={() => handleTabButton(currentIdx - 1)}
                />
                <LineButton
                  title={"Track C : 해커톤 결선"}
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
                  title={"Track C : 해커톤 결선"}
                  btnColor={"squp"}
                  btnSize={"lg"}
                  iconName="chevron_left"
                  iconSize="1.5rem"
                  iconPosition="left"
                  onClick={() => handleTabButton(currentIdx - 1)}
                />
                <LineButton
                  title={"메인화면"}
                  btnColor={"squp"}
                  btnSize={"lg"}
                  iconName="chevron_right"
                  iconSize="1.5rem"
                  iconPosition="right"
                  onClick={moveToHome}
                />
              </>
            )}
          </div>
        </div>

        {/* {isModalOpen && (
          <div id="ModalTrackDetail" className="modal">
            <div className="modal-dialog" ref={modalRef}>
              <div className="modal-header">
                <h6>{selectedTrack?.time}</h6>
                <Icon
                  icon="close"
                  size="2rem"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
              <div className="modal-body">
                <div className="track-img"></div>

                <div className="title">
                  {selectedTrack?.type && <p>{selectedTrack?.type}</p>}

                  <h5
                    dangerouslySetInnerHTML={{
                      __html: formatText(selectedTrack?.title),
                    }}
                  />
                </div>

                <p className="description">{selectedTrack?.description}</p>
              </div>
              {selectedTrack?.speaker && (
                <div className="modal-footer">
                  <div className="speaker">
                    <div className="profile"></div>
                    <div className="text-group">
                      <p>
                        <b>{selectedTrack?.speaker}</b>
                      </p>
                      <p>{selectedTrack?.from}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="controller">
              <Icon
                icon="chevron_left"
                size="4rem"
                onClick={() => handlePrevious()}
              />
              <Icon
                icon="chevron_right"
                size="4rem"
                onClick={() => handleNext()}
              />
            </div>
          </div>
        )} */}
      </article>
    </>
  );
};

export default Tracks;
