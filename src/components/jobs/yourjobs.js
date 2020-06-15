import React, {useState, useEffect} from 'react'
import { Button } from 'semantic-ui-react'
import JM from "../../modules/jobsManager"
import "./yourjobs.css"

const YourJobs = props=> {
    const [jobSelection, setJobSelection] = useState("current")
    const [jobs, setJobs] = useState([])
    const user_id = sessionStorage.getItem('user_id')


    useEffect(()=> {
        if(jobSelection==="current"){
            JM.getJobsForUser(user_id).then(arr=> {
                const filtered = arr.filter(obj=> obj.start_date !== null && obj.end_date === null)
                setJobs(filtered)
                console.log(filtered)
            })
        }
    }, [])

    return (
    
            <>
            <div className="profiles-header">
            <h1>Your Jobs</h1>
            <div>
                <div class="ui left floated buttons outlined">
                    <button class="ui button add-shadow">Current Jobs</button>
                    <button class="ui button">Past Jobs</button>
                    <button class="ui button">Your Jobs</button>
                </div>
            </div>
            </div>
            <div className="job-card-holder">
    
            </div>
            </>

    )

}
export default YourJobs