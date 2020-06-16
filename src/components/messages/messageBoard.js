import React, {useState, useEffect} from 'react'
import MM from "../../modules/messagesManager"
import MessageBoardCard from './messageBoardCard'
import "./messages.css"

const MessageBoard = props => {

    const [chains, setChains] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const user_id = sessionStorage.getItem('user_id')
    const token = sessionStorage.getItem('token')

    useEffect(()=> {
        MM.getUserMessages(token).then(arr=>{
            console.log(arr)
            setChains(arr)
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
        return (
            <>
                <div className="profiles-header"><h1>Messages</h1></div>
                <div className="message-container">
                    {chains.length===0? (<div className="block"><div className="sorry-holder"><h1 className="sorry-job">No messages found</h1></div></div>)
                    : (<div className="ui cards">{chains.map(message=> <MessageBoardCard key={message.id} message={message} user_id = {user_id} />)}</div>)}
                </div>
            </>
        )
    }

}
export default MessageBoard