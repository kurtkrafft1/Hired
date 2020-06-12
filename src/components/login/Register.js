import React, { useState} from 'react'
import LM from "../../modules/LoginManager"

const Register = props => {
    const [credentials, setCredentials] = useState({username: "", password: "", email: "", first_name: "", last_name: "", address: "",city: "",  zipcode: "", phone_number: ""})
    const [showMessage, setShowMessage] = useState(false)

    const handleFieldChange = e => {
        const stateToChange = {...credentials}
        stateToChange[e.target.id] = e.target.value
        if(e.target.id === 'username'){
            stateToChange["email"] = ""
        }
        setCredentials(stateToChange)
        
    }
    const handleSubmit = e=> {
        e.preventDefault()
        // setCredentials['username'] = credentials.email
        console.log(credentials)
        LM.registerUser(credentials).then(obj=> {
            console.log(obj)
            if(obj.valid===true){
                sessionStorage.setItem('token', obj.token)
                sessionStorage.setItem('user_id', obj.user_id)
                props.history.push("/")
            }else {
                setShowMessage(true)
            }
            
        })
    }

    return (
        <>
        <div className="login-box">
        <h2>Register</h2>
        <form>
            
        <div className="user-box">
            <input type="text"id="username" name="" required="" onChange={handleFieldChange}/>
            <label>Email</label>
        </div>
        <div className="user-box">
            <input type="password" id="password" name="" required="" onChange={handleFieldChange}/>
            <label>Password</label>
        </div>
        <div className="name-container">
        <div className="user-box nbox">
            <input type="text" id="first_name" name="" required="" onChange={handleFieldChange}/>
            <label>First Name</label>
        </div>
        <div className="user-box nbox lBox">
            <input type="text" id="last_name" name="" required="" onChange={handleFieldChange}/>
            <label>Last Name</label>
        </div>
        </div>
        <div className="user-box">
            <input type="text" id="phone_number" name="" required="" onChange={handleFieldChange}/>
            <label>Phone Number</label>
        </div>
        <div className="user-box">
            <input type="text" id="address" name="" required="" onChange={handleFieldChange}/>
            <label>Address</label>
        </div>
        <div className="location-container">
        <div className="user-box cBox">
            <input type="text" id="city" name="" required="" onChange={handleFieldChange}/>
            <label>City</label>
        </div>
        <div className="user-box zBox">
            <input type="text" id="zipcode" name="" required="" onChange={handleFieldChange}/>
            <label>Zip Code</label>
        </div>
        </div>
        {showMessage? (<div className='error-message'>
                <h6>*Sorry, the username provided is already taken</h6>
            </div>): ""}
        <div className="register-icon">
        <a href="#" onClick={handleSubmit}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
        </a>
        
            <h5 className='reg-word' onClick={()=> props.history.push('/login')}>Login <i className="arrow alternate circle right outline icon"></i></h5>
        </div>
        </form>
        </div>
        </>
    )
}

export default Register






// {
//     "username": "z@z.com",
//     "password":"testword1",
//     "email": "z@z.com",
//     "first_name": "zane",
//     "last_name": "zippy",
//     "address": "111 One road",
//     "phone_number": "1111112341",
//     "zipcode": "12345"
// }