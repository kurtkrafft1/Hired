import React, {useState, useEffect} from 'react'
import "./dashboard.css"
import UM from "../../modules/userManager"
import EPM from "../../modules/employeeProfileManager"
import JM from "../../modules/jobsManager"



const Dashboard = props => {

    const [customer, setCustomer] = useState({user: {first_name:"", last_name: ""}})
    const [employeeProfiles, setEmployeeProfiles] = useState([])
    const [currentEmployee, setCurrentEmployee] = useState({})
    const [mostRecentJob, setMostRecentJob] = useState( {
        id: "",
        employee_profile: {
            id: "",
            job_type_id: "",
            customer: {
                id: "",
                user: {
                    id: "",
                    first_name: "",
                    last_name: ""
                },
                address: "",
                phone_number: "",
                zipcode: "",
                city: ""
            },
            title: "",
            description: "",
            ratings: 0
        },
        customer: {
            id: "",
            user: {
                id: "",
                first_name: "",
                last_name: ""
            },
            address: "",
            phone_number: "",
            zipcode: "",
            city: ""
        },
        start_date: "",
        end_date: "",
        review: ""
    })
    const token = sessionStorage.getItem('token')
    const user_id = sessionStorage.getItem('user_id')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        //get user information through the customer
        UM.getUserInformation(token).then(obj=> {
            setCustomer(obj)
        })
        //get all the employee profiles associated with the user
        EPM.getProfilesForUser(user_id).then(arr=> {
            setEmployeeProfiles(arr)
        })
        //get the jobs with the user and then set the most recent one to the state
        JM.getJobsForUser(user_id).then(arr=> {
            if(arr.length <1){
                setMostRecentJob(mostRecentJob)
            }else {
                setMostRecentJob(arr[0])
                console.log(arr[0])
                const filtered = arr.filter(obj=> obj.start_date !== null && obj.end_date === null)
                if(filtered.length>0){
                    setCurrentEmployee(filtered[0])
                console.log(filtered[0])
                }
                
            }
            //tell the page "hey page we are done loading"
        }).then(()=> setIsLoading(false))
    }, [])
    if(isLoading){
        return (
            <>
            <div className="loader-container"><div class="loader"></div></div>
            </>
        )
    }
    else {
        return (
            <>
            <div className="home" >
            
            <div className="alert-holder">
            <div className="job-holder">{currentEmployee.end_date=== null && currentEmployee.start_date !== null ? (<h1>{currentEmployee.employee_profile.customer.user.first_name} {currentEmployee.employee_profile.customer.user.last_name[0]}. is currently helping you out!</h1>) :
            (<h1 className="center-text">No current employees</h1>)}</div>
                <div className="message-holder"><h1>(1) You have one new  message!</h1></div>
                {/* This text below me is confusing so I am sorry dear code reader. Essentially, I am checking to see if the mostRecent Job has a review and if the end date isnt
                null. If those are true it means the user has had a recent job and hasn't left a review so we will give them the option to do that. Then we check to see if the end date is equal
                to  "" because that means we set most recent job equal to itself so if that is true that haven't had any jobs, other than that we assume that they have left reviews. there  may 
                be more conditionals to come so look out. */}
        <div className="job-holder">{mostRecentJob.end_date !== "" && mostRecentJob.review ==="" && mostRecentJob.end_date !== null ?
         (<h1>{mostRecentJob.employee_profile.customer.user.first_name} {mostRecentJob.employee_profile.customer.user.last_name[0]}. was your most recent worker, leave them a review by clicking here!</h1>): 
         mostRecentJob.end_date === "" ?(<h1>You haven't had any jobs. You must be a busy bee!</h1>) : (<h1>Thank for being a reviewing superstar!</h1>)}</div>
            </div>
            <div className="profile-holder">
                <div className="name-n-img">
                    <div className="img-thumbnail"><img src="https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg" alt="prof-pic" className="prof-pic-icon"/></div>
                    <div className="name-holder"><h1>{customer.user.first_name} {customer.user.last_name}</h1></div>
                </div>
                <h3 className="profile-header">Your Jobs</h3>
                <div className="job-list-holder">
                    <ul>
                        {employeeProfiles.map(obj=> (
                            <li>{obj.title}</li>    
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