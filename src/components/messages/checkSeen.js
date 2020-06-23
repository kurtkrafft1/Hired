import MM from "../../modules/messagesManager"

const checkIsSeen = (user_id, job_id)=> {
    MM.getMessagesByJobId(job_id).then(arr=> {
        if(arr[0].receiver_customer.id===Number(user_id) && arr[0].seen!== true){
            MM.updateSeen(arr[0].id)
        }
    })
}

export default checkIsSeen