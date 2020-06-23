import React, {useState, useEffect} from 'react'
import "./dashboard.css"
import UM from "../../modules/userManager"
import EPM from "../../modules/employeeProfileManager"
import MM from "../../modules/messagesManager"
import JM from "../../modules/jobsManager"
import ReviewModal from "../reviewModal"



const Dashboard = props => {

    const [customer, setCustomer] = useState({user: {first_name:"", last_name: ""}})
    const [employeeProfiles, setEmployeeProfiles] = useState([])
    const [currentEmployee, setCurrentEmployee] = useState({})
    const [numberMessages, setNumberMessages] = useState(0)
    const [mostRecentJob, setMostRecentJob] = useState( {id: "",
    employee_profile: {id: "",job_type_id: "",
            customer: {id: "",user: {id: "",first_name: "",last_name: ""},address: "",phone_number: "",zipcode: "",city: ""},
            title: "",
            description: "",
            ratings: 0},
        customer: {id: "",user: {id: "",first_name: "",last_name: ""},address: "",phone_number: "",zipcode: "",city: ""},
        start_date: "",
        end_date: "",
        review: ""
    })
    const [ potentialEmployers, setPotentialEmployers] = useState([])
    const token = sessionStorage.getItem('token')
    const [reload, setReload] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)

    const toggleReviewModal= (e)=> {
        setReviewModalOpen(!reviewModalOpen)
    }

    useEffect(()=> {
        //get user information through the customer
        UM.getUserInformation(token).then(obj=> {
            setCustomer(obj)
        })
        //get all the employee profiles associated with the user
        EPM.getProfilesForUser(token).then(arr=> {
            setEmployeeProfiles(arr)
        })
        //get potential employers for User 
        JM.getJobsByUser(token).then(arr=> {
            const newArr = arr.filter(obj=> obj.start_date===null && obj.end_date===null)
            setPotentialEmployers(newArr)
        })
        //get the jobs with the user and then set the most recent one to the state
        JM.getJobsForUser(token).then(arr=> {
            if(arr.length <1){
                setMostRecentJob(mostRecentJob)
            }else {
                setMostRecentJob(arr[0])
                const filtered = arr.filter(obj=> obj.start_date !== null && obj.end_date === null)
                if(filtered.length>0){
                    setCurrentEmployee(filtered[0])
                }
                
            }
            //tell the page "hey page we are done loading"
        })
        MM.getNewMessages(token).then(arr=> setNumberMessages(arr.length))
        .then(()=> setIsLoading(false))
    }, [reload])
    if(isLoading){
        return (
            <>
            <div className="loader-container"><div className="loader"></div></div>
            </>
        )
    }
    else {
        return (
            <>
            <div className="home" >
            
            <div className="alert-holder">
                
        {numberMessages>0? (<div className="job-holder message-holder change-cursor" onClick={()=>props.history.push('/messages')}><h1>You have {numberMessages} new  message{numberMessages>1? ("s"): ""}!</h1></div>) : (<div className="job-holder"><h1>No new messages</h1></div>)}
                <div className="job-holder">{currentEmployee.end_date=== null && currentEmployee.start_date !== null ? (<h1>{currentEmployee.employee_profile.customer.user.first_name} {currentEmployee.employee_profile.customer.user.last_name[0]}. is currently helping you out!</h1>) :
            (<h1 className="center-text">No current employees</h1>)}</div>
                {/* This text below me is confusing so I am sorry dear code reader. Essentially, I am checking to see if the mostRecent Job has a review and if the end date isnt
                null. If those are true it means the user has had a recent job and hasn't left a review so we will give them the option to do that. Then we check to see if the end date is equal
                to  "" because that means we set most recent job equal to itself so if that is true that haven't had any jobs, other than that we assume that they have left reviews. there  may 
                be more conditionals to come so look out. */}
        {mostRecentJob.end_date !== "" && mostRecentJob.review ==="" && mostRecentJob.end_date !== null ?
         (<ReviewModal reload={reload} setReload={setReload} toggleReviewModal={toggleReviewModal} mostRecentJob={mostRecentJob} reviewModalOpen={reviewModalOpen} job_id={mostRecentJob.id} {...props}/>): 
         mostRecentJob.end_date === "" ?(<div className="job-holder"><h1>You haven't had any jobs. You must be a busy bee!</h1></div>) : (<div className="job-holder"><h1>Thank for being a reviewing superstar!</h1></div>)}
            </div>
            <div className="profile-holder">
                <div className="name-n-img">
                    <div className="img-thumbnail"><img src={customer.profile_picture !== null? customer.profile_picture : "https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg"} alt="prof-pic" className="prof-pic-icon"/></div>
                    <div className="name-holder"><h2 className="your-name">{customer.user.first_name} {customer.user.last_name}</h2></div>
                </div>
                <h3 className="profile-header">Your Profiles</h3>
                <div className="job-list-holder">
                    <ul>
                        {employeeProfiles.length>0? employeeProfiles.map(obj=> (
                            <li key={obj.id}>{obj.title}</li>    
                        )) : <h5 classNane="grey">Create your Employee profiles in the profiles section to see them listed here!</h5>}
                    </ul>
                </div>
                <h3 className="profile-header">Potential Employers</h3>
                <div className="job-list-holder">
                    <ul>
                        {potentialEmployers.map(obj=> (
                            <li key={obj.id}>{obj.customer.user.first_name} {obj.customer.user.last_name[0]}. -- Seeking {obj.employee_profile.title}</li>    
                        ))}
                    </ul>
                </div>
            </div>
            
            </div>
            </>
        )
    }

  
}
export default Dashboard