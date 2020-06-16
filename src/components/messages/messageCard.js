import React from 'react';

const MessageCard = props => {

    if(Number(props.user_id) === props.message.receiver_customer.user.id){
        return(
            <>
            <div className="left-message message-card">
                <h5>{props.message.content}</h5>
            </div>
            </>
        )
    }
    else{
        return(
            <>
            <div className="right-message message-card">
                <h5>{props.message.content}</h5>
            </div>
            </>
        )
    }
}
export default MessageCard