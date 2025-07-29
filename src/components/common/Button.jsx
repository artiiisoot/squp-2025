import React from "react";

import Icon from "./Icon";

const Button = ({
  title,
  btnColor,
  btnSize,
  btnRound = "",
  disabled = false,
  iconName = "",
  iconSize = "",
  iconPosition = "",
  onClick = null,
}) => {
  return (
    <button
      id="Button"
      className={`${btnColor} ${btnSize} ${btnRound} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
    >
      {iconPosition === "left" && <Icon icon={iconName} size={iconSize} />}
      <p>{title}</p>
      {iconPosition === "right" && <Icon icon={iconName} size={iconSize} />}
    </button>
  );
};

export default Button;
