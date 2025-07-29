import React from "react";
import Icon from "./Icon";

const Checkbox = ({
  id,
  value,
  title,
  required,
  onChange,
  moreText,
  onClickIcon,
}) => {
  const handleChange = (e) => {
    onChange?.(e.target.checked);
  };

  return (
    <div id="Checkbox">
      <input id={id} type="checkbox" checked={value} onChange={handleChange} />
      <label className="checkbox" htmlFor={id}>
        <div className="custom-checkbox">
          <Icon icon="check" size="1.25rem" />
        </div>
        <div className="group">
          <div className="title group">
            <p>{title}</p>
            {required && <p className="required">({required})</p>}
          </div>
          <div className="more" onClick={onClickIcon}>
            {moreText && <span>{moreText}</span>}
            <Icon icon="chevron_right" size="1.5rem" />
          </div>
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
