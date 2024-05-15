import request from './request';


export const getDepartments = function() {
    return request.get('http://localhost:8080/national/allDepartments');
}

export const getBureauByDepartment = function(id:any) {
    return request.get(`http://localhost:8080/national/bureau`, {
        params:{
            departmentid:id
        }});
}

export const getJobsByInfo = function(info:any) {
    return request.get('http://localhost:8080/national/jobs',{
        params: {
            ...info
        }
    });
}


export const followJob = function(record:any) {
    return request.post(`http://localhost:8080/national/job/updatefollow`,{
        params:{
            departmentid: record?.departmentid,
            id: record?.id
        }
    }
    );
}


export const deleteFollowJob = function(record:any) {
    return request.get(`http://localhost:8080/national/job/deletefollow`,{
        params:{
            departmentid: record?.departmentid,
            id: record?.id
        }
    })
}

export const getFollowByInfo = function(info:any) {
    return request.get('http://localhost:8080/national/job/follow',{
        params: {
            ...info
        }
    });
}

export const getCountByBureau = function(info:any) {
    return request.get(`http://localhost:8080/national/bureau/count`, {
        params:{
            ...info
        }
    });
}