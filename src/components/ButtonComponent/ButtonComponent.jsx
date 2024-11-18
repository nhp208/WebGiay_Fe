import React from "react";
import { ConfigProvider } from "antd";
import { ButtonPrimary } from "./style";
function ButtonComponent({
  disabled,
  size = "large",
  styleButton,
  styleTextButton = { color: "#fff" },
  textButton,
  ...rests
}) {
  return (
    <ButtonPrimary
      size={size}
      style={{
        color: "#fff",
        // backgroundColor: "#b61a1a",
        ...styleButton,
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: disabled ? "#ccc" : "#b61a1a",
      }}
      {...rests}
    >
      <span style={styleTextButton}>{textButton}</span>
    </ButtonPrimary>
  );
}

export default ButtonComponent;
