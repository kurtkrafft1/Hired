import React from 'react';
import dateFunction from "../dateFunction"
const MessageCard = props => {

    if(Number(props.user_id) === props.message.receiver_customer.user.id){
        return(
            <>
            <div className="left-message message-card">
                <h5>{props.message.content}</h5>
                <div className="message-timestamp-left">{dateFunction(props.message.created_at)}</div>
            </div>
            </>
        )
    }
    else{
        return(
            <>
            <div className="right-message message-card">
                <h5>{props.message.content}</h5>
                <div className="message-timestamp-right">{dateFunction(props.message.created_at)}</div>
            </div>
            </>
        )
    }
}
export default MessageCard