import baseUrl from "./baseurl"

export default {
    getUserMessages(token){
        return fetch(`${baseUrl}messages?get_names`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" : `Token ${token}`
            }
        }).then(r=>r.json())
    },
    getMessagesByJobId(id){
        return fetch(`${baseUrl}messages?by_job=${id}`).then(r=>r.json())
    }
}