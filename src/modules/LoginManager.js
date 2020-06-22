import baseUrl from "./baseurl"

export default {
    loginUser(obj){
        return fetch(`${baseUrl}login/`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(obj)
        }).then(r=> r.json())
    },
    registerUser(obj){
        return fetch(`${baseUrl}register/`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    },
    postCustomerPhoto(token, obj) {
        return fetch(`${baseUrl}customers/${obj.get("id")}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${token}`
            },
            body: obj
        })
    }
}