import React from "react";
import { Drawer, List, Button, Card } from "antd";

const ShippingAddressDrawer = ({ visible, onClose, addresses, onSelectAddress, onCreateNewAddress }) => {
  return (
    <Drawer
      title="Danh sách địa chỉ giao hàng"
      width={500}
      visible={visible}
      onClose={onClose}
    >
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={addresses}
          renderItem={(address) => (
            <List.Item
              actions={[
                <Button onClick={() => onSelectAddress(address)} type="link">
                  Chọn
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <div>
                    <strong>{address.fullName}</strong>
                    <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>
                      Số điện thoại: {address.phone}
                    </p>
                  </div>
                }
                description={
                  <div>
                    <p style={{ margin: 0 }}>{address.address}</p>
                    <p style={{ margin: 0 }}>
                      {`${address.wards}, ${address.districts}, ${address.city}`}
                    </p>
                  </div>
                }
              />
            </List.Item>
          )}
        />
        <Button
          type="primary"
          onClick={onCreateNewAddress}
          style={{ width: "100%", marginTop: "10px" }}
        >
          Thêm địa chỉ mới
        </Button>
      </Card>
    </Drawer>
  );
};

export default ShippingAddressDrawer;
