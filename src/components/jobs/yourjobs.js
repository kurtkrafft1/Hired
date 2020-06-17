import React, {useState, useEffect} from 'react'
import { Button } from 'semantic-ui-react'
import JM from "../../modules/jobsManager"
import "./yourjobs.css"
import JobCard from "./jobcard"

const YourJobs = props=> {
    const [jobSelection, setJobSelection] = useState("current")
    const [jobs, setJobs] = useState([])
    const user_id = sessionStorage.getItem('user_id')
    const [isLoading, setIsLoading] = useState(true)



    useEffect(()=> {
        if(jobSelection==="current"){
            JM.getJobsForUser(user_id).then(arr=> {
                const filtered = arr.filter(obj=> obj.start_date !== null && obj.end_date === null)
                setJobs(filtered)
                console.log(filtered)
                setIsLoading(false)
            })
        }
        if(jobSelection==="past"){
            JM.getJobsForUser(user_id).then(arr=> {
                const filtered = arr.filter(obj=> obj.start_date !== null && obj.end_date !== null)
                setJobs(filtered)
                setIsLoading(false)
            })
        }
        if(jobSelection==="yours"){
            JM.getJobsByUser(user_id).then(arr=> {
                const filtered = arr.filter(obj=> obj.start_date !== null)
                setJobs(filtered)
                setIsLoading(false)
            })
        }
    }, [jobSelection])
    if(isLoading){
        return (
            <>
            <div className="loader-container"><div className="loader"></div></div>
            </>
        )
    }
    else {

    return (
    
            <>
            <div className="title profiles-header">
            <h1>Your Jobs</h1>
            <div>
                <div className="ui left floated buttons outlined">
                    <button className="ui button add-shadow" onClick={()=> setJobSelection('current')}>Current Jobs</button>
                    <button className="ui button" onClick={()=> setJobSelection('past')}>Past Jobs</button>
                    <button className="ui button" onClick={()=> setJobSelection('yours')}>Your Jobs</button>
                </div>
            </div>
            </div>
            <div className="job-card-holder">
            <div className="ui link cards">
            {jobs.length<1? (<div className="block"><div className="sorry-holder title"><h1 className="sorry-job">Sorry, nothing came back! Try searching for someone to hire or look for some people that may need help!</h1></div></div>)
               :( jobs.map(job=> (
                    <JobCard key={job.id} job={job} {...props} />
                )))
            }
            </div>
            </div>
            </>

    )
}

}
export default YourJobs