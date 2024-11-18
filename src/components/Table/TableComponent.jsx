import { Button, Divider, Radio, Table } from 'antd';
import React, { Fragment, useState } from 'react'
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';


function TableComponent(props) {
    const {selectionType='checkbox',data=[],columns=[],isLoading=false,handleDeleteMany} = props
    const [rowSelectedKeys,setRowSelectedKeys]= useState([]);
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        setRowSelectedKeys(selectedRowKeys)
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };
    const handleDeleteAll=()=>{
      handleDeleteMany(rowSelectedKeys)
    }
    return (
      <LoadingComponent isLoading={isLoading}>
        { rowSelectedKeys.length>0?(<div style={{margin:'20px 20px 20px 0'}}>
         <ButtonComponent onClick={handleDeleteAll} textButton={'Xóa tất cả'}></ButtonComponent>
        </div>):Fragment

        }
        
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          {...props}
        />
      </LoadingComponent>
    );
}

export default TableComponent