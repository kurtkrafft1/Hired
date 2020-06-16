import React, {useEffect, useState} from 'react'
import JM from "../../modules/jobsManager"

const MessageBoardCard = props => {
    const [job, setJob] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [status, setStatus] = useState("")

    

    useEffect(()=> {
        JM.getOneJob(props.message.job_id).then(obj=> 
            {
                setJob(obj)
                //the user is looking to hire this messenger
                if(obj.customer.user.id === props.user_id){
                    setStatus('potential')
                }
                //the user is getting hired
                if(obj.customer.user.id !== props.user_id){
                    //current employee
                    if(obj.end_date===null && obj.start_date !== null){
                        setStatus('current')
                    }
                    //past employee
                    if(obj.end_date !== null){
                        setStatus('past')
                    }
                    //potential employee
                    if(obj.end_date === null && obj.start_date === null){
                        setStatus('hire')
                    }
                }
                setIsLoading(false)
            })

    }, [])
    
    if(isLoading){
        return (
            <>
            <div className="loader-container"><div className="loader"></div></div>
            </>
        )
    }else {
    //the user is receiving the message so the customer will be the name shown
    if(Number(props.user_id) === Number(props.message.receiver_customer.user.id)){
        return (
            <>
            <div class="card vCard">
                <div class="content">
                <div class="header flex-it">{props.message.customer.user.first_name} {props.message.customer.user.last_name[0]}.
                <h5 className='message-status'>{status==="current"? ("Employed"): status==="past"? ("Was Employed"): status==="hire"? ("Potential Employee"): ("")}</h5></div>
                    <div class="meta">{job.employee_profile.title}</div>
                <div class="description add-bottom">
                    {props.message.content}
                    <br></br>
                    
                </div>
             
                    
            
                </div>
            </div>
            </>
        )

    }
    //the user originally sent the messages so the receiver customer will be the name shown
    //nothing with status state
    else {
        return (
            <>
            <div class="card mCard">
                <div class="content">
                <div class="header">{props.message.receiver_customer.user.first_name} {props.message.receiver_customer.user.last_name[0]}.</div>
                    <div class="meta">{job.employee_profile.title}</div>
                <div class="description">
                    {props.message.content}
                </div>
                </div>
            </div>
            </>
        )

    }
}
}
export default MessageBoardCard