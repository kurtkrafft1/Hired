import baseUrl from "./baseurl"

export default{

    getUserInformation(token){
        return fetch(`${baseUrl}customers`, {
            method:"GET",
            headers: {
                'content-type': "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${token}`
            }
        }).then(r=>r.json())
    },
    updateCustomer(token, obj){
        return fetch(`${baseUrl}customers/${obj.id}`, {
            method: "PUT",
            headers: {
                'content-type': "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(obj)
        })
    },
    updateUser(token, obj) {
        return fetch(`${baseUrl}users/${obj.id}`, {
            method: "PUT",
            headers: {
                'content-type': "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(obj)
        })
    }
}
