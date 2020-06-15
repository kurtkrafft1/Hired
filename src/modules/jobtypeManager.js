import baseUrl from "./baseurl"

export default {
    getAllJobTypes(){
        return fetch(`${baseUrl}job_types`).then(r=> r.json())
    }
}