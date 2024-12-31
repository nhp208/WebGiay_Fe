import React, { Fragment, useState } from 'react';
import { AppstoreOutlined, LogoutOutlined, MailOutlined, SettingOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';

// Các component cho từng mục
import AdminUserComponent from '../../components/AdminUser/AdminUserComponent';
import AdminProductComponent from '../../components/AdminProduct/AdminProductComponent';
import AdminOrderComponent from '../../components/AdminOrder/AdminOrderComponent.jsx'; // Import component mới
import AdminVariationComponent from '../../components/AdminVariation/AdminVariationComponent.jsx';

// Cấu hình các mục trong menu
const items = [
  {
    key: 'user',
    icon: <UserOutlined />,
    label: 'Người Dùng',
  },
  {
    key: 'product',
    icon: <AppstoreOutlined />,
    label: 'Sản Phẩm',
  },
  {
    key: 'order',
    icon: <ShoppingCartOutlined />,
    label: 'Đơn Hàng',
  },
  {
    key: 'variation',
    icon: <SettingOutlined />,
    label: 'Biến thể',
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Thoát',
  },
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

function AdminPage() {
  const navigate = useNavigate();
  const levelKeys = getLevelKeys(items);

  // Hàm render component dựa trên mục đã chọn
  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return <AdminUserComponent />;
      case 'product':
        return <AdminProductComponent />;
      case 'order':
        return <AdminOrderComponent />; // Hiển thị AdminOrderComponent khi chọn Đơn Hàng
      case 'variation':
        return <AdminVariationComponent />;
      case 'logout':
        navigate('/');
        break;
      default:
        return null;
    }
  };

  const [stateOpenKeys, setStateOpenKeys] = useState(['user']);
  const [keySelected, setKeySelected] = useState('user'); // Đặt key mặc định là 'user'

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  const handleOnclick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <Fragment>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
      </Header>
      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['user']}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          style={{ width: 256, height: '100vh' }}
          items={items}
          onClick={handleOnclick}
        />
        <div style={{ flex: 1, padding: '15px' }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </Fragment>
  );
}

export default AdminPage;
