import React, { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { handleESC } from "@/utils/utils";
import useOutsideClick from "@/utils/useOutsideClick";

const Dropdown = ({
  labelTitle,
  selectedType,
  getCurrentText,
  getCurrentValue,
  showPosition,
  options,
  initValue,
  onChanage,
  readonly,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState({
    text: "",
    value: 0,
  });
  const [activeType, setActiveType] = useState("bg-gray");
  const [listType, setListType] = useState("");
  const dropdownRef = useRef(null);

  const toggleOptionList = () => {
    if (readonly) {
      return;
    } else {
      setIsActive(!isActive);
    }
  };

  const closeOptionList = () => {
    setIsActive(false);
  };

  const clickItem = (item) => {
    const returnValue = options.find((option) => {
      return option == item;
    });
    onChanage(returnValue);
    setIsActive(false);
  };

  useEffect(() => {
    const found = options?.find((item) => item.value === getCurrentValue);
    setSelectedIndex(found || { text: "", value: 0 });
  }, [getCurrentValue, options]);

  useEffect(() => {
    const escHandler = handleESC(closeOptionList);
    window.addEventListener("keydown", escHandler);
    return () => {
      window.removeEventListener("keydown", escHandler);
    };
  }, []);

  // 외부 클릭 이벤트
  useOutsideClick(dropdownRef, () => {
    if (isActive) setIsActive(false);
  });

  return (
    <div id="Dropdown" ref={dropdownRef}>
      {labelTitle && (
        <div className="input-label" v-if="labelTitle">
          <span>{labelTitle}</span>
        </div>
      )}

      <div
        className={`dropdown-selected ${selectedType} ${isActive && "active"}`}
        onClick={() => toggleOptionList()}
      >
        <p>{getCurrentText}</p>
        <Icon icon="chevron_down" size="1.5rem" />
        <span className="border" />
      </div>

      {isActive && (
        <div className={`dropdown-list ${showPosition}`}>
          <ul className={listType}>
            {options.map((item, idx) => (
              <li
                className={`${activeType} ${
                  selectedIndex.value == item.value ? "active" : ""
                }`}
                onClick={() => clickItem(item)}
                key={item.value}
              >
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
