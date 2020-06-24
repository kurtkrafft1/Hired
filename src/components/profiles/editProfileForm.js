import React, {useState, useEffect} from 'react'
import EPM from "../../modules/employeeProfileManager"
import JTM from "../../modules/jobtypeManager"
import BackButton from "../back_button";

const EditProfileForm = props => {
    const [profile, setProfile] = useState({'job_type_id': "", "title": "", "description":"", 'pay': ""})
    const [session, setSession] = useState(false)
    const [hour, setHour] = useState(false)
    const [types, setTypes] = useState([])
    const token = sessionStorage.getItem('token')

    const handleCheck1 = e => {
        setSession(false)
        setHour(true)
    }
    const handleCheck2 = e=> {
        setHour(false)
        setSession(true)
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

    const handleFieldChange = e => {
        const stateToChange = {...profile}
        stateToChange[e.target.id] = e.target.value
        setProfile(stateToChange)
    }
    const handleSubmit =async e=> {
        e.preventDefault()
        const real_pay = await reformatPay()
        
        const newProfile = {
            'job_type_id': profile.job_type_id,
            "title": profile.title,
            "description": profile.description,
            "pay": real_pay
        }
        
        EPM.editProfile(token, props.profileId, newProfile).then(()=> props.history.push("/profiles"))
    }
    useEffect(()=> {
        JTM.getAllJobTypes().then(arr=> {
            setTypes(arr)
        })
        EPM.getOneProfile(props.profileId).then(obj=>{
            if(obj.pay.split('/')[1]==="hour"){
                setHour(true)
                setSession(false)
            }
            if(obj.pay.split('/')[1]==="session") { 
                setSession(true)
                setHour(false)
            }
                obj.pay = obj.pay.split("$")[1].split("/")[0]
                setProfile(obj)
           
            
        })
    }, [])
    return (
        <>
        <BackButton path={'/profiles'} {...props}/>
        <div className="form-style-5">
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend><span className="number">H</span> Profile Info</legend>
                <input type="text" id="title" name="field1" placeholder="Job Title" value={profile.title} onChange={handleFieldChange}/>
                <textarea name="field3" id="description" placeholder="Job Description" value={profile.description} onChange={handleFieldChange}></textarea>
                <label htmlFor="job">Job Type:</label>
                <select id="job_type_id" name="field4" onChange={handleFieldChange}> 
                <optgroup label="Jobs">
                    {types.map(type=> (
                        <option key={type.id} value={type.id} selected={type["id"] === profile.job_type_id? true : false}>{type.title}</option>   
                    ))}
                </optgroup>
                </select> 
                <div className="pay-field">
                <input type="text" id="pay" name="field1" value={profile.pay} onChange={handleFieldChange}/>
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
export default EditProfileForm