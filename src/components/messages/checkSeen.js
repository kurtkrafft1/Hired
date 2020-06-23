import MM from "../../modules/messagesManager"

const checkIsSeen = (user_id, job_id)=> {
    console.log('here')
    MM.getMessagesByJobId(job_id).then(arr=> {
        console.log(arr[0])
        if(arr[0].receiver_customer.user.id===Number(user_id) && arr[0].seen!== true){
            MM.updateSeen(arr[0].id)
        }
    })
}

export default checkIsSeen