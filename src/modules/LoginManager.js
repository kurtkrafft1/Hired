import baseUrl from "./baseurl"

export default {
    loginUser(obj){
        return fetch(`${baseUrl}login`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accepted": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(r=> r.json())
    }
}