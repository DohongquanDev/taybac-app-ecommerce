import axios from "axios";
import { BASE_URL } from "../../routes/config";
import { data } from "react-router-dom";
export interface LoginData{
    email:string;
    password:string;
    rememberMe: boolean;
}
export interface LoginResponse {
    success: boolean;
    message: string;
    token:string;
}
const axiosInstance = axios.create({
    baseURL:BASE_URL
});
export const loginAPI = async(data: LoginData): Promise<LoginResponse> =>{
    const response = await axiosInstance.post("/api/User/login",data);
    return response.data;
}