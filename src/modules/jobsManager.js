import baseUrl from "./baseurl"

export default {
    getJobsForUser(id){
        return fetch(`${baseUrl}jobs?user_id=${id}`).then(r=>r.json())
    },
    getJobsByEmployeeProfile(id){
        return fetch (`${baseUrl}jobs?employee_profile=${id}`).then(r=>r.json())
    }
}