import React, {useState, useEffect} from 'react'
import MM from "../../modules/messagesManager"
import MessageBoardCard from './messageBoardCard'
import JM from "../../modules/jobsManager"
import {Button} from 'semantic-ui-react'
import MessageCard from "./messageCard"
import "./messages.css"
import { stat } from 'fs'

const MessageBoard = props => {

    const [chains, setChains] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const user_id = sessionStorage.getItem('user_id')
    const token = sessionStorage.getItem('token')
    const [jobId, setJobId] = useState(0)
    const [isFirst, setIsFirst] = useState(true)
    const [messages, setMessages] = useState([])
    const [isSender, setIsSender] = useState(false)
    const [reload, setReload] = useState(true)
    const [content, setContent] = useState({content: ""})
    const [job, setJob] = useState({id: "",employee_profile: {id: "",job_type_id: "",customer: {id: "",user: {id: "",first_name: "",last_name: ""},address: "",phone_number: "", zipcode: "",city: ""},title: "",description: "",ratings: ""},
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
    const [status, setStatus] = useState("")

    const handleFieldChange = e=> {
        const stateToChange = {...content}
        stateToChange[e.target.id] = e.target.value
        setContent(stateToChange)
    }
    const sendMessage = e=> {
        e.preventDefault()
        setIsLoading(true)
        let rcId = 0
        if(Number(user_id)===job.customer.user.id){
              rcId = job.employee_profile.customer.id
        } else {
             rcId = job.customer.id
        }
        const obj = {
            content: content["content"],
            receiver_customer_id: rcId,
            job_id : jobId
        }
        MM.postNewMessage(token, obj).then((messageFromApi)=> {
            setReload(!reload) 
            setIsLoading(false) 
        })
    }
    const changeStatus = (e) => {
        e.preventDefault()
        const id = jobId
        if(status==="current"){
            JM.addEndToJob(token, id).then(()=> setReload(!reload))
        }
        if(status==="notHired"){
            JM.addStartToJob(token, id).then(()=> setReload(!reload))
        }
        if(status==="past"){
            JM.rehireJob(token, id).then(()=> setReload(!reload))
        }
    }
    

    useEffect(()=> {
        

        MM.getUserMessages(token).then(messageBlocks=>{
            messageBlocks.reverse()
            setChains(messageBlocks)
            //if it is a users first time  on page set the current job id (to be referenced in getting messages ) as the most recent one
            if(isFirst){
                setJobId(messageBlocks[0].job_id)
            }
            if(jobId>0){
            MM.getMessagesByJobId(jobId).then(arr=> {
                //set the messages here
                //the come out reverse but because we have a flex-boc column-reverse it looks normal
                setMessages(arr)
                //get the job associated with the messages because the messages will switch between who received and vice versa
                JM.getOneJob(jobId).then(j=> { 
                    //check to be sure the user is associated with the job therefor associated and can view the messages
                    if(Number(user_id)=== j.customer.user.id || Number(user_id)===j.employee_profile.customer.user.id){
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
                        setIsFirst(false)
                        setIsLoading(false)
                    
                    }else {
                        setIsFirst(false)
                        setIsLoading(false)
                    }
    
                })
            })} else {
                setIsFirst(false)
                setIsLoading(false)
            }
        })
        

    }, [jobId, reload])

    
    if(isLoading){
        return (
            <>
            <div className="loader-container"><div className="loader"></div></div>
            </>
        )
    }else {
        return (
            <>
                <div className="profiles-header"><h1>Messages</h1></div>
                <div className="message-board">
                <div className="message-container">
                    {/* check to see that there are message chains */}

                    {chains.length===0? (<div className="block"><div className="sorry-holder"><h1 className="sorry-job">No messages found</h1></div></div>)
                    : (<div className="ui cards">{chains.map(message=> <MessageBoardCard key={message.id} message={message} user_id = {user_id} setJobId={setJobId}/>)}</div>)}
                </div>
                    <div className="message-container-back">
                        {/* find the other users name and display in the corner of the message box for clarity. then display a button for hiring */}
                    <div className="details-for-messages">{messages.length>0? Number(user_id)===messages[0].customer.user.id? (`${messages[0].receiver_customer.user.first_name} ${messages[0].receiver_customer.user.last_name[0]}.`) :(`${messages[0].customer.user.first_name} ${messages[0].customer.user.last_name[0]}.`) : ("")}
                    <div className="status-button-container">
                            {job.customer.user.id !== undefined? Number(user_id)!==job.customer.user.id ?(""): status !== "current" ? (<Button  id={job.id}color={status==="notHired"? ('green') : ('yellow')} onClick={changeStatus}>
                                {status==="notHired"? ("Hire") : status==="past"? ("Re-hire"): ("")}</Button>) : (<Button id={job.id} color="purple" onClick={changeStatus}>End Job</Button>) :("")}   
                        </div>
                    </div>
                        <div className="messages-holder" id='scroll'>
                            
                    {
                        messages.map(message=> (
                            <MessageCard key={message.id} user_id={user_id} message={message} {...props} />
                        ))
                    }
                    </div>
                    <div className="message-form form-style-4 alt">
                    <form onSubmit={sendMessage}>
                    <fieldset>
                    <legend>Send a Message</legend>
                    <input type="text" id="content" name="field1" placeholder="Message here..." onChange={handleFieldChange}/>
                    </fieldset>
                    </form>
                        

                    </div>
                    
                    </div>
                </div>
            </>
        )
    }

}
export default MessageBoard