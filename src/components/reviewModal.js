import React, {useState, useEffect} from "react";
import JM from "../modules/jobsManager"
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";

const ReviewModal = props => {
    const [review, setReview] = useState({review: "", id: props.job_id})
    const [isLoading, setIsLoading] = useState(false)
    const token = sessionStorage.getItem('token')

    const handleFieldChange = e=> {
        const stateToChange = {...review}
        stateToChange[e.target.id] = e.target.value
        setReview(stateToChange)
    }

    const handleSubmit = e=> {
        e.preventDefault()
        JM.addReviewToJob(token, review).then(()=> props.setReload(!props.reload))
        
    }

    return (
        <Modal id="review-modal" open={props.reviewModalOpen} trigger={ <div className="job-holder add-hover-to-review" onClick={props.toggleReviewModal}><h1>{props.mostRecentJob.employee_profile.customer.user.first_name} {props.mostRecentJob.employee_profile.customer.user.last_name[0]}. was your most recent worker, leave them a review by clicking here!</h1></div>}>
            <Modal.Header>Add Review</Modal.Header>
            <Modal.Content>
                <Form>
                <Form.Group widths='equal'>
                <Form.Field
                        id='review'
                        control={Input}
                        label='Review'
                        placeholder='Add Your Review Here...'
                        onChange={handleFieldChange}
                        value={review.review}
                     
                    />
                    </Form.Group>
                </Form>
                <div className="login-form=buttons">
            <Button disabled={isLoading} onClick={handleSubmit}>Submit</Button>
            <Button onClick={props.toggleReviewModal}>Cancel</Button>
            </div>
            </Modal.Content>
        </Modal>
    )
}
export default ReviewModal

