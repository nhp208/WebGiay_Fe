import { Card, Col, Flex, Image, InputNumber, message, Radio, Row, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import ImageProduct from "../../assets/images/MainProduct1.jpg";
import ImageProductSmall from "../../assets/images/MainProduct2.jpg";
import {
  ListOption,
  QuantityWrapper,
  TextAtt,
  TextAttDetail,
  WarpperVariation,
  WrapperOption,
  WrapperOptionSize,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStylePriceProduct,
  PriceContainer,
  OriginalPrice,
  DiscountedPrice,
  DiscountBadge,
  SavedAmount,
} from "./style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import * as VariationService from "../../services/VariationService";
import * as SkuService from "../../services/SkuService";
import axios from "axios";
import { Option } from "antd/es/mentions";
import { useQuery } from "@tanstack/react-query";
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  GiftOutlined,
  PhoneOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/order/orderSlice";
import { ProductContainer, ImageContainer, ThumbnailContainer, ProductInfo, ServicesContainer } from "./style";

function ProductDetailComponent({ ProductID }) {
  const navigate=useNavigate();
  const fetchGetDetailsProduct = async () => {
    const res = await ProductService.getDetailsProduct(ProductID);
    // console.log("Pres", res.data);
    return res.data;
  };
  const queryProduct = useQuery({
    queryKey: [ProductID],
    queryFn: fetchGetDetailsProduct,
    enabled: true,
  });
  const { isSuccess, isLoading, data: productDetails } = queryProduct;
  console.log("produtDetails", productDetails);

  const [productVariations, setProductVariations] = useState([]);
  useEffect(() => {
    const fetchProductVariations = async () => {
      // Kiểm tra xem productDetails và variations có hợp lệ không
      if (productDetails && Array.isArray(productDetails.variations)) {
        try {
          const requests = productDetails.variations.map((id) =>
            VariationService.getVariation(id)
          );
          const responses = await Promise.all(requests);
          setProductVariations(responses);
        } catch (error) {
          console.error("Lỗi khi tải biến thể sản phẩm:", error);
        }
      } else {
        console.warn("productDetails hoặc variations không hợp lệ");
      }
    };

    fetchProductVariations();
  }, [productDetails]); // Thêm productDetails vào dependency array
  //Selected Option
  const [selectedOptions, setSelectedOptions] = useState({});
  const handleOptionChange = (variationId, optionId) => {
    setSelectedOptions((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (!newSelected[variationId]) {
        newSelected[variationId] = [];
      }
      if (newSelected[variationId].includes(optionId)) {
        newSelected[variationId] = newSelected[variationId].filter(
          (id) => id !== optionId
        );
      } else {
        newSelected[variationId].push(optionId);
      }
      console.log('newSelected',newSelected)
      return newSelected;
    });
  };
  const handleChange = (variationId, value) => {
    setSelectedOptions((prevSelected) => ({
      ...prevSelected,
      [variationId]: value,
    }));
    console.log('selectedOption',selectedOptions)
  };
  const formatCurrency = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "Đ";
  };
  const items = [
    {
      icon: (
        <CheckCircleOutlined style={{ fontSize: "24px", color: "#e53935" }} />
      ),
      title: "Bảo hành keo vĩnh viễn",
    },
    {
      icon: <PhoneOutlined style={{ fontSize: "24px", color: "#e53935" }} />,
      title: "Hotline 1900.000.000 hỗ trợ từ 8h30-21h30",
    },
    {
      icon: (
        <ClockCircleOutlined style={{ fontSize: "24px", color: "#e53935" }} />
      ),
      title: "Giao hàng tận nơi, nhận hàng xong thanh toán",
    },
  ];
  //Sku
  const [sku,setSku]=useState({})
  useEffect(() => {
    const fetchSku = async () => {
      try {
        const res = await SkuService.findMatchingSku(
          productDetails._id,
          selectedOptions,
        );
        console.log("res", res);
        setSku(res); // Cập nhật state với SKU mới
      } catch (error) {
        console.error("Lỗi khi tìm SKU:", error);
      }
    };
  
    fetchSku();
  }, [selectedOptions]);
  //Them vao gio hang
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  const dispatch=useDispatch();
  const user = useSelector((state) => state?.user);
  const location=useLocation();
  const handleAddToCart = () => {
    if(!user?.id){
      navigate('/sign-in',{state: location?.pathname})
    }else{
      // name : {type:String,required:true,unique:true},
      //       amount:{type:Number,required:true},
      //       image: {type:String,required:true},
      //       price : {type:Number,default:false,required:true},
      //       sku:{
      //           type: mongoose.Schema.Types.ObjectId,
      //           ref:'SKU',
      //           required:true,
      //       }
      dispatch(addOrderProduct({
        orderItem:{
          name:productDetails?.name,
          amount:quantity,
          image:productDetails?.image,
          price:productDetails?.price,
          discount:productDetails?.discount,
          sku:sku?._id,
          product:productDetails?._id,
        }
      }))
      message.success(` Thêm ${productDetails?.name} vào giỏ hàng thành công`)
    }
  };

  return (
    <ProductContainer>
      <ImageContainer span={10}>
        <Image
          width="100%"
          style={{ padding: '40px' }}
          src={productDetails?.image}
          alt={productDetails?.name}
          preview={false}
        />
        <ThumbnailContainer>
          {[...Array(6)].map((_, index) => (
            <WrapperStyleColImage key={index}>
              <WrapperStyleImageSmall
                src={ImageProductSmall}
                preview={false}
              />
            </WrapperStyleColImage>
          ))}
        </ThumbnailContainer>
      </ImageContainer>

      <ProductInfo span={14}>
        <WrapperStyleNameProduct>
          {productDetails?.name}
        </WrapperStyleNameProduct>

        <div>
          <TextAtt>Mô tả:</TextAtt>
          <TextAttDetail>{productDetails?.description}</TextAttDetail>
        </div>

        <PriceContainer>
          {productDetails?.discount > 0 ? (
            <>
              <DiscountedPrice>
                {formatCurrency(productDetails.price * (1 - productDetails.discount / 100))}
              </DiscountedPrice>
              <OriginalPrice>
                {formatCurrency(productDetails.price)}
              </OriginalPrice>
              <DiscountBadge>-{productDetails.discount}%</DiscountBadge>
            </>
          ) : (
            <DiscountedPrice>
              {formatCurrency(productDetails?.price)}
            </DiscountedPrice>
          )}
        </PriceContainer>
        {productDetails?.discount > 0 && (
          <SavedAmount>
            Tiết kiệm: {formatCurrency(productDetails.price * (productDetails.discount / 100))}
          </SavedAmount>
        )}

        <div>
          <TextAtt>Thương hiệu:</TextAtt>
          <TextAttDetail>{productDetails?.brandName}</TextAttDetail>
        </div>

        <WarpperVariation>
          {productDetails?.variations?.length > 0 ? (
            productDetails.variations.map((variation) => (
              <WrapperOption key={variation._id}>
                <TextAtt>{variation.Type}:</TextAtt>
                <Select
                  style={{ width: '100%' }}
                  placeholder={`Chọn ${variation.Type}`}
                  value={selectedOptions[variation.Type] || []}
                  onChange={(value) => handleChange(variation.Type, value)}
                >
                  {variation.options.map((option) => (
                    <Select.Option key={option._id} value={option.value}>
                      {option.value}
                    </Select.Option>
                  ))}
                </Select>
              </WrapperOption>
            ))
          ) : (
            <TextAttDetail>Không có biến thể</TextAttDetail>
          )}
        </WarpperVariation>

        {sku?.skuStock !== undefined && (
          <div>
            <TextAtt>Còn lại:</TextAtt>
            <TextAttDetail>{sku.skuStock} sản phẩm</TextAttDetail>
          </div>
        )}

        <QuantityWrapper>
          <TextAtt>Số lượng:</TextAtt>
          <InputNumber
            min={1}
            max={sku?.skuStock || 100}
            value={quantity}
            onChange={handleQuantityChange}
            style={{ width: '120px' }}
          />
        </QuantityWrapper>

        <ButtonComponent
          // styleButton={{
          //   background: 'var(--primary-color)',
          //   width: '200px',
          //   height: '45px',
          //   borderRadius: '8px',
          // }}
          styleTextButton={{ color: '#fff', fontWeight: '500', fontSize: '16px' }}
          onClick={handleAddToCart}
          textButton="Thêm vào giỏ hàng"
        />

        <ServicesContainer gutter={[16, 16]}>
          {items.map((item, index) => (
            <Col key={index} span={8}>
              <Card bordered={false}>
                {item.icon}
                <div style={{ marginTop: '12px', fontSize: '14px' }}>
                  {item.title}
                </div>
              </Card>
            </Col>
          ))}
        </ServicesContainer>
      </ProductInfo>
    </ProductContainer>
  );
}

export default ProductDetailComponent;
