import React from 'react'
import "./home.css"

const home = props => {

    return (
        <>
        <div className="home" >
        <div className="alert-holder">
            <div className="message-holder"><h1>(1) You have one new  message!</h1></div>
            <div className="job-holder"><h1>Frank was your last employee, give me a review here...</h1></div>
        </div>
        <div className="profile-holder">
            <div className="img-thumbnail">:D</div>
            <div className="name-holder">Kurt Krafft</div>
            <div className="job-list-holder">
                <ul>
                    <li>Guitarist</li>
                    <li>Coder</li>
                    <li>Archeologist</li>
                </ul>
            </div>
        </div>
        
        </div>
        </>
    )
}
export default home