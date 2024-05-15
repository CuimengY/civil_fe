import request from './request'

export const getPlans = (part:any)=> {
    return request.get('http://localhost:8080/plan/getPlan',{
        params:{
            part:part
        }
    })
}

export const addPlans = (plan:any,part:any)=> {
    return request.post('http://localhost:8080/plan/addPlan',{
        params:{
            plan:plan,
            part:part
        }
    })
}

export const deletePlans = (id:any)=>{
    return request.delete('http://localhost:8080/plan/deletePlan',{
        params:{
            id:id
        }
    })
}

export const updatePlans = (id:any,plan:any,complete:any)=>{
    return request.post('http://localhost:8080/plan/updatePlan',{
        params:{
            id:id,
            plan:plan,
            complete:complete
        }
    })
}

export const getDailyPlans = ()=> {
    return request.get('http://localhost:8080/plan/getDailyPlan')
}

export const getDailyPlanByDate = (date:any)=> {
    return request.get('http://localhost:8080/plan/getDailyPlanByDate',{
        params:{
            date:date
        }
    })
}

export const addDailyPlans = (plan:any,date:any)=> {
    return request.post('http://localhost:8080/plan/addDailyPlan',{
        params:{
            plan:plan,
            date:date
        }
    })
}

export const deleteDailyPlans = (id:any)=>{
    return request.delete('http://localhost:8080/plan/deleteDailyPlan',{
        params:{
            id:id
        }
    })
}

export const updateDailyPlans = (plan:any,id:any,complete:any)=>{
    return request.post('http://localhost:8080/plan/updateDailyPlan',{
        params:{
            plan:plan,
            id:id,
            complete:complete
        }
    })
}
