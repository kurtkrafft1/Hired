import React, {useState, useEffect} from 'react'
import EPM from "../../modules/employeeProfileManager"
import JTM from "../../modules/jobtypeManager"
import "./profform.css"
import BackButton from "../back_button"

const ProfileForm = props => {
    const [profile, setProfile] = useState({'job_type_id': "", "title": "", "description":"", "pay":""})
    const [types, setTypes] = useState([])
    const [session, setSession] = useState(false)
    const [hour, setHour] = useState(true)
    const token = sessionStorage.getItem('token')

    const handleCheck1 = e => {
        setSession(false)
        setHour(true)
    }
    const handleCheck2 = e=> {
        setHour(false)
        setSession(true)
    }

    const handleFieldChange = e => {
        const stateToChange = {...profile}
        stateToChange[e.target.id] = e.target.value
        
        setProfile(stateToChange)
    }

    const reformatPay = () => {
        const stateToChange = {...profile}
        if(session){
            if(stateToChange["pay"][0] !== "$"){
                return `$${profile.pay}/session`
            } else {
                return `${profile.pay}/session`
            }
            
        }
        else if(hour){
            if(stateToChange["pay"][0] !== "$"){
                return `$${profile.pay}/hour`
            } else {
                return `${profile.pay}/hour`
            }
        }
        
    }
    const handleSubmit = async e=> {
        e.preventDefault()
        const real_pay = await reformatPay()
        
        const newProfile = {
            'job_type_id': profile.job_type_id,
            "title": profile.title,
            "description": profile.description,
            "pay": real_pay
        }
        
        EPM.postNewProfile(token, newProfile).then(()=> props.history.push("/profiles"))
    }
    useEffect(()=> {
        JTM.getAllJobTypes().then(arr=> {
            setTypes(arr)
        })
    }, [])


    return (
        <>
        <BackButton path={'/profiles'} {...props}/>
        <div className="form-style-5">
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend><span className="number">H</span> Profile Info</legend>
                <input type="text" id="title" name="field1" placeholder="Job Title" onChange={handleFieldChange}/>
                <textarea name="field3" id="description" placeholder="Job Description" onChange={handleFieldChange}></textarea>
                <label for="job">Job Type:</label>
                <select id="job_type_id" name="field4" onChange={handleFieldChange}> 
                <optgroup label="Jobs">
                    <option selected disabled value="None Selected">--Please Select An Option--</option>
                    {types.map(type=> (
                        <option key={type.id} value={type.id}>{type.title}</option>
                    ))}
                </optgroup>
                </select>
                <div className="pay-field">
                <input type="text" id="pay" name="field1" placeholder="Pay" onChange={handleFieldChange}/>
                <div className="ui checked checkbox left">
                    <input type="checkbox" id="hour" checked={hour} onClick={handleCheck1}/>
                    <label>Per Hour</label>
                </div>
                <div className="ui checked checkbox">
                    <input type="checkbox" id="session"checked={session} onClick={handleCheck2}/>
                    <label>Per Session</label>
                </div>
                </div>
            </fieldset>
            <input type="submit" value="Submit" />
        </form>
        </div>
        </>
    )
}
export default ProfileForm