import axios from "axios"
export const axiosJWT = axios.create()
export const getVariation = async(id)=>{
    const res= await axios.get(`${process.env.REACT_APP_API_URL}/variations/get/${id}`)
    return res.data
}