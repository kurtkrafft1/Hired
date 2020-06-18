import baseUrl from "./baseurl"

export default {
    checkRatings(token, epId){
        return fetch(`${baseUrl}ratings?employee_profile_id=${epId}`,{
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `Token ${token}`
            }
        }).then(r=>r.json())
    },
    postNewRating(token, obj){
        return fetch(`${baseUrl}ratings`,{
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    }
}