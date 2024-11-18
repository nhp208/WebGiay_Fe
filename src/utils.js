export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};
export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export const rendeOptions = (arr) => {

    let result = [];

    if (arr?.data) {
      result = arr.data.map((opt) => ({
        label: opt,
        value: opt,
      }))
    };
    result.push({
        label:"Thêm loại sản phẩm mới",
        value:'add-type'
    })
    return result;
  
};
