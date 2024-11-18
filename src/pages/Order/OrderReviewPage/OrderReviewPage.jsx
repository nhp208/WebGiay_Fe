import React, { useEffect, useState } from 'react';
import { Table, Typography, Image, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { 
    ShoppingCartOutlined, 
    PercentageOutlined, 
    TagOutlined, 
    CarOutlined,
    CreditCardOutlined 
} from '@ant-design/icons';
import { removeOrderProduct, setAmountProduct } from "../../../redux/order/orderSlice";
import * as SkuService from "../../../services/SkuService";
import {
    PageContainer,
    StyledTable,
    StyledSummaryRow,
    IconWrapper,
    PriceCell,
    LabelCell,
    StyledTotalRow,
    InfoCard,
    InfoText,
    ButtonGroup,
    BackButton,
    OrderButton
} from './styles';

const { Title, Text } = Typography;

const OrderReviewPage = ({ orderDetails, shippingAddress, paymentMethod, deliveryMethod, onPlaceOrder, onGoBack }) => {
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const [cart, setCart] = useState(order);

    useEffect(() => {
        setCart(order);
    }, [order]);

    const onQuantityChange = (value, record) => {
        dispatch(setAmountProduct({ product: record.product, sku: record.sku, quantity: value }));
        const updatedOrderItems = cart.orderItems.map((item) =>
            item.product === record.product ? { ...item, amount: value } : item
        );
        setCart((prevCart) => ({ ...prevCart, orderItems: updatedOrderItems }));
    };

    const [skuData, setSkuData] = useState({});
    useEffect(() => {
        const fetchSkuData = async () => {
            const data = {};
            for (let item of order.orderItems) {
                const res = await SkuService.getSKUById(item.sku);
                data[item.sku] = res;
            }
            setSkuData(data);
        };

        fetchSkuData();
    }, [order.orderItems]);

    const columns = [
        {
            title: "Sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <Space>
                    <Image width={64} src={cart.orderItems.image} />
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

                return <Text>{options}</Text>;
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
        },
        {
            title: "Tổng giá sản phẩm",
            key: "priceProdut",
            render: (text, orderItems) => `${(orderItems.price * orderItems.amount).toLocaleString()}₫`,
        },
        {
            title: "Tổng giá sau khi giảm",
            key: "total",
            render: (text, orderItems) =>
                `${(orderItems.price * orderItems.amount * (1 - orderItems.discount / 100)).toLocaleString()}₫`,
        },
    ];

    return (
        <PageContainer>
            <Title level={2}>Xem Lại Đơn Hàng</Title>
            <StyledTable
                dataSource={orderDetails.orderItems}
                columns={columns}
                rowKey="sku"
                pagination={false}
                summary={() => (
                    <Table.Summary fixed>
                        <StyledSummaryRow>
                            <LabelCell colSpan={5}>
                                <IconWrapper>
                                    <ShoppingCartOutlined style={{ fontSize: '16px' }} />
                                    Tạm tính
                                </IconWrapper>
                            </LabelCell>
                            <PriceCell>
                                <span className="price-value">
                                    {orderDetails.itemsPrice.toLocaleString()}₫
                                </span>
                            </PriceCell>
                        </StyledSummaryRow>

                        <StyledSummaryRow>
                            <LabelCell colSpan={5}>
                                <IconWrapper>
                                    <PercentageOutlined style={{ fontSize: '16px' }} />
                                    Thuế (10%)
                                </IconWrapper>
                            </LabelCell>
                            <PriceCell>
                                <span className="price-value">
                                    {orderDetails.taxPrice.toLocaleString()}₫
                                </span>
                            </PriceCell>
                        </StyledSummaryRow>

                        <StyledSummaryRow>
                            <LabelCell colSpan={5}>
                                <IconWrapper>
                                    <TagOutlined style={{ fontSize: '16px', color: '#2eb85c' }} />
                                    Giảm giá
                                </IconWrapper>
                            </LabelCell>
                            <PriceCell style={{ color: '#2eb85c' }}>
                                <span className="price-value">
                                    -{orderDetails.totalDiscounted.toLocaleString()}₫
                                </span>
                            </PriceCell>
                        </StyledSummaryRow>

                        <StyledSummaryRow>
                            <LabelCell colSpan={5}>
                                <IconWrapper>
                                    <CarOutlined style={{ fontSize: '16px' }} />
                                    Phí vận chuyển
                                </IconWrapper>
                            </LabelCell>
                            <PriceCell>
                                <span className="price-value">
                                    {orderDetails.shippingPrice.toLocaleString()}₫
                                </span>
                            </PriceCell>
                        </StyledSummaryRow>

                        <StyledTotalRow>
                            <LabelCell colSpan={5}>
                                <IconWrapper>
                                    <CreditCardOutlined style={{ fontSize: '20px', color: '#ee4d2d' }} />
                                    Tổng cộng
                                </IconWrapper>
                            </LabelCell>
                            <PriceCell style={{ color: '#ee4d2d', fontSize: '18px' }}>
                                <span className="total-value">
                                    {orderDetails.totalPrice.toLocaleString()}₫
                                </span>
                            </PriceCell>
                        </StyledTotalRow>
                    </Table.Summary>
                )}
            />

            <InfoCard title="Địa Chỉ Giao Hàng">
                <InfoText><strong>Tên:</strong> {shippingAddress.fullName}</InfoText>
                <InfoText><strong>Địa chỉ:</strong> {shippingAddress.address}, {shippingAddress.wards}, {shippingAddress.districts}, {shippingAddress.city}</InfoText>
                <InfoText><strong>Số điện thoại:</strong> {shippingAddress.phone}</InfoText>
            </InfoCard>

            <InfoCard title="Phương Thức Thanh Toán">
                <InfoText>{paymentMethod}</InfoText>
            </InfoCard>

            <InfoCard title="Phương Thức Giao Hàng">
                <InfoText>{deliveryMethod}</InfoText>
            </InfoCard>

            <ButtonGroup>
                <BackButton type="default" size="large" onClick={onGoBack}>
                    Trở về trang giỏ hàng
                </BackButton>
                <OrderButton type="primary" size="large" onClick={onPlaceOrder}>
                    Đặt Hàng
                </OrderButton>
            </ButtonGroup>
        </PageContainer>
    );
};

export default OrderReviewPage;
