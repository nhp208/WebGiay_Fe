import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  Table,
  Button,
  Image,
  Card,
  Typography,
  InputNumber,
  Space,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as SkuService from "../../services/SkuService";
import * as OrderService from "../../services/OrderService";
import * as ShippingAddressService from "../../services/ShippingAddressService";
import {
  removeAllOrder,
  removeOrderProduct,
  setAmountProduct,
} from "../../redux/order/orderSlice";
import OrderDrawer from "./AddShippingAddressDrawer.jsx";
import addressSelector from "../../data/vietnamAddress.json";
import PaymentDeliveryDrawer from "./PaymentDeliveryDrawer";
import OrderReviewPage from "./OrderReviewPage/OrderReviewPage.jsx";
import { useNavigate } from "react-router-dom";
import * as message from "../../components/Message/Message.jsx";
import ShippingAddressDrawer from "./ShippingAddressDrawer.jsx";
import AddShippingAddressDrawer from "./AddShippingAddressDrawer.jsx";
import { 
  ShoppingCartOutlined, 
  PercentageOutlined, 
  TagOutlined, 
  CarOutlined,
  CreditCardOutlined 
} from '@ant-design/icons';
import {
  StyledSummaryRow,
  StyledTotalRow,
  IconWrapper,
  PriceCell,
  LabelCell,
  TotalLabelCell,
  TotalPriceCell,
  DividerCell,
  DividerLine
} from './style';

const { Title, Text } = Typography;

