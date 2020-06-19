import React, {useState, useEffect} from 'react'
import JM from "../../modules/jobsManager"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EPM from "../../modules/employeeProfileManager"

const ProfileCard = props => {
    const [numJobs, setNumJobs] = useState(0)
    const token = sessionStorage.getItem('token')

    const confirmDelete= () => {
        confirmAlert({
            title: 'Really?',
            message: 'Are you sure you want to delete this profile?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => EPM.deleteProfile(token, props.up.id).then(()=> props.setReload(!props.reload))
              },
              {
                label: 'No',
                onClick: () => ""
              }
            ]
          });
    }

    useEffect(()=> {
        JM.getJobsByEmployeeProfile(props.up.id).then(arr=> {
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
      <div className="header">{props.up.title}</div>    
      <div className="meta">
        <a>Rate: {props.up.pay}</a>
      </div>
      <div className="description">
        {props.up.description}
      </div>
    </div>
    <div className="extra content split">
      <span>
        <i className="check icon"></i>
        {numJobs} Jobs
      </span>
      <span className="edit-icon">
        <i className="edit icon" onClick={()=> props.history.push(`/profiles/edit/${props.up.id}`)}></i>
        <i className="trash alternate icon" onClick={()=> confirmDelete()}></i>
      </span>
    </div>
    </div>

        </>
    )
}
export default ProfileCard