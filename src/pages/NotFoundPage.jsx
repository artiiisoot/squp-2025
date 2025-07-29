import React from "react";
import PageHeader from "@/components/custom/PageHeader";

const NotFoundPage = () => {
  return (
    <>
      <PageHeader title={"404 Not Found"} />
      <article id="NotFoundPage">
        <div className="page-container">
          <h4>페이지를 찾을 수 없습니다.</h4>
        </div>
      </article>
    </>
  );
};

export default NotFoundPage;
