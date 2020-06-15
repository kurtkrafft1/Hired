import React, {useState, useEffect} from 'react'
import EPM from "../../modules/employeeProfileManager"
import "./profiles.css"
import ProfileCard from "./profilecard"

const UserProfiles = props => {

    const [userProfiles, setUserProfiles] = useState([])
    const user_id = sessionStorage.getItem('user_id')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        EPM.getProfilesForUser(user_id).then(arr=> {
            setUserProfiles(arr)
            console.log(arr)
            setIsLoading(false)
        })
    },[])


    if(isLoading){
        return (
            <>
            <div className="loader-container"><div class="loader"></div></div>
            </>
        )
    } else {
        return (
            <>
            <div className="profiles-header"><h1>Your Profiles</h1></div>
            <div className="profile-card-holder">
            <div class="ui link cards">
            {userProfiles.map(up=> (
                <ProfileCard key={up.id} up={up} />
            ))}
            </div>
            </div>
            </>
        )

    }
  
}
export default UserProfiles