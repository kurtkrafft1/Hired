import baseUrl from "./baseurl"

export default {
    getJobsForUser(id){
        return fetch(`${baseUrl}jobs?user_id=${id}`).then(r=>r.json())
    },
    getJobsByEmployeeProfile(id){
        return fetch (`${baseUrl}jobs?employee_profile=${id}`).then(r=>r.json())
    },
    getJobsByUser(id){
        return fetch(`${baseUrl}jobs?by_user=${id}`).then(r=>r.json())
    },
    getOneJob(id){
        return fetch(`${baseUrl}jobs/${id}`).then(r=>r.json())
    },
    postJob(token, obj){
        return fetch(`${baseUrl}jobs`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    },
    addStartToJob(token, id){
        return fetch (`${baseUrl}jobs/${id}?start`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization" :`Token ${token}`
            }
        })
    },
    addEndToJob(token, id){
        return fetch (`${baseUrl}jobs/${id}?end`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization" :`Token ${token}`
            }
        })
    },
    rehireJob(token, id){
        return fetch (`${baseUrl}jobs/${id}?rehire`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization" :`Token ${token}`
            }
        })
    },
    addReviewToJob(token, obj){
        return fetch (`${baseUrl}jobs/${obj.id}?review`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization" :`Token ${token}`
            },
            body: JSON.stringify(obj)
        })
    },
    postNewRehiredJob(token, obj){
        return fetch (`${baseUrl}jobs?rehire`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization" :`Token ${token}`
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    }
}