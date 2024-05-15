import { useInternalMessage } from "antd/es/message/useMessage"
import request from './request'
export const getPublicKey = ()=> {
    return request.get('http://127.0.0.1:8080/auth/publicKey',{
    })
}

export const login = (username: any,password: any)=>{
    return request.post('http://localhost:8080/auth/login',{
        params:{
            username:username,
            password:password
        }
    })
}
