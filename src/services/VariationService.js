import axios from "axios"
export const axiosJWT = axios.create()
export const getVariation = async(id)=>{
    const res= await axios.get(`${process.env.REACT_APP_API_URL}/variations/get/${id}`)
    return res.data
}
export const getAllVariations = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/variations/getAll`);
    return res.data;
};

export const createVariation = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/variations/create`, data);
    return res.data;
};

export const updateVariation = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/variations/update/${id}`, data);
    return res.data;
};

export const toggleVariationStatus = async (id) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_URL}/variations/toggle/${id}`);
    return res.data;
};

export const checkVariationUsage = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/variation/${id}/check-usage`);
    return res.data;
};

export const softDeleteVariation = async (id) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/variations/soft-delete/${id}`);
    return res.data;
};

export const getAllVariationAvailable = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/variations/get-all-available`);
        return res.data;
    } catch (error) {
        console.error('Error in getAllVariationAvailable:', error);
        throw error;
    }
};