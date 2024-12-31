import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeading = styled.div`
    padding: 40px 0;
    color: #333;
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    text-transform: uppercase;
`
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #e8e8e8;
    width: 800px;
    margin: 0 auto;
    margin-bottom: 40px;
    padding: 32px;
    border-radius: 12px;
    gap: 24px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`
export const WrapperLabel=styled.label`
    color: #333;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    min-width: 100px;

`
export const WrapperInput=styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 8px 0;
`
export const WrapperUploadFile=styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px dashed #d9d9d9;
        transition: all 0.3s ease;
        
        &:hover {
            border-color: #1890ff;
        }
    }
    & .ant-upload-list-item-info{
        display:none;
    }
    & .ant-upload-list .ant-upload-list-item {
        display:none;
     }
`