function OrderPage() {
  const user = useSelector((state) => state.user);
  // console.log("user", user);
  const orders = useSelector((state) => state.order.orders);
  console.log("orders", orders);
  const userOrder = orders?.find(order => order.userId === user?.id);
  console.log("userOrder", userOrder);
  const [cart, setCart] = useState(userOrder || {
    userId: user?.id,
    orderItems: [],
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    totalDiscounted: 0
  });

  useEffect(() => {
    if (user && userOrder) {
      setCart(userOrder);
    }
  }, [user, userOrder]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onQuantityChange = (value, record) => {
    dispatch(
      setAmountProduct({
        userId: user.id,
        product: record.product,
        sku: record.sku,
        quantity: value,
      })
    );
    
    const updatedOrderItems = cart.orderItems.map((item) =>
      item.product === record.product ? { ...item, amount: value } : item
    );
    setCart((prevCart) => ({ ...prevCart, orderItems: updatedOrderItems }));
  };

  const [skuData, setSkuData] = useState({});
  useEffect(() => {
    const fetchSkuData = async () => {
      const data = {};
      for (let item of cart.orderItems) {
        console.log('item',item)
        const res = await SkuService.getSKUById(item.sku);
        data[item.sku] = res;
      }
      setSkuData(data);
    };
    fetchSkuData();
  }, [cart.orderItems]);

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Image width={64} src={record.image} />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Biến thể",
      dataIndex: "sku",
      key: "sku",
      render: (sku) => {
        const variations =
          Array.isArray(skuData[sku]) && skuData[sku].length > 0
            ? skuData[sku][0]?.skuVariations || []
            : [];
        const options = variations
          .map((variation) => variation.optionValue)
          .join(", ");

        return (
          <Space>
            <Text>{options}</Text>
          </Space>
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()}₫`,
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount} %`,
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <InputNumber
          min={1}
          defaultValue={amount}
          onChange={(value) => onQuantityChange(value, record)}
        />
      ),
    },
    {
      title: "Tổng giá sản phẩm",
      key: "priceProdut",
      render: (text, record) =>
        `${(record.price * record.amount).toLocaleString()}₫`,
    },
    {
      title: "Tổng giá sau khi giảm",
      key: "total",
      render: (text, record) =>
        `${(
          record.price *
          record.amount *
          (1 - record.discount / 100)
        ).toLocaleString()}₫`,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => handleRemoveItem(record.product, record.sku)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  const handleRemoveItem = (productId, sku) => {
    dispatch(removeOrderProduct({ 
      userId: user.id,
      product: productId, 
      sku 
    }));
    
    const updatedOrderItems = cart.orderItems.filter(
      (item) => item.product !== productId && item.sku !== sku
    );
    setCart((prevCart) => ({ ...prevCart, orderItems: updatedOrderItems }));
  };

  const priceProduct = cart.orderItems.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  const taxPrice = useMemo(() => priceProduct * 0.1, [priceProduct]);
  const [discountRates, setDiscountRates] = useState({});

  useEffect(() => {
    const fetchDiscountRates = async () => {
      const discounts = await Promise.all(
        cart.orderItems.map(async (item) => {
          const discount = await SkuService.getProductDiscountBySku(item.sku);
          return { sku: item.sku, discount };
        })
      );
      const discountMap = discounts.reduce((acc, { sku, discount }) => {
        acc[sku] = discount;
        return acc;
      }, {});
      setDiscountRates(discountMap);
    };
    fetchDiscountRates();
  }, [cart.orderItems]);

  const totalDiscounted = useMemo(() => {
    return cart.orderItems.reduce((acc, item) => {
      const discountRate = discountRates[item.sku] || 0;
      const discountedPrice = item.price * item.amount * (discountRate / 100);
      return acc + discountedPrice;
    }, 0);
  }, [cart.orderItems, discountRates]);

  const [shippingPrice, setShippingPrice] = useState(0);
  useEffect(() => {
    const calculateShippingPrice = () => {
      if (priceProduct < 1000000) {
        return 50000;
      } else if (priceProduct >= 1000000 && priceProduct < 2000000) {
        return 25000;
      } else {
        return 10000;
      }
    };
    setShippingPrice(calculateShippingPrice());
  }, [priceProduct]);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const newTotalPrice = priceProduct + shippingPrice + taxPrice - totalDiscounted;
    setTotalPrice(newTotalPrice);
    setCart(prevCart => ({
      ...prevCart,
      itemsPrice: priceProduct,
      shippingPrice,
      taxPrice,
      totalPrice: newTotalPrice,
      totalDiscounted,
    }));
  }, [priceProduct, shippingPrice, taxPrice, totalDiscounted]);
  // xử lý logic đặt hàng
  const [visibleShippingAddressDrawer, setVisibleShippingAddressDrawer] =
    useState(false);
  // const [addresses, setAddresses] = useState([]); // Trạng thái lưu danh sách địa chỉ

  const [showShippingAddressList, setShowShippingAddressList] = useState(false); // Trạng thái để hiển thị danh sách địa chỉ
  const [selectedAddress, setSelectedAddress] = useState(null); // Trạng thái để lưu địa chỉ được chọn
  const [shippingAddressList, setShippingAddressList] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false); // Trạng thái kích hoạt lại fetch

  useEffect(() => {
    const fetchShippingAddress = async () => {
      try {
        const res = await ShippingAddressService.getShippingAddressesByUser(
          user?.id
        );
        console.log("data", res.data);
        setShippingAddressList(res.data);
      } catch (error) {
        console.error("Error fetching shipping addresses:", error);
      }
    };
    fetchShippingAddress();
  }, [triggerFetch, user?.id]); // Gọi lại khi `triggerFetch` hoặc `user.id` thay đổi

  const handleOpenShippingAddressList = () => {
    setVisibleShippingAddressDrawer(true); // Mở Drawer khi nhấn Tiến hành đặt hàng
  };

  const handleCloseDrawer = () => {
    setVisibleShippingAddressDrawer(false); // Đóng Drawer
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address); // Lưu địa chỉ đã chọn
    setVisibleShippingAddressDrawer(false); // Đóng Drawer
    handleOpenPaymentDrawer();
    setCart({...cart, shippingAddress: address._id})

  };
  console.log("selectedAddress", selectedAddress);
  const handleCreateNewAddress = () => {
    // Bạn có thể mở một Drawer khác hoặc modal để tạo địa chỉ mới
    setIsDrawerVisible(true);
    console.log("Mở form tạo địa chỉ mới");
  };
  // const [shippingAddress, setShippingAddress] = useState({
  //   fullName: "",
  //   address: "",
  //   wards: "",
  //   districts: "",
  //   city: "",
  //   phone: "",
  // });

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isPaymentDrawerVisible, setIsPaymentDrawerVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");

  const handleSubmit = async (shippingAddress) => {
    // setShippingAddress(shippingAddress);
    // // setCart({
    // //   ...cart,
    // //   shippingAddress,
    // // });
    if (
      shippingAddress.fullName &&
      shippingAddress.address &&
      shippingAddress.wards &&
      shippingAddress.districts &&
      shippingAddress.city &&
      shippingAddress.phone
    ) {
      const shipAddress = await ShippingAddressService.createShippingAddress(
        user?.id,
        shippingAddress
      );
      if (shipAddress) {
        setIsDrawerVisible(false);
        message.success("Tạo địa chỉ giao hàng mới thành công");
        setShowShippingAddressList(true);
      }
      setTriggerFetch((prev) => !prev);
    }
  };

  const handleOpenPaymentDrawer = () => {
    // if (paymentMethod && deliveryMethod) {
    //   handleOpenReviewPage();
    // } else {
    setIsPaymentDrawerVisible(true);
    // }
  };

  const handleClosePaymentDrawer = () => setIsPaymentDrawerVisible(false);

  const handlePaymentDrawerSubmit = ({ paymentMethod, deliveryMethod }) => {
    setPaymentMethod(paymentMethod);
    setCart({
      ...cart,
      paymentMethod: paymentMethod,
    });
    setDeliveryMethod(deliveryMethod);
    setIsPaymentDrawerVisible(false);
    handleOpenReviewPage();
  };

  const [showReviewPage, setShowReviewPage] = useState(false);
  const handleOpenReviewPage = () => {
    setShowReviewPage(true);
  };

  const handlePlaceOrder = async () => {
    try {
      await OrderService.createOrder({
        ...cart,
        user: user.id
      });
      navigate('/MyOrders');
      message.success("Đặt hàng thành công");
      dispatch(removeAllOrder({ userId: user.id }));
    } catch (error) {
      message.error("Lỗi khi tạo đơn hàng");
      console.error("Lỗi khi tạo đơn hàng:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      message.warning('Vui lòng đăng nhập để xem giỏ hàng');
      navigate('/sign-in');
    }
  }, [user, navigate]);

  return (
    <>
      {showReviewPage ? (
        <OrderReviewPage
          orderDetails={cart}
          shippingAddress={selectedAddress}
          paymentMethod={paymentMethod}
          deliveryMethod={deliveryMethod}
          onPlaceOrder={handlePlaceOrder}
          onGoBack={() => {
            setShowReviewPage(false);
          }}
        />
      ) : (
        <div style={{ padding: "24px" }}>
          <Title level={2}>Giỏ hàng của bạn</Title>
          <Table
            dataSource={cart.orderItems}
            columns={columns}
            rowKey="sku"
            pagination={false}
            summary={() => (
              <Table.Summary fixed>
                {/* Tạm tính */}
                <StyledSummaryRow>
                  <LabelCell colSpan={6}>
                    <IconWrapper>
                      <ShoppingCartOutlined style={{ fontSize: '16px' }} />
                      Tạm tính
                    </IconWrapper>
                  </LabelCell>
                  <PriceCell colSpan={2} style={{ color: '#333' }}>
                    <span className="price-value">
                      {priceProduct.toLocaleString()}₫
                    </span>
                  </PriceCell>
                </StyledSummaryRow>

                {/* Thuế */}
                <StyledSummaryRow>
                  <LabelCell colSpan={6}>
                    <IconWrapper>
                      <PercentageOutlined style={{ fontSize: '16px' }} />
                      Thuế VAT (10%)
                    </IconWrapper>
                  </LabelCell>
                  <PriceCell colSpan={2} style={{ color: '#333' }}>
                    <span className="price-value">
                      {taxPrice.toLocaleString()}₫
                    </span>
                  </PriceCell>
                </StyledSummaryRow>

                {/* Giảm giá */}
                <StyledSummaryRow>
                  <LabelCell colSpan={6}>
                    <IconWrapper>
                      <TagOutlined style={{ fontSize: '16px', color: '#2eb85c' }} />
                      Giảm giá
                    </IconWrapper>
                  </LabelCell>
                  <PriceCell colSpan={2} style={{ color: '#2eb85c' }}>
                    <span className="price-value">
                      -{totalDiscounted.toLocaleString()}₫
                    </span>
                  </PriceCell>
                </StyledSummaryRow>

                {/* Phí vận chuyển */}
                <StyledSummaryRow>
                  <LabelCell colSpan={6}>
                    <IconWrapper>
                      <CarOutlined style={{ fontSize: '16px' }} />
                      Phí vận chuyển
                    </IconWrapper>
                  </LabelCell>
                  <PriceCell colSpan={2} style={{ color: '#333' }}>
                    <span className="price-value">
                      {shippingPrice.toLocaleString()}₫
                    </span>
                  </PriceCell>
                </StyledSummaryRow>

                {/* Đường kẻ ngăn cách */}
                <Table.Summary.Row>
                  <DividerCell colSpan={8}>
                    <DividerLine />
                  </DividerCell>
                </Table.Summary.Row>

                {/* Tổng cộng */}
                <StyledTotalRow>
                  <TotalLabelCell colSpan={6}>
                    <IconWrapper>
                      <CreditCardOutlined style={{ fontSize: '20px', color: '#ee4d2d' }} />
                      Tổng thanh toán
                    </IconWrapper>
                  </TotalLabelCell>
                  <TotalPriceCell colSpan={2}>
                    <span className="total-value">
                      {totalPrice.toLocaleString()}₫
                    </span>
                  </TotalPriceCell>
                </StyledTotalRow>
              </Table.Summary>
            )}
          />
          <Button
            type="primary"
            size="large"
            onClick={handleOpenShippingAddressList}
            style={{ width: "100%" }}
          >
            Tiến hành đặt hàng
          </Button>
          <ShippingAddressDrawer
            visible={visibleShippingAddressDrawer}
            onClose={handleCloseDrawer}
            addresses={shippingAddressList}
            onSelectAddress={handleSelectAddress}
            onCreateNewAddress={handleCreateNewAddress}
          />
          <AddShippingAddressDrawer
            visible={isDrawerVisible}
            onClose={handleCloseDrawer}
            onSubmit={handleSubmit}
            addressSelector={addressSelector}
          />
          <PaymentDeliveryDrawer
            visible={isPaymentDrawerVisible}
            onClose={handleClosePaymentDrawer}
            onSubmit={handlePaymentDrawerSubmit}
          />
        </div>
      )}
    </>
  );
}

export default OrderPage;
