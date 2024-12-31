import React, { useEffect, useState, useCallback } from 'react';
import { WrapperLabelText, WrapperContent, PriceRangeContainer, PriceDisplay, PriceBox, ButtonContainer, StyledButton, NavbarContainer, StyledSlider } from './style';
import { AutoComplete, Input, Select, Slider, Space } from "antd";
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductService from "../../services/ProductService";
import * as VariationService from "../../services/VariationService";
import { debounce } from 'lodash';
import styled from 'styled-components';

function NavbarComponent({ onSearch, initialFilters }) {
  // Cập nhật state filters, bỏ color
  const [filters, setFilters] = useState({
    type: initialFilters?.type || '',
    brand: initialFilters?.brand || '',
    priceRange: initialFilters?.priceRange || [0, 100000000],
  });

  // Cập nhật filters khi initialFilters thay đổi
  useEffect(() => {
    if (initialFilters) {
      setFilters({
        type: initialFilters.type || '',
        brand: initialFilters.brand || '',
        priceRange: initialFilters.priceRange || [0, 100000000],
      });
      setBrandInput(initialFilters.brand || '');
    }
  }, [initialFilters]);

  // State for options
  const [brandNames, setBrandNames] = useState([]);
  const [typeProducts, setTypeProducts] = useState([]);
  const [brandInput, setBrandInput] = useState(initialFilters?.brand || '');
  const [brandSuggestions, setBrandSuggestions] = useState([]);

  // Fetch data from API với error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandRes, typeRes] = await Promise.all([
          ProductService.getAllBrandNameProduct(),
          ProductService.getAllTypeProduct()
        ]);
        
        if (brandRes?.data) {
          setBrandNames(brandRes.data);
          // Khởi tạo brandSuggestions
          setBrandSuggestions(brandRes.data);
        }
        
        if (typeRes?.data) {
          setTypeProducts(typeRes.data);
        }
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    fetchData();
  }, []);

  // Debounce search brands với memo
  const debouncedSearchBrands = useCallback(
    debounce((searchText) => {
      if (!searchText) {
        setBrandSuggestions(brandNames);
        return;
      }
      const filteredBrands = brandNames.filter(brand => 
        brand.toLowerCase().includes(searchText.toLowerCase())
      );
      setBrandSuggestions(filteredBrands);
    }, 300),
    [brandNames]
  );

  // Handle changes với auto-search
  const handleTypeChange = (value) => {
    const newFilters = { ...filters, type: value };
    setFilters(newFilters);
    onSearch(newFilters); // Auto-search khi thay đổi type
  };

  const handleBrandInputChange = (value) => {
    setBrandInput(value);
    debouncedSearchBrands(value);
  };

  const handleBrandSelect = (value) => {
    setBrandInput(value);
    const newFilters = { ...filters, brand: value };
    setFilters(newFilters);
    onSearch(newFilters); // Auto-search khi chọn brand
  };

  // Tách state riêng cho giá trị hiển thị của slider
  const [sliderValue, setSliderValue] = useState(filters.priceRange);

  // Xử lý khi đang kéo slider
  const handleSliderChange = (value) => {
    setSliderValue(value); // Cập nhật ngay để UI mượt
  };

  // Xử lý khi kéo xong
  const handleAfterSliderChange = useCallback(
    debounce((value) => {
      setFilters(prev => ({ ...prev, priceRange: value }));
      onSearch({ ...filters, priceRange: value });
    }, 500),
    [filters, onSearch]
  );

  // Format price
  const formatPrice = useCallback((value) => 
    `${value.toLocaleString('vi-VN')}đ`, 
    []
  );

  // Cleanup
  useEffect(() => {
    return () => {
      handleAfterSliderChange.cancel();
    };
  }, [handleAfterSliderChange]);

  // Clear filters
  const handleClearFilters = () => {
    const defaultFilters = {
      type: '',
      brand: '',
      priceRange: [0, 100000000],
    };
    setFilters(defaultFilters);
    setBrandInput('');
    onSearch(defaultFilters);
  };

  return (
    <NavbarContainer>
      {/* Loại giày */}
      <WrapperLabelText>Loại Giày</WrapperLabelText>
      <WrapperContent>
        <Select
          style={{ width: '100%' }}
          placeholder="Chọn loại giày"
          onChange={handleTypeChange}
          value={filters.type}
          allowClear
        >
          <Select.Option value="">Tất cả</Select.Option>
          {typeProducts.map(type => (
            <Select.Option key={type} value={type}>{type}</Select.Option>
          ))}
        </Select>
      </WrapperContent>

      {/* Hãng giày */}
      <WrapperLabelText>Hãng Giày</WrapperLabelText>
      <WrapperContent>
        <AutoComplete
          style={{ width: '100%' }}
          value={brandInput}
          onChange={handleBrandInputChange}
          onSelect={handleBrandSelect}
          placeholder="Nhập tên hãng giày"
          options={brandSuggestions.map(brand => ({
            value: brand,
            label: (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}>
                <span>{brand}</span>
                {brandNames.includes(brand) && (
                  <span style={{ 
                    color: '#8c8c8c', 
                    fontSize: '12px',
                    marginLeft: '8px'
                  }}>
                    Hãng giày
                  </span>
                )}
              </div>
            )
          }))}
          filterOption={false}
        >
          <Input.Search size="middle" placeholder="Nhập tên hãng giày" />
        </AutoComplete>
      </WrapperContent>

      {/* Khoảng giá */}
      <WrapperLabelText>Khoảng Giá</WrapperLabelText>
      <PriceRangeContainer>
        <StyledSlider
          range
          min={0}
          max={100000000}
          step={100000}
          value={sliderValue}
          onChange={handleSliderChange}
          onAfterChange={handleAfterSliderChange}
          tipFormatter={formatPrice}
        />
        <PriceDisplay>
          <PriceBox>{formatPrice(sliderValue[0])}</PriceBox>
          <span>-</span>
          <PriceBox>{formatPrice(sliderValue[1])}</PriceBox>
        </PriceDisplay>
      </PriceRangeContainer>

      {/* Nút xóa bộ lọc */}
      <ButtonContainer>
        <ButtonComponent
          onClick={handleClearFilters}
          textButton="Xóa bộ lọc"
          styleButton={{
            backgroundColor: "#fff",
            color: "#b61a1a",
            width: "100%",
            padding: "8px 0",
            borderRadius: "4px",
            marginBottom: "10px",
            border: "1px solid #b61a1a",
            boxSizing: 'border-box'
          }}
        />
      </ButtonContainer>
    </NavbarContainer>
  );
}

export default React.memo(NavbarComponent);
