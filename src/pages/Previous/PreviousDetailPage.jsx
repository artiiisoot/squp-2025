import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { fetchPreviousData } from "@/api/public";

import PageHeader from "@/components/custom/PageHeader";
import Icon from "@/components/common/Icon";
import LineButton from "@/components/common/LineButton";
import { getRequireImage } from "@/utils/utils";

const PreviousDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { isMobile } = useSelector((state) => state.device);
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const imageSrc = getRequireImage("previous", "list", selectedItem?.thumbImg);

  const handleMoveToSite = () => {
    window.open(`http://www.squp.kr/${id}`, "_blank");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPreviousData();
        if (!response || !response.data) return;
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    setSelectedItem(data.find((item) => String(item.years) === String(id)));
  }, [id, data]);

  useEffect(() => {
    if (data && selectedItem === undefined) {
      navigate("/not-found");
    }
  }, [selectedItem]);

  return (
    <>
      <PageHeader title={"Previous"} />

      <article id="PreviousDetailPage">
        <div className="page-container">
          {/* <div className="back-button" onClick={() => navigate("/previous")}>
            <Icon icon="chevron_left" size="1.5rem" />
            <p>목록으로</p>
          </div> */}

          {isMobile ? (
            <div className="title">
              <h6>{selectedItem?.title}</h6>
              <b>
                <p>{selectedItem?.desc}</p>
              </b>
            </div>
          ) : (
            <div className="top">
              <div className="title">
                <h4>{selectedItem?.title}</h4>
                <h3>{selectedItem?.desc}</h3>
              </div>

              <LineButton
                title={`SQUP ${id} 바로가기`}
                btnSize={"lg"}
                btnColor={"squp"}
                onClick={handleMoveToSite}
                iconName="arrow_right"
                iconSize="2.25rem"
                iconPosition="right"
              />
            </div>
          )}

          {selectedItem?.video ? (
            <div className="video">
              <iframe
                width="100%"
                height="100%"
                style={{ aspectRatio: "16/9" }}
                src={selectedItem.video}
                title="모바일 신분증을 활용한 2025 블록체인&amp;AI 해커톤 | 오프라인 기술 설명회 다시보기"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="previous-img">
              <img src={imageSrc} alt={selectedItem?.title} />
            </div>
          )}

          {isMobile && (
            <LineButton
              title={`SQUP ${id} 바로가기`}
              btnSize={"lg"}
              btnColor={"primary"}
              onClick={handleMoveToSite}
            />
          )}

          <div className="button-group">
            <LineButton
              title={"지난 시큐업 세미나 목록"}
              btnColor={"squp"}
              btnSize={"lg"}
              iconName="chevron_left"
              iconSize="1.5rem"
              iconPosition="left"
              onClick={() => navigate("/previous")}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default PreviousDetailPage;
