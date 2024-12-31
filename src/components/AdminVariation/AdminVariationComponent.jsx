import React, { useState } from 'react';
import { Table, Button, Space, Modal, Input, Form, Tag, Switch } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as VariationService from '../../services/VariationService';
import * as message from '../../components/Message/Message';

const AdminVariationComponent = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingVariation, setEditingVariation] = useState(null);
    const queryClient = useQueryClient();
    const [showDeleted, setShowDeleted] = useState(false);

    // Fetch tất cả variations (bao gồm cả đã soft delete)
    const { data: variations, isLoading } = useQuery({
        queryKey: ['variations'],
        queryFn: () => VariationService.getAllVariations(),
    });

    // Lọc variations dựa trên trạng thái showDeleted
    const filteredVariations = variations?.filter(
        variation => showDeleted ? variation.isDeleted : !variation.isDeleted
    );

    // Mutation cho thêm/sửa variation
    const mutationUpsert = useMutation({
        mutationFn: (data) => {
            if (editingVariation) {
                return VariationService.updateVariation(editingVariation._id, data);
            }
            return VariationService.createVariation(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['variations']);
            message.success(editingVariation ? 'Cập nhật thành công' : 'Thêm mới thành công');
            handleCancel();
        },
        onError: (error) => {
            message.error(error.message);
        }
    });

    // Mutation cho soft delete
    const mutationToggleStatus = useMutation({
        mutationFn: (variation) => {
            return VariationService.toggleVariationStatus(variation._id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['variations']);
            message.success('Cập nhật trạng thái thành công');
        }
    });

    // Thêm mutation cho việc soft delete
    const mutationDelete = useMutation({
        mutationFn: (id) => {
            return VariationService.softDeleteVariation(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['variations']);
            message.success('Đã ẩn biến thể thành công');
        },
        onError: (error) => {
            if (error.response?.status === 400) {
                message.error('Không thể xóa biến thể này vì đang được sử dụng trong một số sản phẩm');
            } else {
                message.error('Có lỗi xảy ra khi ẩn biến thể');
            }
        }
    });

    const columns = [
        {
            title: 'Tên biến thể',
            dataIndex: 'Type',
            key: 'Type',
        },
        {
            title: 'Giá trị',
            dataIndex: 'options',
            key: 'options',
            render: (options) => (
                <Space wrap>
                    {options.map((opt, index) => (
                        <Tag key={index}>{opt.value}</Tag>
                    ))}
                </Space>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            render: (isDeleted, record) => (
                <Switch
                    checked={!isDeleted}
                    onChange={() => mutationToggleStatus.mutate(record)}
                    checkedChildren="Đang dùng"
                    unCheckedChildren="Đã ẩn"
                />
            )
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    />
                </Space>
            ),
        },
    ];

    const handleEdit = (variation) => {
        setEditingVariation(variation);
        form.setFieldsValue({
            Type: variation.Type,
            options: variation.options.map(opt => opt.value).join(', ')
        });
        setIsModalVisible(true);
    };

    const handleAdd = () => {
        setEditingVariation(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingVariation(null);
        form.resetFields();
    };

    const handleSubmit = (values) => {
        const options = values.options.split(',').map(value => ({
            value: value.trim()
        }));
        
        mutationUpsert.mutate({
            Type: values.Type,
            options
        });
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Xác nhận ẩn biến thể',
            content: (
                <div>
                    <p>Bạn có chắc chắn muốn ẩn biến thể "{record.Type}" không?</p>
                    <p style={{ color: '#ff4d4f' }}>
                        Lưu ý: 
                        - Biến thể sẽ không hiển thị trong danh sách chọn khi tạo sản phẩm mới
                        - Các sản phẩm đã sử dụng biến thể này vẫn giữ nguyên
                    </p>
                </div>
            ),
            okText: 'Ẩn',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: () => {
                mutationDelete.mutate(record._id);
            }
        });
    };

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Thêm biến thể mới
                </Button>
                <Button
                    onClick={() => setShowDeleted(!showDeleted)}
                    type={showDeleted ? 'primary' : 'default'}
                >
                    {showDeleted ? 'Xem biến thể đang dùng' : 'Xem biến thể đã ẩn'}
                </Button>
            </div>

            <Table
                loading={isLoading}
                columns={columns}
                dataSource={filteredVariations}
                rowKey="_id"
            />

            <Modal
                title={editingVariation ? "Sửa biến thể" : "Thêm biến thể mới"}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="Type"
                        label="Tên biến thể"
                        rules={[{ required: true, message: 'Vui lòng nhập tên biến thể' }]}
                    >
                        <Input placeholder="VD: Màu sắc, Kích thước" />
                    </Form.Item>

                    <Form.Item
                        name="options"
                        label="Giá trị (phân cách bằng dấu phẩy)"
                        rules={[{ required: true, message: 'Vui lòng nhập ít nhất một giá trị' }]}
                    >
                        <Input.TextArea 
                            placeholder="VD: Đỏ, Xanh, Vàng"
                            rows={4}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                {editingVariation ? 'Cập nhật' : 'Thêm mới'}
                            </Button>
                            <Button onClick={handleCancel}>Hủy</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminVariationComponent;