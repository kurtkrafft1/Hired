import baseUrl from "./baseurl"

export default{
    getProfilesForUser(id){
        return fetch(`${baseUrl}employee_profiles?user_id=${id}`
        ).then(r=>r.json())
    }
}