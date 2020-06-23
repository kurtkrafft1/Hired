import React, {useState, useEffect} from 'react'
import UM from "../../modules/userManager"
import LM from "../../modules/LoginManager"
import "./accountEdit.css"
import { Grid, Button, TextField} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

const EditAccount = props => {
    const [customer, setCustomer] = useState({})
    const [userEmail, setUserEmail] = useState({"email": ""})
    const [isLoading, setIsLoading] = useState(true)
    const token = sessionStorage.getItem('token')
    const [url, setUrl] = useState()
    const [profile_picture, setProfilePicture] = useState({})

    const handleFieldChange = e=> {
        const stateToChange = {...customer}
        if (e.target.id === "profile_picture") {
            setProfilePicture( e.target.files[0])
            setUrl(URL.createObjectURL(e.target.files[0]))
          }
        if(e.target.id==="username"){
            stateToChange.user.username = e.target.value
        }else {
            stateToChange[e.target.id] = e.target.value
        }
        
        setCustomer(stateToChange)
        console.log(customer)
    }
    const gatherFormData = (obj) => {
        console.log(obj)
        const formdata = new FormData();
        formdata.append("id", obj.id);
        formdata.append("address", obj.address);
        formdata.append("city", obj.city)
        formdata.append("phone_number", obj.phone_number)
        formdata.append("profile_picture", profile_picture)
        return formdata
      }

    const handleEmailChange = e=> {
        const stateToChange = {...userEmail}
        stateToChange[e.target.id] = e.target.value
        setUserEmail(stateToChange)
    }
    const handleSubmit = async e=> {
        e.preventDefault()
        const updated_customer = {
            "id": customer.id,
            "address": customer.address,
            'city': customer.city,
            "phone_number": customer.phone_number
        }
        const data = await gatherFormData(customer)
        const updated_user = {
            "id": customer.user.id,
            "email": customer.user.username
        }
        UM.updateCustomer(token, updated_customer).then(()=> {
            LM.postCustomerPhoto(token, data)
            UM.updateUser(token, updated_user).then(()=> props.history.push('/account'))
        })

    }



    useEffect(()=> {
        UM.getUserInformation(token).then(obj=> {
            setUserEmail(obj.user.email)
            setCustomer(obj)
            if(obj.profile_picture !== null){
                setUrl(obj.profile_picture)
            }
            else {
                setUrl("https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg")
            }
            
        }).then(()=>{setIsLoading(false)})
    },[])

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
            <div className="account-page">
            <div className="profile-holder">
                <div className="name-n-img">
                    <div className="img-container">
                        <div className="img-thumbnail"><img src={url} alt="prof-pic" className="prof-pic-icon"/></div>
                        <div item xs={12} md={6} className="add-button-left">
                                <div className="file-name">
                                <h4>{profile_picture.name
                                        ? profile_picture.name.length > 30 
                                            ? "..." + profile_picture.name.substring(profile_picture.name.length -30, profile_picture.name.length)
                                            : profile_picture.name
                                        : "Upload Profile Picture"
                                    }</h4>
                                </div>
                                <TextField
                                    style={{display: 'none'}}
                                    fullWidth
                                    accept="image/*"
                                    id="profile_picture"
                                    name="profile_picture"
                                    label="Image"
                                    type="file"
                                    onChange={handleFieldChange}
                                />
                                <label htmlFor="profile_picture">
                                <Fab
                                    color="Primary"
                                    size="small"
                                    component="span"
                                    aria-label="add"
                                    variant="extended"
                                    style={{display:'flex'}}
                                >
                                    Upload new photo
                                </Fab>
                                </label>
                                </div>
            </div>
            <div className="name-holder push-down"><h1>{customer.user.first_name} {customer.user.last_name}</h1></div>
                </div>
                <div className="customer-info">
                    <h1 className="information-title">Information</h1>
                    <div class="user-info add-marg-left">
                    <div className="fields">
                    <label class="field a-field a-field_a1">
                        <input class="field__input a-field__input" id="username" onChange={handleFieldChange} value={customer.user.username} />
                        <span class="a-field__label-wrap">
                        <span class="a-field__label">Email</span>
                        </span>
                    </label>
                    <label class="field a-field a-field_a1">
                        <input class="field__input a-field__input" id="city"value={customer.city} onChange={handleFieldChange}  />
                        <span class="a-field__label-wrap">
                        <span class="a-field__label">City</span>
                        </span>
                    </label>
                     
                    </div>
                    <div className="fields add-top-to-fields">
                    <label class="field a-field a-field_a2">
                        <input class="field__input a-field__input" id="address"value={customer.address} onChange={handleFieldChange} />
                        <span class="a-field__label-wrap">
                        <span class="a-field__label">Address</span>
                        </span>
                    </label>   
                    
                    <label class="field a-field a-field_a2">
                        <input class="field__input a-field__input" id="phone_number" value={customer.phone_number} onChange={handleFieldChange}  />
                        <span class="a-field__label-wrap">
                        <span class="a-field__label">Phone Number</span>
                        </span>
                    </label>  
                    </div>
                    </div>
                </div>
                <div className="edit-icon-account">
                    < button disabled={isLoading} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            </div>
            </>
        )
    }
}
export default EditAccount