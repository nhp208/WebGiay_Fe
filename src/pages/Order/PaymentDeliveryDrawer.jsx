import React, { useState } from "react";
import { Drawer, Radio, Button } from "antd";

const PaymentDeliveryDrawer = ({ visible, onClose, onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const handlePaymentChange = (e) => setPaymentMethod(e.target.value);
  const handleDeliveryChange = (e) => setDeliveryMethod(e.target.value);

  const handleConfirm = () => {
    onSubmit({ paymentMethod, deliveryMethod });
    onClose();
  };
  
  return (
    <Drawer
      title="Chọn phương thức thanh toán và giao hàng"
      placement="right"
      width={500}
      onClose={onClose}
      visible={visible}
      footer={
        <Button type="primary" onClick={handleConfirm} disabled={!paymentMethod || !deliveryMethod}>
          Xác nhận
        </Button>
      }
    >
      <h3>Phương thức thanh toán</h3>
      <Radio.Group style={{ margin: '12px 0 24px' }} onChange={handlePaymentChange} value={paymentMethod}>
        <Radio value="COD">Thanh toán khi nhận hàng</Radio>
        {/* <Radio value="bankTransfer">Chuyển khoản ngân hàng</Radio> */}
      </Radio.Group>

      <h3>Phương thức giao hàng</h3>
      <Radio.Group style={{ margin: '12px 0 24px' }} onChange={handleDeliveryChange} value={deliveryMethod}>
        <Radio value="standard">Giao hàng tiêu chuẩn</Radio>
        {/* <Radio value="express">Giao hàng nhanh</Radio> */}
      </Radio.Group>
    </Drawer>
  );
};

export default PaymentDeliveryDrawer;
