import React from 'react'
import "./jobscard.css"
import dateFunction from "../dateFunction"

const JobCard = props => {


    return (
        <div className="card">
    <div className="image">
      <img src="https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg" />
    </div>
    <div className="content">
      <div className="header">{props.job.employee_profile.customer.user.first_name} {props.job.employee_profile.customer.user.last_name[0]}.</div>    
      <div className="header sub">{props.job.employee_profile.title}</div>    
      <div className="meta">
       
      </div>
      <div className="description">
        Start Date: {dateFunction(props.job.start_date)}
      </div>
      <div className="description">
      End Date: {dateFunction(props.job.end_date)}
      </div>
    </div>
    <div className="extra content split">
      <span>
        {props.job.review==="" ? (<a href="#">Wanna leave a review? Click here!</a>) : ("")}
        
      </span>
    </div>
    </div>
    )
}
export default JobCard