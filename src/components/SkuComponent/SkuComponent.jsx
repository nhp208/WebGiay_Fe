import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Form,
  Button,
  Popconfirm,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import * as SkuService from "../../services/SkuService.js";
import { useMutationHooks } from "../../hooks/useMutation.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { WrapperUploadFile } from "./style.js";

function SkuComponent({ productId }) {
  const queryClient = useQueryClient();
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [imgSku, setImgSku] = useState('');

  const fetchProductSKUs = async () => {
    try {
      const response = await SkuService.getSKUByIdProduct(productId);
      return response; 
    } catch (error) {
      console.error("Error fetching SKUs:", error);
      return [];
    }
  };

  const querySku = useQuery({
    queryKey: ["skus", productId],
    queryFn: fetchProductSKUs,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,                 // Dữ liệu luôn mới, không lưu vào cache
    cacheTime: 0,
    refetchInterval: 3000,                   // Không cache lâu
  });
  const { isLoading: isLoadingProducts, data: SkuData, refetch } = querySku;

  const isEditing = (record) => record._id === editingKey; // Kiểm tra xem dòng có đang được chỉnh sửa không

  const edit = (record) => {
    setImgSku('')
    form.setFieldsValue({ ...record });
    setEditingKey(record._id); // Đặt ID của dòng đang chỉnh sửa
  };

  const cancel = () => {
    setEditingKey(""); // Đặt lại ID dòng đang chỉnh sửa
  };

  const handleOnChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setImgSku(file.preview); // Cập nhật hình ảnh mới
    return file.preview;
  };

  const save = async (key, id) => {
    try {
      const row = await form.validateFields();
      const data = {
        skuImg: imgSku, // Hình ảnh mới
        skuStock: row.skuStock, // Số lượng tồn kho mới
      };
      await mutationUpdate.mutate({ id, ...data });
      queryClient.invalidateQueries(["skus", productId]);
      await refetch();
      setEditingKey(""); // Đặt lại ID dòng đang chỉnh sửa sau khi lưu
      message.success('Chỉnh sửa biến thể thành công')
    } catch (errInfo) {
      message.error('Chỉnh sửa biến thể thất bại')

      console.log("Validate Failed:", errInfo);
    }
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...newdata } = data;
    return SkuService.updateSku(id, newdata);
  });

  const mutationDelete = useMutationHooks((data) => {
    const { id } = data;
    return SkuService.deleteSku(id);
  });

  const handleDelete = async (id) => {
    try{
      await mutationDelete.mutate({ id });
    queryClient.invalidateQueries(["skus", productId]);
    await refetch();
    message.success('Xóa biến thể thành công')
    }catch (errInfo) {
      message.error('Xóa biến thể thất bại')

      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Biến thể",
      dataIndex: "skuVariations",
      key: "skuVariations",
      render: (variations) => (
        <ul>
          {variations.map((variation, index) => (
            <li key={index}>
              {variation?.variationId?.Type}: {variation.optionValue}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "skuImg",
      editable: true,
      render: (text) => (
        <img
          src={text}
          alt="SKU"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "skuStock",
      editable: true,
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              onClick={() => save(record._id, record._id)}
              style={{ marginRight: 8 }}
              icon={<SaveOutlined />}
              type="primary"
            >
              Lưu
            </Button>
            <Popconfirm title="Bạn có chắc muốn hủy?" onConfirm={cancel}>
              <Button type="link">Hủy</Button>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button
              onClick={() => edit(record)}
              style={{ marginRight: 8 }}
              icon={<EditOutlined />}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Bạn có chắc muốn xóa?"
              onConfirm={() => handleDelete(record._id)}
            >
              <Button icon={<DeleteOutlined />} danger>
                Xóa
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "skuStock" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record), // Kiểm tra xem dòng có đang chỉnh sửa không
      }),
    };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "number" ? (
        <InputNumber />
      ) : (
        <WrapperUploadFile maxCount={1} onChange={handleOnChangeImage}>
          <Button icon={<UploadOutlined />}>Select File</Button>
          {imgSku && (
            <img
              src={imgSku}
              style={{
                marginLeft: "24px",
                height: "120px",
                width: "120px",
                borderRadius: "4%",
                objectFit: "cover",
              }}
              alt="avatar"
            />
          )}
        </WrapperUploadFile>
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={SkuData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
}

export default SkuComponent;
