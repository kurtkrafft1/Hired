import React, {useState} from 'react';
import "./login.css"
import LM from "../../modules/LoginManager"

const Login = props => {
    const [credentials, setCredentials] = useState({username: "", password: ""})
    const [showMessage, setShowMessage] = useState(false)

    const handleFieldChange = e => {
        const stateToChange = {...credentials}
        stateToChange[e.target.id] = e.target.value
        setCredentials(stateToChange)
        
    }

    const handleSubmit = e=> {
        e.preventDefault()
        LM.loginUser(credentials).then(obj=> {
            if(obj.valid===true){
                sessionStorage.setItem('token', obj.token)
                sessionStorage.setItem('user_id', obj.user_id)
                props.setHasUser(true)
                props.history.push("/")
            }else {
                setShowMessage(true)
            }
            
        })
    }


    return (
        <>
        <div className="login-box">
        <h2>Login</h2>
        <form>
            
        <div className="user-box">
            <input type="text"id="username" name="" required="" onChange={handleFieldChange}/>
            <label>Email</label>
        </div>
        <div className="user-box">
            <input type="password" id="password" name="" required="" onChange={handleFieldChange}/>
            <label>Password</label>
        </div>
        {showMessage? (<div className='error-message'>
                <h6>*Sorry, the username or password is incorrect</h6>
            </div>): ""}
        <div className="register-icon">
        <a href="#" onClick={handleSubmit}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
        </a>
        
            <h5 className='reg-word' onClick={()=> props.history.push("/register")}>Register <i className="arrow alternate circle right outline icon"></i></h5>
        </div>
        </form>
        </div>
        </>
    )
}
export default Login