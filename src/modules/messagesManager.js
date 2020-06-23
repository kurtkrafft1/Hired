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
    },
    postNewMessage(token, obj){
        return fetch(`${baseUrl}messages`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    },
    updateSeen(id){
        return fetch(`${baseUrl}messages/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
    },
    getNewMessages(token){
        return fetch(`${baseUrl}messages?new_messages`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" : `Token ${token}`
            }
        }).then(r=>r.json())
    }
}