import React, {useEffect, useState} from 'react'
import MM from "../../modules/messagesManager"
import JM from "../../modules/jobsManager"
import {Button} from "semantic-ui-react"
import MessageCard from "./messageCard"
import { Form } from 'semantic-ui-react'

const MessagesDetails = props => {

    const [messages, setMessages] = useState([])
    const [job, setJob] = useState({
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
        ratings: ""
    },
    customer: {
        id: "",
        user: {
            id: "",
            first_name:"",
            last_name: ""
        },
        address:"",
        phone_number: "",
        zipcode: "",
        city: ""
    },
    start_date:null,
    end_date:null,
    })
    const [isLoading, setIsLoading] =useState(true)
    const [isSender, setIsSender] = useState(false)
    const user_id = sessionStorage.getItem('user_id')
    const [status, setStatus] = useState("")
    const [error, setError] = useState()

    useEffect(()=> {
        setIsLoading(true)
        //get read its a doozy
        //grab all the messages associated with jobId in the url
        MM.getMessagesByJobId(props.jobId).then(arr=> {
            //set the messages here
            arr.reverse()
            setMessages(arr)
            //get the job associated with the messages because the messages will switch between who received and vice versa
            JM.getOneJob(props.jobId).then(j=> {
                //check to be sure the user is associated with the job therefor associated and can view the messages
                if(Number(user_id)=== j.customer.user.id || Number(user_id)===j.employee_profile.customer.user.id){
                    //set the job and the error
                    setError(false)
                    setJob(j)
                    //check to see if the user is the customer or the employee
                    if(j.customer.user.id === Number(user_id)){
                        setIsSender(true)
                    } 
                    else {
                        setIsSender(false)
                    }
                    //check to see if they have been hired or still looking
                    if(j.start_date===null){
                        setStatus('notHired')
                    }
                    if(j.end_date === null && j.start_date !==null ){
                        // check to see if they are currently working
                        setStatus('current')
                    }
                    //check to see if they worked in the past
                    if(j.end_date !== null){
                        setStatus('past')
                    }
                    setIsLoading(false)
                
                }else {
                    setError(true)
                    setIsLoading(false)
                }

            })
        })
    }, [])



  
    if(isLoading){
        return (
            <>
            <div className="loader-container"><div className="loader"></div></div>
            </>
        )
    }else {
        if(error){
            return (<>
            <div className="error-block"><div className="error-holder"> Error</div></div>
            </>)
        }else {
            if(messages.length>0){
            return(
                <>
                <div className="message-details-container">
                    <div className="profile-container">
                        <div className="user_name">{isSender? (<h1>{job.employee_profile.customer.user.first_name} {job.employee_profile.customer.user.last_name[0]}.</h1>) :
                        (<h1>{job.customer.user.first_name} {job.customer.user.last_name[0]}.</h1>) }</div>
                        <div className="location">
                        {isSender? (<h1> {job.employee_profile.customer.city}</h1>) :
                        (<h1>{job.customer.city}</h1>) }
                        </div>
                        <div classNamer="status-button-container">
                            {status ==="employee" ?(""): status !== "current" ? (<Button color={status==="notHired"? ('green') : ('yellow')}>
                                {status==="notHired"? ("Hire") : status==="past"? ("Re-hire"): ("")}</Button>) : ("")}
                        </div>
                    </div>
                    <div className="message-container-back">
                        <div className="messages-holder">
                    {
                        messages.map(message=> (
                            <MessageCard key={message.id} user_id={user_id} message={message} {...props} />
                        ))
                    }
                    </div>
                    <div className="message-form form-style-4 alt">
                    <form>
                    <fieldset>
                    <legend>Send a Message</legend>
                    <input type="text" id="message-sender" name="field1" placeholder="Message here..." />
                    </fieldset>
                    </form>
                        

                    </div>
                    
                    </div>
                </div>
                </>
            )}
            else{
                return (
                    <>
                    <div className="error-block"><div className="error-holder"> Error</div></div>
                    </>
                )
            }
        }
    }
}

export default MessagesDetails





// //check to make sure that there is at least 1 message
// if(arr.length>0){
//     //here we check to see if the current user is associated with the job (prevent users from looking to other peoples messages)
//     if(Number(user_id )=== arr[0].customer.user.id || Number(user_id) === arr[0].receiver_customer.user.id){
//         setError(false)
//         //check to see whether the user sent the message
//         if(arr[0].customer.user.id===Number(user_id)){
//             setIsSender(true)
//             //now we fetch the job associated with the messages so we can display an accurate profile of the other user
//             JM.getOneJob(arr[0].job_id).then(obj=>
//                 {
//                     setJob(obj)
//                     //set up the correct status of the interaction to display the correct button
//                     if(obj.start_date===null){
//                         setStatus('notHired')
//                     }
//                     if(obj.end_date === null && obj.start_date !==null ){
//                         setStatus('current')
//                     }
//                     if(obj.end_date !== null){
//                         setStatus('past')
//                     }
//                     setIsLoading(false)
//                 })
//         } 
//         //or received the message
//         if(arr[0].customer.user.id !== Number(user_id)) {
//             setIsSender(false)
//             //now we fetch the job associated with the messages so we can display an accurate profile of the other user
//             JM.getOneJob(arr[0].job_id).then(obj=>
//                 {
//                     setJob(obj)
//                     setStatus("employee")
//                     setIsLoading(false)
//                 })
//         }    
//     } else {
//         setError(true)
//         setIsLoading(false)
// }

// } else {
//     setIsLoading(false)
// }