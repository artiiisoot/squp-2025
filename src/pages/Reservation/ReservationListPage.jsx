import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDataReset, setPage, setPerPage } from "@/reducers/dataSlice";
import { getData, getAllData } from "@/api/apiActions";

import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import PageHeader from "@/components/custom/PageHeader";
import Input from "@/components/common/Input";
import Dropdown from "@/components/common/Dropdown";
import Icon from "@/components/common/Icon";
import ModalReseveListDetail from "@/components/modal/ModalReseveListDetail";
import Button from "@/components/common/Button";

const ReservationList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isMobile } = useSelector((state) => state.device);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const { data, allData, res, page, per_page, total } = useSelector(
    (state) => state.data
  );
  const [filters, setFilters] = useState({
    ra_column: "",
    search_text: "",
    s_date: "",
    e_date: "",
    ra_sort: "desc",
  });
  const typeOption = [
    {
      text: "전체",
      value: "",
    },
    {
      text: "이름",
      value: "ra_name",
    },
    {
      text: "휴대폰번호",
      value: "ra_phone",
    },
    {
      text: "이메일",
      value: "ra_email",
    },
    {
      text: "회사명",
      value: "ra_company",
    },
  ];
  const sortOption = [
    {
      text: "최신순",
      value: "desc",
    },
    {
      text: "오래된순",
      value: "asc",
    },
  ];
  const [typeValue, setTypeValue] = useState(typeOption[0]);
  const [sortValue, setSortValue] = useState(sortOption[0]);
  const [totalPages, setTotalPages] = useState(1);
  const [defaultDate, setDefaultDate] = useState("선택");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleFilterChange = (e) => {
    setFilters({ ...filters, search_text: e.target.value });
  };

  const handleTypeChange = (item) => {
    setTypeValue(item);
    const updatedFilters = { ...filters, ra_column: item.value };
    setFilters(updatedFilters);
  };

  const handleSortChange = (item) => {
    setSortValue(item);
    const updatedFilters = { ...filters, ra_sort: item.value };
    setFilters(updatedFilters);
    dispatch(getData(updatedFilters));
    dispatch(setPage(1));
  };

  const formatDatePicker = (date) => {
    if (!date || isNaN(date.getTime())) return "";
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleStartDatePicker = (date) => {
    setStartDate(date);
    const formatted = formatDatePicker(date);
    setFilters((prev) => ({ ...prev, s_date: formatted }));

    if (date > new Date()) {
      alert("조회 시작일을 오늘보다 이후로 설정할 수 없습니다.");
      return setStartDate(new Date());
    }
  };

  const handleEndDatePicker = (date) => {
    setEndDate(date);
    const formatted = formatDatePicker(date);
    setFilters((prev) => ({ ...prev, e_date: formatted }));

    // if (startDate === null) {
    //   alert("조회 시작일을 먼저 설정해 주세요.");
    //   return setEndDate(null);
    // }

    // if (startDate !== null && startDate < new Date()) {
    //   alert("조회 종료일을 오늘보다 이전으로 설정할 수 없습니다.");
    //   return setEndDate(startDate);
    // }
  };

  // 검색 핸들러
  const handleSearch = () => {
    if (filters.s_date === "" && filters.e_date === "") {
      setFilters({
        ...filters,
        s_date: formatDatePicker(startDate),
        e_date: formatDatePicker(endDate),
      });
    }
    dispatch(getData({ ...filters }));
    dispatch(setPage(1));
  };

  const handleListDetail = (idx) => {
    // console.log("idx", idx);
    const listItem = data?.[idx];
    setSelectItem(listItem);
    setIsModalOpen(true);
  };

  const pagesNumber = useMemo(() => {
    const result = [];
    for (let i = 0; i < totalPages; i++) {
      result.push(i);
    }

    return result;
  }, [totalPages]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    dispatch(setPage(newPage));
  };

  // 엑셀 다운로드
  const exportToExcel = async () => {
    try {
      const result = await dispatch(
        getData({
          ...filters,
          page: 1,
          perPage: total,
        })
      ).unwrap();

      const exportList = result.data;

      if (!exportList || exportList.length === 0) {
        alert("다운로드할 데이터가 없습니다.");
        return;
      }

      const exportData = exportList.map((item) => ({
        번호: item.row,
        이름: item.name,
        휴대폰번호: item.phone,
        이메일: item.email,
        부서명: item.department,
        직급직책: item.position,
        회사명: item.company,
        관심트랙: item.fav_content,
        등록일: item.wdate,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "ReservationList");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      saveAs(
        blob,
        `ReservationList_${new Date().toISOString().slice(0, 10)}.xlsx`
      );
    } catch (error) {
      alert("엑셀 다운로드에 실패했습니다.");
      console.error(error);
    }
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleAllData = () => {
    dispatch(
      getAllData({
        ...filters,
        // s_date: formatDatePicker(startDate),
        // e_date: formatDatePicker(endDate),
        page: 1,
        perPage: 100,
        // ra_year: 2025,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getData({
        ...filters,
        // s_date: formatDatePicker(startDate),
        // e_date: formatDatePicker(endDate),
        page,
        per_page,
        // ra_year: 2025,
      })
    );
  }, [page]);

  useEffect(() => {
    if (total && per_page) {
      setTotalPages(Math.ceil(total / per_page));
    }
  }, [total, per_page]);

  useEffect(() => {
    return () => {
      dispatch(setDataReset());
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        dispatch(
          getData({
            ...filters,
          })
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filters]);

  useEffect(() => {
    // console.log("allData", allData);
  });

  return (
    <>
      <PageHeader title="사전예약확인" />
      <article id="ReservationList">
        <div className="page-container">
          <div
            className="query"
            style={{
              width: "20rem",
              height: "20rem",
              position: "fixed",
              left: "1rem",
              bottom: "1rem",
              zIndex: "9999",
            }}
          >
            {res}
          </div>

          {isMobile ? (
            <div className="group flex-col">
              <div className="group">
                <Dropdown
                  selectedType="line"
                  readonly={false}
                  showPosition="show-bottom"
                  getCurrentText={typeValue?.text || typeOption[0].text}
                  getCurrentValue={filters.ra_column}
                  options={typeOption}
                  onChange={handleTypeChange}
                />

                <Dropdown
                  id="ra_sort"
                  name="sort"
                  selectedType="line"
                  readonly={false}
                  showPosition="show-bottom"
                  getCurrentText={sortValue?.text || sortOption[0].text}
                  getCurrentValue={filters.ra_sort}
                  options={sortOption}
                  onChange={handleSortChange}
                />
              </div>

              <Input
                id="search_text"
                name="search_text"
                iconName="search"
                value={filters.search_text}
                onChange={handleFilterChange}
                onKeyDown={(e) => activeEnter(e)}
                onClickIcon={(e) => handleSearch(e)}
                placeholder="아이디를 입력하세요"
              />
              <div className="group">
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  placeholderText="날짜 선택"
                  locale={ko}
                  selected={startDate}
                  onChange={(date) => handleStartDatePicker(date)}
                  shouldCloseOnSelect
                />
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  placeholderText="날짜 선택"
                  locale={ko}
                  selected={endDate}
                  onChange={(date) => handleEndDatePicker(date)}
                  shouldCloseOnSelect
                />
              </div>
            </div>
          ) : (
            <div className="filter-group">
              <Dropdown
                selectedType="line"
                readonly={false}
                showPosition="show-bottom"
                getCurrentText={typeValue?.text || typeOption[0].text}
                getCurrentValue={filters.ra_column}
                options={typeOption}
                onChange={handleTypeChange}
              />
              <DatePicker
                dateFormat="yyyy/MM/dd"
                placeholderText="날짜 선택"
                locale={ko}
                selected={startDate}
                onChange={(date) => handleStartDatePicker(date)}
                shouldCloseOnSelect
              />
              <DatePicker
                dateFormat="yyyy/MM/dd"
                placeholderText="날짜 선택"
                locale={ko}
                selected={endDate}
                onChange={(date) => handleEndDatePicker(date)}
                shouldCloseOnSelect
              />
              <Input
                id="search_text"
                name="search_text"
                iconName="search"
                value={filters.search_text}
                onChange={handleFilterChange}
                onKeyDown={(e) => activeEnter(e)}
                onClickIcon={handleSearch}
                placeholder="아이디를 입력하세요"
              />
              <Dropdown
                id="ra_sort"
                name="sort"
                selectedType="line"
                readonly={false}
                showPosition="show-bottom"
                getCurrentText={sortValue?.text || sortOption[0].text}
                getCurrentValue={filters.ra_sort}
                options={sortOption}
                onChange={handleSortChange}
              />
              <Button
                title={"다운로드"}
                btnSize={"lg"}
                btnColor={"primary"}
                onClick={exportToExcel}
              />
            </div>
          )}

          <div className="table-wrapper">
            <div id="Table" className="default">
              <div className="thead">
                {!isMobile && (
                  <div className="th">
                    <p>번호</p>
                  </div>
                )}
                <div className="th">
                  <p>이름</p>
                </div>
                <div className="th">
                  <p>휴대폰번호</p>
                </div>
                <div className="th">
                  <p>이메일</p>
                </div>
                <div className="th">
                  <p>부서명</p>
                </div>
                <div className="th">
                  <p>직급/직책</p>
                </div>
                <div className="th">
                  <p>회사명</p>
                </div>
                <div className="th">
                  <p>관심트랙</p>
                </div>
                <div className="th">
                  <p>Date</p>
                </div>
              </div>
              <div className="tbody">
                {data?.map((item, idx) => (
                  <div
                    className="tr"
                    key={idx}
                    onClick={() => handleListDetail(idx)}
                  >
                    {!isMobile && (
                      <div className="td">
                        <p>{item.row}</p>
                      </div>
                    )}
                    <div className="td">
                      <p>{item.name}</p>
                    </div>
                    <div className="td">
                      <p>{item.phone}</p>
                    </div>
                    <div className="td">
                      <p>{item.email}</p>
                    </div>
                    <div className="td">
                      <p>{item.department}</p>
                    </div>
                    <div className="td">
                      <p>{item.position}</p>
                    </div>
                    <div className="td">
                      <p>{item.company}</p>
                    </div>
                    <div className="td">
                      <p>{item.fav_content}</p>
                    </div>
                    <div className="td">
                      <p>{item.wdate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="Pagination">
            <ul>
              <li disabled={page === 1} onClick={() => handlePageChange(1)}>
                <Icon icon="chevrons_left" size="1.5rem" />
              </li>
              <li
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                <Icon icon="chevron_left" size="1.5rem" />
              </li>
              {pagesNumber.map((_, idx) => (
                <li
                  key={idx + 1}
                  className={page === idx + 1 ? "number active" : "number"}
                  disabled={page === idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </li>
              ))}
              <li
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                <Icon icon="chevron_right" size="1.5rem" />
              </li>
              <li
                disabled={page === totalPages}
                onClick={() => handlePageChange(totalPages)}
              >
                <Icon icon="chevrons_right" size="1.5rem" />
              </li>
            </ul>
          </div>
          <div>
            <h3>총 {total}건</h3>
          </div>
        </div>
      </article>
      {isMobile && isModalOpen && (
        <ModalReseveListDetail
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectItem={selectItem}
        />
      )}
    </>
  );
};

export default ReservationList;
