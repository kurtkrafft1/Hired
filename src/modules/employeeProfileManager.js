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
    }
}