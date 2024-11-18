import { Form, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color:#000;
    font-size: 16px
`
export const WrapperformCreate=styled(Form)`
    max-width: 600px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 540px;
`
export const WrapperUploadFile=styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card{
        width:60px;
        height:60px;
        border-radius:50%;
    }
    & .ant-upload-list-item-info{
        display:none
    }
    & .ant-upload-list-item-container{
        display:none
    }
`