import React, {useState, useEffect} from 'react'
import JM from "../../modules/jobsManager"
import MessageModal from "./messageModal"
import EPM from "../../modules/employeeProfileManager"

const ResultCard = props => {
    const [numJobs, setNumJobs] = useState(0)
    const [messageModalOpen, setMessageModalOpen] = useState(false)
    const token = sessionStorage.getItem('token')

    const toggleMessageModal = e=> {
      setMessageModalOpen(!messageModalOpen)
    }
    const getStars = num => {
      if(num===0){
        return (<span>N/A</span>)
      }
      if (num === 1){
        return (
          <>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          </>
        )
      }
      if (num === 2){
        return (
          <>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          </>
        )
      }
      if (num === 3){
        return (
          <>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          </>
        )
      }
      if (num === 4){
        return (
          <>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          </>
        )
      }
      if (num === 5){
        return (
          <>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          </>
        )
      }
    }


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
        Located: {props.profile.customer.city}
      </div>
      <div className="meta">
        Ratings: {getStars(props.profile.ratings)}
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
      <MessageModal toggleMessageModal={toggleMessageModal} messageModalOpen={messageModalOpen} employee_profile_id={props.profile.id} {...props}/>
      </span>
    </div>
    </div>

        </>
    )
}
export default ResultCard