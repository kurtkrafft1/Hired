import React, {useState, useEffect} from 'react'
import EPM from "../../modules/employeeProfileManager"
import JTM from "../../modules/jobtypeManager"

const EditProfileForm = props => {
    const [profile, setProfile] = useState({'job_type_id': "", "title": "", "description":""})
    const [types, setTypes] = useState([])
    const token = sessionStorage.getItem('token')

    const handleFieldChange = e => {
        const stateToChange = {...profile}
        stateToChange[e.target.id] = e.target.value
        setProfile(stateToChange)
    }
    const handleSubmit = e=> {
        e.preventDefault()
        console.log(profile)
        EPM.editProfile(token, props.profileId, profile).then(()=> props.history.push("/profiles"))
    }
    useEffect(()=> {
        JTM.getAllJobTypes().then(arr=> {
            setTypes(arr)
        })
        EPM.getOneProfile(props.profileId).then(obj=>{console.log(obj); setProfile(obj)})
    }, [])
    return (
        <>
        <div className="form-style-5">
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend><span className="number">H</span> Profile Info</legend>
                <input type="text" id="title" name="field1" placeholder="Job Title" value={profile.title} onChange={handleFieldChange}/>
                <textarea name="field3" id="description" placeholder="Job Description" value={profile.description} onChange={handleFieldChange}></textarea>
                <label for="job">Job Type:</label>
                <select id="job_type_id" name="field4" onChange={handleFieldChange}> 
                <optgroup label="Jobs">
                    {types.map(type=> (
                        <option value={type.id} selected={type["id"] === profile.job_type_id? true : false}>{type.title}</option>   
                    ))}
                </optgroup>
                </select>      
            </fieldset>
            <input type="submit" value="Submit" />
        </form>
        </div>
        </>
    )
}
export default EditProfileForm