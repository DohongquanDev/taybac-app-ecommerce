import { useState } from "react";
import { LoginData, LoginResponse,loginAPI} from "../../services/UserAPI/userApiAxios";
interface UserLoginResult{
    login:(data:LoginData) => Promise<void>;
    loading: boolean;
    error: string | null;
    response:LoginResponse | null;
}
export function useLogin(): UserLoginResult{
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<LoginResponse | null>(null);
    const login = async (data: LoginData) =>{
        setLoading(true);
        setError(null);
        try{
            const res = await loginAPI(data);    
            setResponse(res);
            if(!res.message)
                setError(res.message)
        }catch(err){
            setError("Lỗi kết nối hoặc server");
            setResponse(null)
        } finally {
            setLoading(false);
        }
    };
    return {login,loading,error,response}
}