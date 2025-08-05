import React, { useEffect, useState } from "react";

import { fetchEventData, fetchExhibitionData } from "@/api/public";

import { useDispatch } from "react-redux";
import { setIsShowModal } from "@/reducers/modalSlice";

// 컴포넌트
import PageHeader from "@/components/custom/PageHeader";
import PageTitle from "@/components/custom/PageTitle";
import MobileEarlyBirdEvent from "@/components/custom/MobileEarlyBirdEvent";
import EventCard from "@/components/custom/EventCard";
import ExhibitionCard from "@/components/custom/ExhibitionCard";
import ModalEventDetail from "@/components/modal/ModalEventDetail";
import ModalExhibitionDetail from "@/components/modal/ModalExhibitionDetail";

// 오브젝트

const MobileEventPage = () => {
  const dispatch = useDispatch();
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

      <article id="MobileEventPage">
        <div className="page-container">
          <div id="Events">
            <PageTitle
              title={"2025 시큐업 세미나 이벤트"}
              context={
                "단 하나도 놓칠 수 없는 이벤트들! \n 지금 바로 확인하세요!"
              }
            />

            <MobileEarlyBirdEvent />

            <div className="card-list">
              {eventData?.map((item, idx) => (
                <EventCard
                  item={item}
                  idx={idx}
                  key={item.id}
                  onClick={() => handleEventDetail(idx)}
                />
              ))}
            </div>
          </div>

          <div id="Exhibitions">
            <PageTitle
              title={"2025 시큐업 세미나 부스 체험존"}
              context={
                "라온의 최신 기술과 제품, \n 시큐업 체험존에서 만나보세요!"
              }
            />

            <div className="card-list">
              {exhibitionData?.map((item, idx) => (
                <ExhibitionCard
                  item={item}
                  idx={idx}
                  key={item.id}
                  onClick={() => handleExhibitionDetail(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </article>

      <ModalEventDetail item={selectEventItem} />
      <ModalExhibitionDetail item={selectExhibitionItem} />
    </>
  );
};

export default MobileEventPage;
