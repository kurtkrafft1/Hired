import React, {useState, useEffect} from "react";
import JM from "../../modules/jobsManager"
import MM from "../../modules/messagesManager"
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";

const MessageModal = props => {
    const [message, setMessage] = useState({message: "Hey! I admire your work, and would like to hire you sometime. Thanks!"})
    const [isLoading, setIsLoading] = useState(false)
    const token = sessionStorage.getItem('token')

    const handleFieldChange = e => {
        const stateToChange = {...message}
        stateToChange[e.target.id] = e.target.value
        setMessage(stateToChange)

    }

    const postNewMessage = e => {
        e.preventDefault()
        
        const job = {
            "employee_profile_id": props.employee_profile_id
        }
        JM.postJob(token, job).then(obj=> {
            console.log('submit!')
            const new_message = {
                job_id: obj.id,
                receiver_customer_id: obj.employee_profile.customer.id,
                content: message.message,
                seen: false
            }
            MM.postNewMessage(token, new_message).then(()=> props.history.push('/messages'))
        })
    }

    return (
        <Modal id="message-modal" open={props.messageModalOpen} trigger={ <i id="icons"className="envelope icon" onClick={props.toggleMessageModal}></i>}>
            <Modal.Header>Send Message</Modal.Header>
            <Modal.Content>
                <Form>
                <Form.Group widths='equal'>
                <Form.Field
                        id='message'
                        control={Input}
                        label='Message'
                        placeholder='Message...'
                        onChange={handleFieldChange}
                        value={message.message}
                     
                    />
                    </Form.Group>
                </Form>
                <div className="login-form=buttons">
            <Button disabled={isLoading} onClick={postNewMessage}>Submit</Button>
            <Button onClick={props.toggleMessageModal}>Cancel</Button>
            </div>
            </Modal.Content>
        </Modal>
    )

}
export default MessageModal