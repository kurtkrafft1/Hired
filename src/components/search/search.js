import React, {useState, useEffect} from 'react';
import JTM from "../../modules/jobtypeManager"
import "./search.css"
import ResultCard from "./resultCards"
import EPM from "../../modules/employeeProfileManager"

const Search = props => {

    const [searchParams, setSearchParams] = useState({job_type_id: 0, title:"", city: ""})
    const [types, setTypes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [profiles, setProfiles] = useState([])
    const [hasSearched, setHasSearched] = useState(false)

    const handleFieldChange = e => {
        const stateToChange = {...searchParams}
        stateToChange[e.target.id] = e.target.value
        setSearchParams(stateToChange)
    }


    const handleSearch=e=> {
        e.preventDefault()
        setHasSearched(true)
        //We must use this conditional because we take do int(job_type_id) in the back end which will break if it is ""
        let lowercase_obj = {}
        if(searchParams.city==="" && searchParams.title !== ""){
             lowercase_obj = {
                city: "",
                title: searchParams.title.toLowerCase(),
                job_type_id: searchParams.job_type_id
            }
        }
        if(searchParams.title==="" & searchParams.city !== ""){
             lowercase_obj = {
                city: searchParams.city.toLowerCase(),
                title: "",
                job_type_id: searchParams.job_type_id
            }
        }
        if(searchParams.title !== "" && searchParams.city !== ""){
             lowercase_obj = {
                city: searchParams.city.toLowerCase(),
                title: searchParams.title.toLowerCase(),
                job_type_id: searchParams.job_type_id
            }
        }
        if(searchParams.title ==="" && searchParams.city === ""){
            lowercase_obj = {
                city: "",
                title: "",
                job_type_id: searchParams.job_type_id
            }
        }

        if(searchParams.job_type_id === 0){
            EPM.searchProfilesWithOutJobTypeId(lowercase_obj).then(arr=> setProfiles(arr))
        } else {
            EPM.searchProfilesWithJobTypeId(lowercase_obj).then(arr=>{
                console.log(arr)
                setProfiles(arr)})
        }
    }

    useEffect(()=> {
        JTM.getAllJobTypes().then(arr=> setTypes(arr))
        setIsLoading(false)
    }, [])


    if(isLoading){
        return (
            <>
            <div className="loader-container"><div className="loader"></div></div>
            </>
        )
    } else{
        return (
        
        <>
        <div className="form-style-4" onSubmit={handleSearch}>
        <form>
            <fieldset>
                <legend><span className="number">H</span> Search</legend>
                <input type="text" id="city" name="field1" placeholder="City (optional)" onChange={handleFieldChange}/>
                <label htmlFor="job">Job Type:</label>
                <select id="job_type_id" name="field4" onChange={handleFieldChange}> 
                <optgroup label="Jobs">
                    <option selected disabled value="None Selected">--Job type (optional)--</option>
                    {types.map(type=> (
                        <option  key={type.id} value={type.id}>{type.title}</option>
                    ))}
                </optgroup>
                </select>
                <input className="remove-margin"type="text" id="title" name="field1" placeholder="Job Title (optional)" onChange={handleFieldChange}/>   
                <input type="submit"></input>
            </fieldset>
        </form>
        </div>
        {/* Some more Terenary Madness....the first conditional checks to see if the user has searched or not, if they haven't we welcome them and 
        give them a little instruction if they have searched we change to sorry no results found, if there are no results of course other than that we 
        load the cards */}
        {hasSearched ===false? (<div className="block"><div className="sorry-holder"><h3 className="sorry-job title">Enter in any or all of the fields above to begin your search!</h3></div></div>): 
        profiles.length===0? (<div className="block"><div className="sorry-holder"><h3 className="sorry-job title">We're sorry, there are no results for your search, try again!</h3></div> </div>): 
        <div className="ui cards add-top">{profiles.map(profile=> <ResultCard key={profile.id} profile={profile} {...props} />)}</div>
        }


        </>)
    }
}

export default Search