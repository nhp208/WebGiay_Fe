import React, { useState } from 'react';
import { Drawer, Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const AddShippingAddressDrawer = ({ visible, onClose, addressSelector, onSubmit }) => {
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    wards: '',
    districts: '',
    city: '',
    phone: '',
  });
  const [phoneError, setPhoneError] = useState(''); // Trạng thái lỗi cho số điện thoại

  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      const phoneRegex = /^(\+84|0)[3|5|7|8|9][0-9]{8}$/;
      if (!phoneRegex.test(value)) {
        setPhoneError('Số điện thoại không hợp lệ!');
      } else {
        setPhoneError(''); // Xóa lỗi nếu số hợp lệ
      }
    }

    setShippingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCityChange = (city) => {
    handleInputChange('city', city);
    handleInputChange('districts', ''); // Reset districts khi city thay đổi
    handleInputChange('wards', ''); // Reset wards khi city thay đổi
  };

  const handleDistrictChange = (district) => {
    handleInputChange('districts', district);
    handleInputChange('wards', ''); // Reset wards khi districts thay đổi
  };

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit(shippingAddress);
      onClose();
    }
  };

  // Kiểm tra xem tất cả các trường đã được điền và không có lỗi số điện thoại
  const isFormValid =
    Object.values(shippingAddress).every((field) => field) &&
    !phoneError;

  return (
    <Drawer
      title="Nhập Thông Tin Giao Hàng"
      width={500}
      onClose={onClose}
      visible={visible}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} type="primary" disabled={!isFormValid}>
            Xác nhận
          </Button>
        </div>
      }
    >
      <Form layout="vertical">
        {/* Tên người nhận */}
        <Form.Item label="Tên người nhận" required>
          <Input
            value={shippingAddress.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
          />
        </Form.Item>

        {/* Thành phố */}
        <Form.Item label="Thành phố" required>
          <Select
            placeholder="Chọn thành phố"
            value={shippingAddress.city}
            onChange={handleCityChange}
          >
            {addressSelector.map((city) => (
              <Option key={city.Id} value={city.Name}>
                {city.Name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Quận/Huyện */}
        <Form.Item label="Quận/Huyện" required>
          <Select
            placeholder="Chọn quận/huyện"
            value={shippingAddress.districts}
            onChange={handleDistrictChange}
            disabled={!shippingAddress.city}
          >
            {shippingAddress.city &&
              addressSelector
                .find((c) => c.Name === shippingAddress.city)
                ?.Districts.map((district) => (
                  <Option key={district.Id} value={district.Name}>
                    {district.Name}
                  </Option>
                ))}
          </Select>
        </Form.Item>

        {/* Phường/Xã */}
        <Form.Item label="Phường/Xã" required>
          <Select
            placeholder="Chọn phường/xã"
            value={shippingAddress.wards}
            onChange={(value) => handleInputChange('wards', value)}
            disabled={!shippingAddress.districts}
          >
            {shippingAddress.city &&
              shippingAddress.districts &&
              addressSelector
                .find((c) => c.Name === shippingAddress.city)
                ?.Districts.find((d) => d.Name === shippingAddress.districts)
                ?.Wards.map((ward) => (
                  <Option key={ward.Id} value={ward.Name}>
                    {ward.Name}
                  </Option>
                ))}
          </Select>
        </Form.Item>

        {/* Địa chỉ chi tiết */}
        <Form.Item label="Địa chỉ chi tiết" required>
          <Input
            value={shippingAddress.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        </Form.Item>

        {/* Số điện thoại */}
        <Form.Item
          label="Số điện thoại"
          required
          validateStatus={phoneError ? 'error' : ''}
          help={phoneError}
        >
          <Input
            value={shippingAddress.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddShippingAddressDrawer;
