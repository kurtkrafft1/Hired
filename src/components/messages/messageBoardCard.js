import React, {useEffect, useState} from 'react'
// import MM from "../../modules/messagesManager"
import checkIsSeen from "./checkSeen"
import JM from "../../modules/jobsManager"
import dateFunction from '../dateFunction'


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
    //the user is getting hired by the other user
    if(Number(props.user_id) === Number(job.employee_profile.customer.user.id)){
        return (
            <>
            <div className="card vCard" onClick={()=> {props.checkIsSeen(props.user_id, job.id);props.setJobId(job.id)}}>
                <div className="content">
                <div className="header flex-it">{job.customer.user.first_name} {job.customer.user.last_name[0]}.
                <h5 className='message-status'>Seeking You</h5></div>
                    <div className="meta">{job.employee_profile.title}</div>
                <div className="description add-bottom">
                    {props.message.content}
                    <br></br>
                    
                </div>
             
        {props.message.receiver_customer.user.id === Number(props.user_id)&& props.message.seen === false? (<div className="newMessage"><h3 className="add-shine">New!</h3></div>) : ("")}
        <div className="meta">{dateFunction(props.message.created_at)}</div>
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
            <div className="card mCard" onClick={()=>{props.checkIsSeen(props.user_id, job.id);props.setJobId(job.id)}}>
                <div className="content">
                <div className="header">{job.employee_profile.customer.user.first_name} {job.employee_profile.customer.user.last_name[0]}.
                <h5 className='message-status'>{status==="current"? ("Employed"): status==="past"? ("Was Employed"): status==="hire"? ("Potential Employee"): ("")}</h5></div>
                    <div className="meta">{job.employee_profile.title}</div>
                <div className="description">
                    {props.message.content}
                </div>
                {props.message.receiver_customer.user.id === Number(props.user_id)&& props.message.seen === false? (<div className="newMessage"><h3>New!</h3></div>) : ("")}
                <div className="meta">{dateFunction(props.message.created_at)}</div>
                </div>
            </div>
            </>
        )

    }
}
}
export default MessageBoardCard