import React, { useEffect, useState, useCallback } from 'react';
import { WrapperLabelText, WrapperContent, PriceRangeContainer, PriceDisplay, PriceBox, ButtonContainer, StyledButton, NavbarContainer, StyledSlider } from './style';
import { AutoComplete, Input, Select, Slider, Space } from "antd";
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductService from "../../services/ProductService";
import { debounce } from 'lodash';
import styled from 'styled-components';

function NavbarComponent({ onSearch, initialFilters }) {
  // States for filters với giá trị mặc định từ initialFilters
  const [filters, setFilters] = useState({
    type: initialFilters?.type || '',
    brand: initialFilters?.brand || '',
    color: initialFilters?.color || '',
    priceRange: initialFilters?.priceRange || [0, 10000000],
  });

  // Cập nhật filters khi initialFilters thay đổi
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
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

  const handleColorChange = (value) => {
    const newFilters = { ...filters, color: value };
    setFilters(newFilters);
    onSearch(newFilters); // Auto-search khi chọn màu
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
      color: '',
      priceRange: [0, 10000000],
    };
    setFilters(defaultFilters);
    setBrandInput('');
    onSearch(defaultFilters);
  };

  // Thêm state cho tìm kiếm màu
  const [colorSearchText, setColorSearchText] = useState('');
  const [filteredColors, setFilteredColors] = useState([]);

  // Danh sách màu sắc phổ biến cho giày
  const colorOptions = [
    { value: 'black', label: 'Đen', color: '#000000', keywords: ['đen', 'black', 'den'] },
    { value: 'white', label: 'Trắng', color: '#FFFFFF', keywords: ['trang', 'trắng', 'white'] },
    { value: 'red', label: 'Đỏ', color: '#FF0000', keywords: ['đỏ', 'do', 'red'] },
    { value: 'blue', label: 'Xanh dương', color: '#0000FF', keywords: ['xanh duong', 'xanh dương', 'blue'] },
    { value: 'navy', label: 'Xanh navy', color: '#000080', keywords: ['xanh navy', 'navy', 'xanh đậm'] },
    { value: 'grey', label: 'Xám', color: '#808080', keywords: ['xám', 'xam', 'grey', 'gray'] },
    { value: 'brown', label: 'Nâu', color: '#964B00', keywords: ['nâu', 'nau', 'brown'] },
    { value: 'beige', label: 'Be', color: '#F5F5DC', keywords: ['be', 'beige', 'kem nhạt'] },
    { value: 'cream', label: 'Kem', color: '#FFFDD0', keywords: ['kem', 'cream', 'be đậm'] },
    { value: 'pink', label: 'Hồng', color: '#FFC0CB', keywords: ['hồng', 'hong', 'pink'] },
    { value: 'purple', label: 'Tím', color: '#800080', keywords: ['tím', 'tim', 'purple'] },
    { value: 'green', label: 'Xanh lá', color: '#008000', keywords: ['xanh lá', 'xanh la', 'green'] },
    { value: 'orange', label: 'Cam', color: '#FFA500', keywords: ['cam', 'orange'] },
    { value: 'yellow', label: 'Vàng', color: '#FFFF00', keywords: ['vàng', 'vang', 'yellow'] },
    { value: 'silver', label: 'Bạc', color: '#C0C0C0', keywords: ['bạc', 'bac', 'silver'] },
    { value: 'gold', label: 'Vàng gold', color: '#FFD700', keywords: ['vàng Gold', 'gold'] },
    { value: 'multicolor', label: 'Nhiều màu', color: 'linear-gradient(45deg, #FF0000, #00FF00, #0000FF)', 
      keywords: ['nhiều màu', 'nhieu mau', 'multicolor', 'multi'] }
  ];

  // Khởi tạo filteredColors
  useEffect(() => {
    setFilteredColors(colorOptions);
  }, []);

  // Hàm tìm kiếm màu
  const handleColorSearch = (searchText) => {
    setColorSearchText(searchText);
    
    if (!searchText) {
      setFilteredColors(colorOptions);
      return;
    }

    const normalizedSearch = searchText.toLowerCase().trim();
    const filtered = colorOptions.filter(color => 
      color.keywords.some(keyword => 
        keyword.toLowerCase().includes(normalizedSearch)
      )
    );
    
    setFilteredColors(filtered);
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

      {/* Màu sắc */}
      <WrapperLabelText>Màu Sắc</WrapperLabelText>
      <WrapperContent>
        <Select
          style={{ width: '100%' }}
          placeholder="Chọn hoặc nhập tên màu"
          onChange={handleColorChange}
          value={filters.color}
          allowClear
          showSearch
          searchValue={colorSearchText}
          onSearch={handleColorSearch}
          filterOption={false}
        >
          <Select.Option value="">Tất cả</Select.Option>
          {filteredColors.map(color => (
            <Select.Option 
              key={color.value} 
              value={color.value}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '4px 0'
              }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    background: color.color,
                    border: color.value === 'white' ? '1px solid #d9d9d9' : 'none',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <span>{color.label}</span>
              </div>
            </Select.Option>
          ))}
        </Select>
      </WrapperContent>

      {/* Khoảng giá */}
      <WrapperLabelText>Khoảng Giá</WrapperLabelText>
      <PriceRangeContainer>
        <StyledSlider
          range
          min={0}
          max={10000000}
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
