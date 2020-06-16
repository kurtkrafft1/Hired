import React, {useState, useEffect} from 'react'
import JM from "../../modules/jobsManager"
import EPM from "../../modules/employeeProfileManager"

const ResultCard = props => {
    const [numJobs, setNumJobs] = useState(0)
    const token = sessionStorage.getItem('token')


    useEffect(()=> {
        JM.getJobsByEmployeeProfile(props.profile.id).then(arr=> {
            const filtered = arr.filter(obj=> obj.end_date !== null)
            setNumJobs(filtered.length)
        })
    })

    return (
        <>
       
    <div className="card">
    <div className="image">
      <img src="https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg" />
    </div>
    <div className="content">
      <div className="header">{props.profile.title}</div>    
      <div className="meta">
        <a>Friends</a>
      </div>
      <div className="description">
        {props.profile.description}
      </div>
    </div>
    <div className="extra content split">
      <span>
        <i className="check icon"></i>
        {numJobs} Jobs
      </span>
      <span className="edit-icon">
        
      </span>
    </div>
    </div>

        </>
    )
}
export default ResultCard