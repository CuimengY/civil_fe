import { InfoCircleOutlined } from "@ant-design/icons"
import request from './request'

export const getUnits = ()=>{
    return request.get('http://localhost:8080/provincial/units')
}

export const getDepartments = (unit:any)=>{
    return request.get('http://localhost:8080/provincial/departments',{
        params: {
            unit:unit
        }
    })
}

export const getJobs = (info:any)=>{
    return request.get('http://localhost:8080/provincial/jobs',{
        params:{
            ...info
        }
    })
}

export const follow = (id:any,isFollow:any)=>{
    return request.get('http://localhost:8080/provincial/follow',{
        params:{
            id:id,
            isFollow:isFollow
        }
    })
}

export const getFollows = (info:any)=>{
    return request.get('http://localhost:8080/provincial/followList',{
        params:{
            ...info
        }
    })
}

export const getCountByDepartment = (info:any)=>{
    return request.get('http://localhost:8080/provincial/departments/count',{
        params:{
            ...info
        }
    })
}