import React, {useState} from 'react'
import "./jobscard.css"
import dateFunction from "../dateFunction"
import ReviewModal from "./2reviewModal"

const JobCard = props => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false)


    const toggleReviewModal= (e)=> {
        setReviewModalOpen(!reviewModalOpen)
    }


    return (
        <div className="card">
    <div className="image">
      <img src="https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg" />
    </div>
    <div className="content">
      <div className="header">{props.isYours ? (props.job.customer.user.first_name +" "+ props.job.customer.user.last_name[0]) : ( props.job.employee_profile.customer.user.first_name +" "+ props.job.employee_profile.customer.user.last_name[0])}.</div>    
      <div className="header sub">{props.isYours? ("Hired you as a " + props.job.employee_profile.title): (props.job.employee_profile.title)}</div>    
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
        {props.isYours? (props.job.review!== ""? ("Review: " +props.job.review): ("The employer hasn't left a review yet")) : props.job.review==="" ? (<ReviewModal reload={props.reload} setReload={props.setReload} toggleReviewModal={toggleReviewModal} reviewModalOpen={reviewModalOpen} job_id={props.job.id} {...props}/>) : (`Review: ${props.job.review}`)}
        
      </span>
    </div>
    </div>
    )
}
export default JobCard