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
    }
}
