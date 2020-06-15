import React, {useState, useEffect} from 'react'
import JM from "../../modules/jobsManager"

const ProfileCard = props => {
    const [numJobs, setNumJobs] = useState(0)

    useEffect(()=> {
        JM.getJobsByEmployeeProfile(props.up.id).then(arr=> {
            const filtered = arr.filter(obj=> obj.end_date !== null)
            setNumJobs(filtered.length)
        })
    })

    return (
        <>
       
    <div class="card">
    <div class="image">
      <img src="https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg" />
    </div>
    <div class="content">
      <div class="header">{props.up.title}</div>    
      <div class="meta">
        <a>Friends</a>
      </div>
      <div class="description">
        {props.up.description}
      </div>
    </div>
    <div class="extra content split">
      <span>
        <i class="check icon"></i>
        {numJobs} Jobs
      </span>
      <span className="edit-icon">
        <i class="edit icon"></i>
      </span>
    </div>
    </div>

        </>
    )
}
export default ProfileCard