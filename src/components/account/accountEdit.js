import React, {useState, useEffect} from 'react'
import UM from "../../modules/userManager"
import "./accountEdit.css"
import {Button} from "semantic-ui-react"

const EditAccount = props => {
    const [customer, setCustomer] = useState({})
    const [userEmail, setUserEmail] = useState({"email": ""})
    const [isLoading, setIsLoading] = useState(true)
    const token = sessionStorage.getItem('token')

    const handleFieldChange = e=> {
        const stateToChange = {...customer}
        if(e.target.id==="email"){
            stateToChange.user.email = e.target.value
        }else {
            stateToChange[e.target.id] = e.target.value
        }
        
        setCustomer(stateToChange)
    }

    const handleEmailChange = e=> {
        const stateToChange = {...userEmail}
        stateToChange[e.target.id] = e.target.value
        setUserEmail(stateToChange)
    }
    const handleSubmit = e=> {
        e.preventDefault()
        const updated_customer = {
            "id": customer.id,
            "address": customer.address,
            'city': customer.city,
            "phone_number": customer.phone_number
        }
        const updated_user = {
            "id": customer.user.id,
            "email": customer.user.email
        }
        UM.updateCustomer(token, updated_customer).then(()=> {
            UM.updateUser(token, updated_user).then(()=> props.history.push('/account'))
        })

    }



    useEffect(()=> {
        UM.getUserInformation(token).then(obj=> {
            setUserEmail(obj.user.email)
            setCustomer(obj)
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
                        <div className="img-thumbnail"><img src="https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg" alt="prof-pic" className="prof-pic-icon"/></div>
                        <div className="name-holder push-down"><h1>{customer.user.first_name} {customer.user.last_name}</h1></div>
                </div>
                <div className="customer-info">
                    <h1 className="information-title">Information</h1>
                    <div class="user-info add-marg-left">
                    <div className="fields">
                    <label class="field a-field a-field_a1">
                        <input class="field__input a-field__input" id="email" onChange={handleFieldChange} value={customer.user.email} />
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
                    <Button disabled={isLoading} onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
            </div>
            </>
        )
    }
}
export default EditAccount