import React, {useState, useEffect} from 'react'
import EPM from "../../modules/employeeProfileManager"
import "./profiles.css"
import ProfileCard from "./profilecard"

const UserProfiles = props => {

    const [userProfiles, setUserProfiles] = useState([])
    const user_id = sessionStorage.getItem('user_id')
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(true)

    useEffect(()=> {
        EPM.getProfilesForUser(user_id).then(arr=> {
            setUserProfiles(arr)
            setIsLoading(false)
        })
    },[reload])


    if(isLoading){
        return (
            <>
            <div className="loader-container"><div className="loader"></div></div>
            </>
        )
    } else {
        return (
            <>
            <div className="title profiles-header"><h1>Your Profiles</h1><i className="plus small icon" onClick={()=> props.history.push('/profiles/new')}></i></div>
            <div className="profile-card-holder">
            <div className="ui link cards">
            {userProfiles.map(up=> (
                <ProfileCard key={up.id} up={up} setReload={setReload} reload={reload} {...props}/>
            ))}
            </div>
            </div>
            </>
        )

    }
  
}
export default UserProfiles