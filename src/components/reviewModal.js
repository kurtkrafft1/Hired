import React, {useState, useEffect} from "react";
import JM from "../modules/jobsManager"
import RM from "../modules/ratingsManager"
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";

const ReviewModal = props => {
    const [review, setReview] = useState({review: "", id: props.job_id})
    const [stars, setStars] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [hasReviewed, setHasReviewed] = useState(false)
    const token = sessionStorage.getItem('token')

    const handleFieldChange = e=> {
        const stateToChange = {...review}
        stateToChange[e.target.id] = e.target.value
        setReview(stateToChange)
    }

    const handleSubmit = e=> {
        e.preventDefault()
        if(stars!==0){
            const obj = {
                number: stars,
                employee_profile_id: props.mostRecentJob.employee_profile.id
            }
            RM.postNewRating(token, obj)
        }
        JM.addReviewToJob(token, review).then(()=> props.setReload(!props.reload))
        
    }
    useEffect(()=> {
        RM.checkRatings(token, props.mostRecentJob.employee_profile.id).then(arr=> {
            if(arr.length <1){
                setHasReviewed(false)
            } else {
                setHasReviewed(true)
            }
        })
    })


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
                    {hasReviewed? ("") : (<div className="stars">
                        
                            <input className="star star-5" id="star-5" type="radio" name="star" onClick={()=>setStars(5)}/>
                            <label className="star star-5" htmlFor="star-5"></label>
                            <input className="star star-4" id="star-4" type="radio" name="star" onClick={()=>setStars(4)}/>
                            <label className="star star-4" htmlFor="star-4"></label>
                            <input className="star star-3" id="star-3" type="radio" name="star" onClick={()=>setStars(3)}/>
                            <label className="star star-3" htmlFor="star-3"></label>
                            <input className="star star-2" id="star-2" type="radio" name="star" onClick={()=>setStars(2)}/>
                            <label className="star star-2" htmlFor="star-2"></label>
                            <input className="star star-1" id="star-1" type="radio" name="star" onClick={()=>setStars(1)}/>
                            <label className="star star-1" htmlFor="star-1"></label>
                    </div>)}
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

