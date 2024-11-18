import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeading = styled.div`
    padding: 28px;
    color: #000;
    text-align: center;
    font-size: 36px;
    
`
export const WrapperContentProfile = styled.div`
    display:flex;
    flex-direction:column;
    border:1px solid #ccc;
    width:700px;
    margin:0 auto;
    padding:20px;
    border-radius:8px;
    gap:30px;
`
export const WrapperLabel=styled.label`
    color:#000;
    font-size:12px;
    line-height:30px;
    font-weight:600;

`
export const WrapperInput=styled.div`
    display:flex;
    align-items:center;
    gap:20px;
`
export const WrapperUploadFile=styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card{
        width:60px;
        height:60px;
        border-radius:50%;
    }
    & .ant-upload-list-item-info{
        display:none;
    }
    & .ant-upload-list .ant-upload-list-item {
        display:none;
     }
`