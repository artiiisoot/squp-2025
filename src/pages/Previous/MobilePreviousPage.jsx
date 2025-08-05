import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchPreviousData } from "@/api/public";

// 컴포넌트
import PageHeader from "@/components/custom/PageHeader";
import PageTitle from "@/components/custom/PageTitle";
import PreviousCard from "@/components/custom/PreviousCard";

const Previous = () => {
  const navigate = useNavigate();
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

      <article id="MobilePreviousPage">
        <div className="card-list">
          <PageTitle title={"지난 시큐업 세미나"} />
          {data?.map((item) => (
            <PreviousCard
              item={item}
              onClick={() => handleDetailPage(item.years)}
              key={item.years}
            />
          ))}
        </div>
      </article>
    </>
  );
};

export default Previous;
