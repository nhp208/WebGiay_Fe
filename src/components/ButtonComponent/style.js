import { Button, ConfigProvider } from "antd";
import styled, { css } from "styled-components";
<ConfigProvider  theme={{
      components: {
        Button: {
          defaultHoverBg:'#000'
        },
      },
    }} direction="rtl">
  </ConfigProvider>

export const ButtonPrimary=styled(Button)`
   
`
