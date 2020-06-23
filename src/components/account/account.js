import React, {useState, useEffect} from 'react'
import UM from "../../modules/userManager"
import "./account.css"

const AccountPage = props => {
    const [customer, setCustomer] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const token = sessionStorage.getItem('token')





    useEffect(()=> {
        UM.getUserInformation(token).then(obj=> setCustomer(obj)).then(()=>setIsLoading(false))
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
                        <div className="img-thumbnail"><img src={customer.profile_picture !== null? customer.profile_picture : "https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg"} alt="prof-pic" className="prof-pic-icon"/></div>
                        <div className="name-holder push-down"><h1>{customer.user.first_name} {customer.user.last_name}</h1></div>
                </div>
                <div className="customer-info">
                    <h1 className="information-title">Information</h1>
                    <div className="detail-holder">
                        <div className="email-holder">
                            <h2 className="account-title">Email</h2>
                            <h5 className="account-detail">{customer.user.username}</h5>
                        </div>
                        <div className="address-holder">
                            <h2 className="account-title">Address</h2>
                            <h5 className="account-detail">{customer.address}</h5>
                        </div>
                    </div>
                    <div className="detail-holder add-marg-top">
                        <div className="email-holder">
                            <h2 className="account-title">City</h2>
                            <h5 className="account-detail">{customer.city}</h5>
                        </div>
                        <div className="address-holder">
                            <h2 className="account-title">Phone Number</h2>
                            <h5 className="account-detail">{customer.phone_number}</h5>
                        </div>
                    </div>
                    <div className="edit-icon-account">
                        <i class="edit icon" onClick={()=>props.history.push('/account/edit')}></i>
                    </div>
                </div>
            </div>
            </div>
            </>
        )
    }
}
export default AccountPage