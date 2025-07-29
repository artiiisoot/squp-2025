import React, { useEffect, useState } from "react";

import { fetchEventData, fetchExhibitionData } from "@/api/public";

import { useDispatch, useSelector } from "react-redux";
import { setIsShowModal } from "@/reducers/modalSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import PageHeader from "@/components/custom/PageHeader";
import PageTitle from "@/components/custom/PageTitle";
import ModalEventDetail from "@/components/modal/ModalEventDetail";
import ModalExhibitionDetail from "@/components/modal/ModalExhibitionDetail";

import EarlyBirdEvent from "@/components/custom/EarlyBirdEvent";
import ExhibitionCard from "@/components/custom/ExhibitionCard";
import EventCard from "@/components/custom/EventCard";

const EventPage = () => {
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.device);
  const [eventData, setEventData] = useState([]);
  const [exhibitionData, setExhibitionData] = useState([]);
  const [selectEventItem, setSelectEventItem] = useState(null);
  const [selectExhibitionItem, setSelectExhibitionItem] = useState(null);

  const handleEventDetail = (idx) => {
    const eventItem = eventData?.[idx];
    setSelectEventItem(eventItem);
    dispatch(
      setIsShowModal({
        isShowModal: true,
        type: "event",
      })
    );
  };

  const handleExhibitionDetail = (idx) => {
    const exhibitionItem = exhibitionData?.[idx];
    setSelectExhibitionItem(exhibitionItem);
    dispatch(
      setIsShowModal({
        isShowModal: true,
        type: "exhibition",
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, exhibitionRes] = await Promise.all([
          fetchEventData(),
          fetchExhibitionData(),
        ]);
        if (eventRes?.data) setEventData(eventRes.data);
        if (exhibitionRes?.data) setExhibitionData(exhibitionRes.data);
      } catch (error) {
        console.error("Error fetching tracks data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageHeader title={"Event"} />

      <article id="EventPage">
        <div className="page-container">
          <div id="Events">
            <PageTitle
              title={"2025 시큐업 세미나 이벤트 "}
              context={"단 하나도 놓칠 수 없는 이벤트들! 지금 바로 확인하세요!"}
            />

            <EarlyBirdEvent />

            {isMobile ? (
              <div className="swiper-container">
                <Swiper
                  className="event-swiper"
                  slidesPerView={1.2}
                  spaceBetween={16}
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                >
                  {eventData?.map((item, idx) => (
                    <SwiperSlide
                      onClick={() => handleEventDetail(idx)}
                      key={idx}
                    >
                      <div className="sample-box align-end">
                        <div className="group flex-col align-start">
                          <p>{item.subtitle}</p>
                          <h6>{item.title}</h6>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <div className="grid">
                {eventData?.map((item, idx) => (
                  <EventCard
                    item={item}
                    idx={idx}
                    key={item.id}
                    onClick={() => handleEventDetail(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          <div id="Exhibitions">
            <PageTitle
              title={"2025 시큐업 세미나 부스 체험존"}
              context={"라온의 최신 기술과 제품, 시큐업 체험존에서 만나보세요!"}
            />

            {isMobile ? (
              <div className="swiper-container">
                <Swiper
                  className="exhibition-swiper"
                  slidesPerView={1.2}
                  spaceBetween={16}
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                >
                  {exhibitionData?.map((item, idx) => (
                    <SwiperSlide
                      onClick={() => handleExhibitionDetail(idx)}
                      key={idx}
                    >
                      <div className="sample-box">
                        <div className="group">
                          <p>{item.title}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <div className="grid">
                {exhibitionData?.map((item, idx) => (
                  <ExhibitionCard
                    item={item}
                    idx={idx}
                    key={item.id}
                    onClick={() => handleExhibitionDetail(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      <ModalEventDetail item={selectEventItem} />
      <ModalExhibitionDetail item={selectExhibitionItem} />
    </>
  );
};

export default EventPage;
