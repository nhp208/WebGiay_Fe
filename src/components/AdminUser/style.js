import { Form, Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #1890ff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 10px;
`

export const WrapperformCreate = styled(Form)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  .ant-form-item {
    margin-bottom: 24px;
  }

  .ant-form-item-label > label {
    font-weight: 500;
    color: #333;
  }

  .ant-input, .ant-select {
    border-radius: 6px;
    &:hover, &:focus {
      border-color: #1890ff;
    }
  }

  .ant-btn {
    height: 40px;
    border-radius: 6px;
    font-weight: 500;
    
    &.ant-btn-primary {
      background: #1890ff;
      &:hover {
        background: #40a9ff;
      }
    }
  }
`

export const WrapperUploadFile = styled(Upload)`
  .ant-upload.ant-upload-select {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    border: 2px dashed #d9d9d9;
    background: #fafafa;
    
    &:hover {
      border-color: #1890ff;
    }
  }

  .ant-upload-list-item-info {
    display: none;
  }

  .ant-upload-list-item-container {
    display: none;
  }

  .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
`

export const WrapperImagePreview = styled.div`
  margin-top: 16px;
  
  img {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`