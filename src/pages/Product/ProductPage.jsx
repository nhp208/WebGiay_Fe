import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import MultipleItemsComponent from "../../components/MultipleItemsComponent/MultipleItemsComponent";
import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import { WrapperItem } from "./style";
import { useSelector } from "react-redux";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const ProductPage = () => {
   // Phân trang
   const [paginate, setPaginate] = useState({
    page: 1, // Bắt đầu từ 0 để khớp với backend
    limit: 12,
    total: 0
  });

  // Thêm state để lưu filters
  const [filters, setFilters] = useState({
    type: '',
    brand: '',
    color: '',
    priceRange: [0, 10000000]
  });

  const searchProduct = useSelector((state) => state?.product?.search);
  const [stateProducts, setStateProducts] = useState("");

  // Cập nhật hàm fetchProductAll để hỗ trợ filters
  const fetchProductAll = async (search, limit, page, currentFilters) => {
    try {
      // Tạo query params
      const params = {
        limit,
        page,
        search,
        ...(currentFilters.type && { type: currentFilters.type }),
        ...(currentFilters.brand && { brandName: currentFilters.brand }),
        ...(currentFilters.color && { color: currentFilters.color }),
        ...(currentFilters.priceRange && {
          minPrice: currentFilters.priceRange[0],
          maxPrice: currentFilters.priceRange[1]
        })
      };

      const res = await ProductService.getAllProduct(params);
      if (res?.status === 'OK') {
        setStateProducts(res);
        return res;
      }
      return null;
    } catch (error) {
      console.error('Error fetching products:', error);
      return null;
    }
  };

  // Cập nhật useQuery để sử dụng filters
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", searchProduct, paginate.page, paginate.limit, filters],
    queryFn: () => fetchProductAll(
      searchProduct, 
      paginate.limit, 
      paginate.page - 1,
      filters
    ),
    keepPreviousData: true,
    retry: 3,
    retryDelay: 1000,
  });

  // Cập nhật handleSearch
  const handleSearch = async (newFilters) => {
    try {
      // Cập nhật filters state
      setFilters(newFilters);
      
      // Reset về trang 1 khi search
      setPaginate(prev => ({
        ...prev,
        page: 1
      }));

    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  // Cập nhật handlePageChange
  const handlePageChange = (page) => {
    setPaginate(prev => ({ ...prev, page }));
  };

  // Logic lọc sản phẩm theo loại
  const [selectedType, setSelectedType] = useState("");
  const fetchProductByType = async (type) => {
    const res = await ProductService.getAllProductByType(type);
    return res;
  };
  const {
    data: productsByType,
    isLoading: isLoadingProductByType,
  } = useQuery({
    queryKey: ["productsByType", selectedType],
    queryFn: () => fetchProductByType(selectedType),
  });

  useEffect(() => {
    if (selectedType === "Xem tất cả") {
      setStateProducts(products);
      // Reset pagination khi đổi type
      setPaginate(prev => ({
        ...prev,
        page: 1
      }));
    } else if (selectedType !== "") {
      setStateProducts(productsByType);
      // Reset pagination khi đổi type
      setPaginate(prev => ({
        ...prev,
        page: 1
      }));
    }
  }, [selectedType, products, productsByType]);

  const handleSetType = (type) => {
    setSelectedType(type);
  };

 console.log('stateProduct',stateProducts)

  // Theo dõi và cập nhật total từ API response
  useEffect(() => {
    if (stateProducts?.total) {
      setPaginate(prev => ({
        ...prev,
        total: stateProducts.total
      }));
    }
  }, [stateProducts?.total]);

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Row style={{ padding: '24px 64px' }}>
        {/* Sidebar */}
        <Col span={6} style={{ paddingRight: '24px' }}>
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <NavbarComponent 
              onSearch={handleSearch}
              initialFilters={filters} // Truyền filters hiện tại
            />
          </div>
        </Col>

        {/* Main Content */}
        <Col span={18}>
          <LoadingComponent isLoading={isLoading}>
            {/* Products Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              {stateProducts?.data?.map((product) => (
                <WrapperItem key={product._id}>
                  <CardComponent
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    discount={product.discount}
                    NumberProductsSold={product.NumberProductsSold}
                    countInStock={product.countInStock}
                  />
                </WrapperItem>
              ))}
            </div>

            {/* Pagination */}
            {stateProducts?.total > 0 && (
              <div style={{ 
                textAlign: 'center',
                marginTop: '20px',
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <Pagination
                  showQuickJumper
                  current={paginate.page}
                  total={paginate.total}
                  pageSize={paginate.limit}
                  onChange={handlePageChange}
                  showTotal={(total) => `Tổng ${total} sản phẩm`}
                  showSizeChanger={false}
                  disabled={isLoading}
                />
              </div>
            )}
          </LoadingComponent>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
