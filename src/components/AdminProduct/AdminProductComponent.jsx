import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { WrapperformCreate, WrapperHeader, WrapperUploadFile, WrapperImagePreview } from "./style";
import { Button, Form, Input, Select, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import TableComponent from "../Table/TableComponent";
import { getBase64, rendeOptions } from "../../utils";
import * as ProductService from "../../services/ProductService";
import * as SkuService from "../../services/SkuService.js";
import { useMutationHooks } from "../../hooks/useMutation";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import * as message from "../../components/Message/Message.jsx";
import { useQuery } from "@tanstack/react-query";
import DrawerComponnent from "../Drawer/DrawerComponnent.jsx";
import { useSelector } from "react-redux";
import ModalComponent from "../Modal/ModalComponent.jsx";
import SelectedVariationsList from "../VariationProduct/SelectedVariationList.jsx";
import VariationSelector from "../VariationProduct/VariationSelector.jsx";
import axios from "axios";
import SkuComponent from "../SkuComponent/SkuComponent.jsx";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
function AdminProductComponent() {
  // const [isLoadingAll, setIsLoadingAll] = useState(false);
  const user = useSelector((state) => state?.user);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    type: "",
    brandName: "",
    price: "",
    countInStock: "",
    description: "",
    discount:"",
    NumberProductsSold:"",
    variations: [],
  });
  const [formCreate] = Form.useForm();
  const [formDetail] = Form.useForm();
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct({limit:1000000});
    console.log('res',res)
    return res;
  };
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  const { isLoading: isLoadingProducts, data: products } = queryProduct;
  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const mutation = useMutationHooks(async (data) => {
    const { name, image, type, brandName, price, countInStock, description,discount, NumberProductsSold } =
      data;
    // console.log('selectedVariations.map(v => v._id)',selectedVariations.map(v => v._id))
    const res = await ProductService.createProduct({
      name,
      image,
      type,
      brandName,
      price,
      countInStock,
      description,
      discount,
      NumberProductsSold,
      variations: selectedVariations,
    });
    const productId = res?.data?._id;
    createSKUsForProduct(productId, selectedVariations);
    console.log("res", res);
    return res;
  });
  const onFinish = async () => {
    const result = await mutation.mutate(stateProduct, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };
  const { data, isPending, isSuccess, isError } = mutation;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    onFinish();
    setIsModalOpen(false);
  };
  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      image: "",
      type: "",
      price: "",
      countInStock: "",
      description: "",
      discount:"",
      NumberProductsSold:"",
      variations: [],
    });
    setTypeProduct("");
    setSelectedVariations([]);
    formCreate.resetFields();
    setSelectedRowKeys([]);
    setRowSelected('');
  }, [formCreate]);
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError, data?.status, handleCancel]);
  // Import dữ liệu vào table
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  // Hàm xử lý search
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Hàm xử lý filter theo loại sản phẩm
  const handleTypeFilter = (value) => {
    setTypeFilter(value);
  };

  // Hàm xử lý filter theo thương hiệu
  const handleBrandFilter = (value) => {
    setBrandFilter(value);
  };

  // Lọc sản phẩm dựa trên search và filter
  const filteredProducts = products?.data?.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    const matchType = !typeFilter || product.type === typeFilter;
    const matchBrand = !brandFilter || product.brandName === brandFilter;
    return matchSearch && matchType && matchBrand;
  });

  // Định nghĩa columns mới với width cố định
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 200,
      fixed: true,
      ellipsis: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "type",
      key: "type",
      width: 150,
      fixed: true,
      ellipsis: true,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brandName",
      key: "brandName",
      width: 150,
      fixed: true,
      ellipsis: true,
    },
    {
      title: "Số lượt bán",
      dataIndex: "NumberProductsSold",
      key: "NumberProductsSold",
      width: 150,
      fixed: true,
      ellipsis: true,
      sorter: (a, b) => a.NumberProductsSold - b.NumberProductsSold,
    },
    {
      title: "Giảm giá(%)",
      dataIndex: "discount",
      key: "discount",
      width: 130,
      fixed: true,
      ellipsis: true,
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 120,
      fixed: true,
      ellipsis: true,
      render: (text) => formatCurrency(text),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 140,
      fixed: true,
      ellipsis: true,
      render: (_, record) => renderAction(record),
    },
  ];

  const renderAction = (record) => {
    return (
      <div>
        <DeleteOutlined
          style={{
            cursor: "pointer",
            color: "red",
            fontSize: "20px",
            margin: "8px",
          }}
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện lan ra hàng cha
            setRowSelected(record._id);
            setIsModalDeleteOpen(true);
          }}
        />
        <EditOutlined
          style={{
            cursor: "pointer",
            color: "#898950",
            fontSize: "20px",
            margin: "8px",
          }}
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện lan ra hàng cha
            setRowSelected(record._id);
            handleDetailsProduct();
          }}
        />
        <span
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện lan ra hàng cha
            handleSku(record._id);
          }}
          style={{ cursor: "pointer", fontWeight: "600" }}
        >
          SKU
        </span>
      </div>
    );
  };
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "Đ";
  };
  const dataProduct = products?.data?.map((product) => {
    return { ...product, key: product._id };
  });
  const [typeProduct, setTypeProduct] = useState("");
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res.data;
  };

  const typeProducts = useQuery({
    queryKey: ["typeProducts"],
    queryFn: fetchAllTypeProduct,
  });

  //Update
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    description: "",
    NumberProductsSold:"",
    discount:"",
    variations: [],
  });
  const fetchGetDetailsProduct = useCallback(async () => {
    console.log("rowSelected", rowSelected);
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        image: res?.data?.image,
        type: res?.data?.type,
        price: res?.data?.price,
        countInStock: res?.data?.countInStock,
        description: res?.data?.description,
        variations: res?.data?.variations,
        NumberProductsSold:res?.data?.NumberProductsSold,
        discount:res?.data?.discount
      });
    }
    setIsLoadingUpdate(false);
  }, [rowSelected]);
  useEffect(() => {
    console.log("stateProductDetails", stateProductDetails);
    setSelectedVariations(stateProductDetails?.variations);
    formDetail.setFieldsValue(stateProductDetails);
  }, [formDetail, stateProductDetails]);
  useEffect(() => {
    if (rowSelected) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, fetchGetDetailsProduct]);

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };
  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeImageDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };
  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        rowSelected,
        token: user?.access_Token,
        ...stateProductDetails,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
    setIsOpenDrawer(false);
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      image: "",
      type: "",
      price: "",
      countInStock: "",
      description: "",
      NumberProductsSold:"",
      discount:"",
      variations: [],
    });
    formCreate.resetFields();
  };

  const mutationUpdate = useMutationHooks(async(data) => {
    const { rowSelected, token, ...stateProductDetails } = data;
    console.log("state", stateProductDetails);
    const res = await ProductService.updateProduct(rowSelected, token, {
      name: stateProductDetails?.name,
      image: stateProductDetails?.image,
      type: stateProductDetails?.type,
      price: stateProductDetails?.price,
      countInStock: stateProductDetails?.countInStock,
      description: stateProductDetails?.description,
      variations: selectedNewVariations,
      NumberProductsSold:stateProductDetails?.NumberProductsSold,
      discount:stateProductDetails?.discount
    });
    console.log('res update',res)
    const productId = res?.data?._id;
    if(selectedNewVariations.length>0&&selectedNewVariations!==selectedVariations){
      await SkuService.deleteSkuByIdProduct(productId,user?.access_Token)
      createSKUsForProduct(productId, selectedNewVariations);
    }
   
    return res;
  });
  const {
    data: dataUpdated,
    // isPending: isPendingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success("Cập nhật sản phẩm thành công");
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error("Cập nhật sản phẩm thất bại");
    }
  }, [isSuccessUpdated, isErrorUpdated, dataUpdated?.status]);
  //Delete Product
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false);
  };

  // useEffect(()=>{
  //   if(isSuccessDeleted&&dataDeleted?.status==='OK'){
  //     message.success('Xóa sản phẩm thành công')
  //     handleCancelDelete();
  //   }else if(isErrorDeleted){
  //     message.error('Xóa sản phẩm thất bại')
  //   }
  // })
  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });

  const handleDeleteProduct = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_Token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success("Xóa sản phẩm thành công");
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error("Xóa sản phẩm thất bại");
    }
  };
  const {
    data: dataDeleted,
    isPending: isPendingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;

  //Delete Many
  const mutationDeleteMany = useMutationHooks((dataProduct) => {
    const { ids, token } = dataProduct;
    const res = ProductService.deleteManyProduct(ids, token);
    return res;
  });
  const handleDeleteManyProducts = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids, token: user?.access_Token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
    setSelectedRowKeys([]); // Reset selected rows sau khi xóa
    setRowSelected('');
  };
  const {
    data: dataDeletedMany,
    // isPending: isPendingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeleteMany;
  //Variation Product
  const [variations, setVariations] = useState([]);
  const [selectedVariations, setSelectedVariations] = useState([]);
  const [selectedNewVariations, setSelectedNewVariations] = useState([]);
  // Fetch các variation có sẵn từ server khi load component
  useEffect(() => {
    const fetchVariations = async () => {
      try {
        const response = await axios.get("/api/variations/getAll");
        setVariations(response.data);
      } catch (error) {
        console.error("Lỗi khi tải variations:", error);
      }
    };
    fetchVariations();
  }, []);

  const handleAddVariation = (variation) => {
    setSelectedVariations([...selectedVariations, variation]);
  };
  const handleAddDetailsVariation = (variation) => {
    setSelectedNewVariations([...selectedNewVariations, variation]);
  };

  // const handleCreateProduct = async () => {
  //   const newProduct = {
  //     name: 'Tên Sản Phẩm', // các thuộc tính khác của sản phẩm
  //     variations: selectedVariations.map(v => v._id), // chỉ gửi ID của các variation
  //   };

  //   try {
  //     await axios.post('/api/products', newProduct);
  //     alert('Sản phẩm đã được tạo thành công!');
  //     setSelectedVariations([]);
  //   } catch (error) {
  //     console.error('Lỗi khi tạo sản phẩm:', error);
  //   }
  // };

  //Component-Type
  const handleChangeType = (value) => {
    setTypeProduct(value);
    if (value !== "add-type") {
      setStateProduct({
        ...stateProduct,
        type: value,
      });
    }
    // console.log(`selected ${value}`);
  };
  // useEffect(()=>{
  //   handleChangeType(typeProduct)
  // },[typeProduct])
  //SKU
  const [isOpenSkuDrawer, setIsOpenSkuDrawer] = useState(false);
  const [idForSKU, setIdForSKU] = useState('');
  const handleSku = (productId) => {
    setIdForSKU(productId)
    setIsOpenSkuDrawer(true);
  };
  const getCombinations = (options) => {
    // Kiểm tra xem options có phải là mảng hay không
    if (!Array.isArray(options) || options.length === 0) return [[]];

    const result = [];
    const firstOption = options[0]; // Lấy tùy chọn đầu tiên

    // Kiểm tra xem firstOption có phải là mảng không
    if (!Array.isArray(firstOption)) {
      throw new Error("Each option in `options` should be an array");
    }

    const restCombinations = getCombinations(options.slice(1)); // Đệ quy với phần còn lại

    for (const option of firstOption) {
      for (const combination of restCombinations) {
        result.push([option, ...combination]);
      }
    }

    return result;
  };

  const createSKUsForProduct = async (productId, variations) => {
    // Tạo danh sách các tùy chọn
    const optionGroups = variations?.map((variation) =>
      variation.options.map((option) => option.value)
    ); // Lấy giá trị của mỗi option

    // Lấy tất cả các kết hợp của các tùy chọn
    const combinations = getCombinations(optionGroups);
    console.log("Combinations:", combinations);

    // Tạo SKU cho mỗi kết hợp
    for (const combination of combinations) {
      const skuData = {
        skuStock: 10,
        skuImg: stateProduct?.image,
        skuVariations: combination.map((value, index) => {
          return {
            variationId: variations[index]._id, // ID của variation tương ứng
            optionValue: value, // Giá trị của option
          };
        }),
        productId: productId,
      };

      await SkuService.createSku(skuData);
      console.log("SKU created:", skuData);
    }

    console.log("All SKUs created successfully");
  };
  // useEffect(() => {
  //   const getSKUs = async () => {
  //       const fetchedSKUs = await fetchProductSKUs(rowSelected);
  //       console.log('fetchedSKUs',fetchedSKUs)
  //       setSkus(fetchedSKUs);
  //   };

  //   getSKUs();
  // }, [rowSelected]);
  //Giao Dien

  // Thêm hàm lấy danh sách thương hiệu unique
  const getBrandList = () => {
    const brands = products?.data?.map(product => product.brandName) || [];
    return [...new Set(brands)];
  };

  // Thêm state để quản lý các row được chọn
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Thêm hàm xử lý khi row được chọn
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Cấu hình rowSelection
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      TableComponent.SELECTION_ALL,
      TableComponent.SELECTION_INVERT,
      TableComponent.SELECTION_NONE,
    ],
  };

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      message.success("Xóa sản phẩm thành công");
      handleCancelDelete();
    } else if (isErrorDeletedMany) {
      message.error("Xóa sản phẩm thất bại");
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany, dataDeletedMany?.status]);

  return (
    <LoadingComponent isLoading={isLoadingProducts}>
      <div>
        <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
        <div style={{ marginTop: "10px" }}>
          <Button
            onClick={showModal}
            style={{
              height: "150px",
              width: "150px",
              borderRadius: "6px",
              borderStyle: "dashed",
            }}
          >
            <PlusCircleFilled style={{ fontSize: "60px" }} />
          </Button>
        </div>
        
        {/* Thanh công cụ với Search, Filter và nút Xóa tất cả */}
        <Space style={{ marginTop: 16, marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <Input.Search
              placeholder="Tìm kiếm theo tên sản phẩm"
              allowClear
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
            
            <Select
              style={{ width: 200 }}
              placeholder="Lọc theo loại sản phẩm"
              allowClear
              onChange={handleTypeFilter}
            >
              {typeProducts?.data?.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>

            <Select
              style={{ width: 200 }}
              placeholder="Lọc theo thương hiệu"
              allowClear
              onChange={handleBrandFilter}
            >
              {getBrandList().map((brand) => (
                <Select.Option key={brand} value={brand}>
                  {brand}
                </Select.Option>
              ))}
            </Select>
          </Space>

          {/* Nút Xóa tất cả với style mới */}
          {selectedRowKeys.length > 0 && (
            <Button
              danger
              icon={<DeleteOutlined />}
              style={{
                fontWeight: '500'
              }}
              onClick={() => handleDeleteManyProducts(selectedRowKeys)}
            >
              Xóa ({selectedRowKeys.length})
            </Button>
          )}
        </Space>

        <div style={{ marginTop: "10px" }}>
          <TableComponent
            columns={columns}
            data={filteredProducts}
            handleDeleteMany={handleDeleteManyProducts}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1000 }}
            rowKey={(record) => record._id}
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                setSelectedRowKeys(selectedRowKeys);
                if (selectedRows.length === 1) {
                  setRowSelected(selectedRows[0]._id);
                }
              },
              getCheckboxProps: (record) => ({
                name: record.name,
              }),
            }}
          />
        </div>
        <ModalComponent
          
          width={'1200px'}
          forceRender
          title="Tạo sản phẩm"
          okText=""
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <LoadingComponent isLoading={isPending}>
            <WrapperformCreate
              form={formCreate}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 14,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập tên sản phẩm!",
                  },
                ]}
              >
                <Input
                  onChange={handleOnChange}
                  name="name"
                  value={stateProduct.name}
                />
              </Form.Item>
              <Form.Item
                label="Loại sản phẩm"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập loại sản phẩm!",
                  },
                ]}
              >
                <Select
                  defaultValue=""
                  style={
                    {
                      // width: 120,
                    }
                  }
                  value={
                    typeProduct === "add-type"
                      ? "Thêm Loại sản phẩm mới"
                      : stateProduct.type
                  } //Lỗi: khi chọn thêm sản phẩm mới rồi chọn li sản phẩm c thì vẫn hiện chọn thêm sản phẩm mới
                  onChange={handleChangeType}
                  options={rendeOptions(typeProducts)}
                />
                {typeProduct === "add-type" && (
                  <Input
                    placeholder="Nhập loại sản phẩm mới"
                    onChange={handleOnChange}
                    name="type"
                  />
                )}
              </Form.Item>
              <Form.Item
                label="Thương Hiệu"
                name="brandName"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập thương hiệu sản phẩm!",
                  },
                ]}
              >
                <Input onChange={handleOnChange} name="brandName" />
              </Form.Item>
              <Form.Item
                label="Biến thể"
                name="variations"
                rules={[
                  {
                    // required: true,
                    message: "Xin hãy chọn biến thể sản phẩm!",
                  },
                ]}
              >
                <VariationSelector
                  variations={variations}
                  onAddVariation={handleAddVariation}
                  setVariations={setVariations}
                  selectedVariations={selectedVariations}
                  setSelectedVariations={setSelectedVariations}
                />
                {/* <SelectedVariationsList
                  selectedVariations={selectedVariations}
                /> */}
              </Form.Item>
              <Form.Item
                label="Giá tiền"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập giá sản phẩm!",
                  },
                ]}
              >
                <Input onChange={handleOnChange} name="price" />
              </Form.Item>
              {/* <Form.Item
                label="Số hàng trong kho"
                name="countInStock"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập số sản phẩm có trong kho!",
                  },
                ]}
              >
                <Input onChange={handleOnChange} name="countInStock" />
              </Form.Item> */}
              <Form.Item
                label="Giảm giá (%)"
                name="discount"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập số % giảm cho sản phẩm!",
                  },
                ]}
              >
                <Input onChange={handleOnChange} name="discount" />
              </Form.Item>
              <Form.Item
                label="Số lượt bán"
                name="NumberProductsSold"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập số sản phẩm đã bán!",
                  },
                ]}
              >
                <Input onChange={handleOnChange} name="NumberProductsSold" />
              </Form.Item>
              <Form.Item
                label="mô tả"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập mô t sản phẩm!",
                  },
                ]}
              >
                <Input onChange={handleOnChange} name="description" />
              </Form.Item>
              <Form.Item
                label="Hình ảnh"
                name="image"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn hình ảnh sản phẩm!",
                  },
                ]}
              >
                <WrapperUploadFile maxCount={1} onChange={handleOnChangeImage}>
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                  {stateProduct?.image && (
                    <WrapperImagePreview>
                      <img
                        src={stateProduct.image}
                        style={{
                          height: "120px",
                          width: "120px",
                          objectFit: "cover",
                        }}
                        alt="preview"
                      />
                    </WrapperImagePreview>
                  )}
                </WrapperUploadFile>
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              ></Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </WrapperformCreate>
          </LoadingComponent>
        </ModalComponent>
        <DrawerComponnent
          title="Chi tiết sản phẩm"
          isOpen={isOpenDrawer}
          onClose={() => {
            setIsOpenDrawer(false);
            // setSelectedVariations([]);
            setSelectedNewVariations([]);
            setRowSelected('')
          }}
        >
          <LoadingComponent isLoading={isLoadingUpdate}>
            <Form
              form={formDetail}
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              style={{
                maxWidth: "80%",
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onUpdateProduct}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập tên sản phẩm!",
                  },
                ]}
              >
                <Input
                  onChange={handleOnChangeDetails}
                  name="name"
                  value={stateProductDetails.name}
                />
              </Form.Item>
              <Form.Item
                label="Loại sản phẩm"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập loại sản phẩm!",
                  },
                ]}
              >
                <Input
                  onChange={handleOnChangeDetails}
                  value={stateProductDetails.type}
                  name="type"
                />
              </Form.Item>
              <Form.Item
                label="Biến thể"
                name="variations"
                // rules={[
                //   {
                //     // required: true,
                //     message: "Xin hãy chọn biến thể!",
                //   },
                // ]}
              >
                <VariationSelector
                  variations={variations}
                  onAddVariation={handleAddDetailsVariation}
                  setVariations={setVariations}
                />
                <SelectedVariationsList
                  selectedVariations={selectedVariations}
                />
                <SelectedVariationsList
                  newSelect={true}
                  selectedVariations={selectedNewVariations}
                />
              </Form.Item>
              <Form.Item
                label="Giá tiền"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập giá sản phẩm!",
                  },
                ]}
              >
                <Input
                  onChange={handleOnChangeDetails}
                  value={stateProductDetails.price}
                  name="price"
                />
              </Form.Item>
              <Form.Item
                label="Số hàng trong kho"
                name="countInStock"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập lượng hàng trong kho!",
                  },
                ]}
              >
                <Input
                  onChange={handleOnChangeDetails}
                  value={stateProductDetails.countInStock}
                  name="countInStock"
                />
              </Form.Item>
              <Form.Item
                label="Số lượt bán"
                name="NumberProductsSold"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập lượng hàng trong kho!",
                  },
                ]}
              >
                <Input
                  onChange={handleOnChangeDetails}
                  value={stateProductDetails.NumberProductsSold}
                  name="NumberProductsSold"
                />
              </Form.Item>
              <Form.Item
                label="Giảm giá (%)"
                name="discount"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập lượng hàng trong kho!",
                  },
                ]}
              >
                <Input
                  onChange={handleOnChangeDetails}
                  value={stateProductDetails.discount}
                  name="discount"
                />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập mô tả!",
                  },
                ]}
              >
                <Input
                  onChange={handleOnChangeDetails}
                  value={stateProductDetails.description}
                  name="description"
                />
              </Form.Item>
              <Form.Item
                label="Hình ảnh"
                name="image"
                value={stateProductDetails.image}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn hình ảnh!",
                  },
                ]}
              >
                <WrapperUploadFile
                  maxCount={1}
                  onChange={handleOnChangeImageDetails}
                >
                  <Button icon={<UploadOutlined />}>Select File</Button>
                  {stateProductDetails.image && (
                    <img
                      src={stateProductDetails.image}
                      style={{
                        marginLeft: "24px",
                        height: "120px",
                        width: "120px",
                        borderRadius: "4%",
                        objectFit: "cover",
                      }}
                      alt="avatar"
                    />
                  )}
                </WrapperUploadFile>
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              ></Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Apply
                </Button>
              </Form.Item>
            </Form>
          </LoadingComponent>
        </DrawerComponnent>
        <ModalComponent
          title="Xóa sản phẩm"
          open={isModalDeleteOpen}
          onOk={handleDeleteProduct}
          onCancel={handleCancelDelete}
        >
          <LoadingComponent isLoading={isPendingDeleted}>
            <div>Bạn có chắc muốn xóa sản phẩm</div>
          </LoadingComponent>
        </ModalComponent>
        <DrawerComponnent
          title="Biến thể của sản phẩm"
          // SkuData={skus}
          isOpen={isOpenSkuDrawer}
          onClose={() => {
            setIsOpenSkuDrawer(false);
          }}
        >
          <SkuComponent productId={idForSKU} />
        </DrawerComponnent>
      </div>
    </LoadingComponent>
  );
}

export default AdminProductComponent;
