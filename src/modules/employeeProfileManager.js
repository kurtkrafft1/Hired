import baseUrl from "./baseurl"

export default{
    getProfilesForUser(id){
        return fetch(`${baseUrl}employee_profiles?user_id=${id}`
        ).then(r=>r.json())
    },
    postNewProfile(token, obj){
        return fetch(`${baseUrl}employee_profiles`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Token ${token}`,
                "Accept": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    },
    getOneProfile(id){
        return fetch(`${baseUrl}employee_profiles/${id}`,{
        }).then(r=>r.json())
    },
    editProfile(token, id, obj) {
        return fetch(`${baseUrl}employee_profiles/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(obj)
        })
    },
    deleteProfile(token, id){
        return fetch(`${baseUrl}employee_profiles/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization" : `Token ${token}`
            }
        })
    },
    searchProfilesWithJobTypeId(obj){
        return fetch(`${baseUrl}employee_profiles?search&city=${obj.city}&title=${obj.title}&job_type_id=${obj.job_type_id}`).then(r=>r.json())
    },
    searchProfilesWithOutJobTypeId(obj){
        return fetch(`${baseUrl}employee_profiles?search&city=${obj.city}&title=${obj.title}`).then(r=>r.json())
    }
}