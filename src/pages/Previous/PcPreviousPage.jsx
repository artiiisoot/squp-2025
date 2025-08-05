import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { fetchPreviousData } from "@/api/public";

import PageHeader from "@/components/custom/PageHeader";
import PreviousCard from "@/components/custom/PreviousCard";

const PcPreviousPage = () => {
  const navigate = useNavigate();
  const { isMobile } = useSelector((state) => state.device);
  // const { previous } = useSelector((state) => state.previous);
  const [data, setData] = useState(null);

  const handleDetailPage = (id) => {
    navigate(`/previous/${id}`, { state: { id: id } });
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

  return (
    <>
      <PageHeader title={"Previous"} />

      <article id="PcPreviousPage">
        <div className="page-container">
          {isMobile ? (
            <div className="group flex-col">
              {data?.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="sample-box align-end"
                  // onClick={() => handleDetailPage(item.years)}
                >
                  <div className="group flex-col align-start">
                    <h6>{item.title}</h6>
                    <b>
                      <p>{item.desc}</p>
                    </b>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid">
              {data?.map((item) => (
                <PreviousCard
                  item={item}
                  onClick={() => handleDetailPage(item.years)}
                  key={item.years}
                />
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default PcPreviousPage;
