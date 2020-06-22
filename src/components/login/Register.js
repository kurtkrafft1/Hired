import React, { useState} from 'react'
import LM from "../../modules/LoginManager"
import CM from "../../modules/userManager"
import { Grid, Button, TextField} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';


const Register = props => {
    const [credentials, setCredentials] = useState({username: "", password: "", email: "", first_name: "", last_name: "", address: "",city: "",  zipcode: "", phone_number: "", })
    const [profile_picture, setProfilePicture] = useState({})
    const [showMessage, setShowMessage] = useState(false)

    const handleFieldChange = (event) => {
        const stateToChange = { ...credentials };
        if(event.target.id === 'username'){
            stateToChange[event.target.id] = event.target.value
            stateToChange["email"] = ""
        }
        // From Keith:
        // If the field being changed is the image path,
        // rather than placing the event.target.value in state,
        // you need to place the (only) file
        //THANK YOU KEITH FOR HELPING ME HERE
        if (event.target.id === "profile_picture") {
          setProfilePicture( event.target.files[0])
          
        
        } else {
          stateToChange[event.target.id] = event.target.value;
        }
        setCredentials(stateToChange);
      };
      // Because an image is not a string type, 
  // json/stringify and content-type cannot be used in a fetch call
  // so instead, we create the fetch's body like this
  const gatherFormData = (obj) => {
    const formdata = new FormData();
    formdata.append("id", obj.id);
    formdata.append("address", obj.address);
    formdata.append("city", obj.city)
    formdata.append("phone_number", obj.phone_number)
    formdata.append("profile_picture", profile_picture)
    return formdata
  }
    const handleSubmit = e=> {
        e.preventDefault()
        console.log(credentials)
        // setCredentials['username'] = credentials.email
        // const newUser =  await gatherFormData()
        // console.log('new_user', newUser)
        LM.registerUser(credentials).then(obj=> {
            
            if(obj.valid===true){
                sessionStorage.setItem('token', obj.token)
                sessionStorage.setItem('user_id', obj.user_id)
                props.setHasUser(true)
                // props.history.push("/")
            
                CM.getUserInformation(obj.token).then(async obj=> {
                    
                    const data = await gatherFormData(obj)
                    for (var [key, value] of data.entries()) { 
                        console.log(key, value);
                      }
                    console.log(data.get("id"))
                    LM.postCustomerPhoto(sessionStorage.getItem('token'), data).then(()=> props.history.push("/"))
                })
            }else {
                setShowMessage(true)
            }
            
        })
    }
    

    return (
        <>
        <div className="login-box reggy">
        <h2>Register</h2>
        <form>
            
        <div className="user-box reg">
            <input type="text"id="username" name="" required="" onChange={handleFieldChange}/>
            <label>Email</label>
        </div>
        <div className="user-box reg">
            <input type="password" id="password" name="" required="" onChange={handleFieldChange}/>
            <label>Password</label>
        </div>
        <div className="name-container">
        <div className="user-box reg nbox">
            <input type="text" id="first_name" name="" required="" onChange={handleFieldChange}/>
            <label>First Name</label>
        </div>
        <div className="user-box reg nbox lBox">
            <input type="text" id="last_name" name="" required="" onChange={handleFieldChange}/>
            <label>Last Name</label>
        </div>
        </div>
        <div className="user-box reg">
            <input type="text" id="phone_number" name="" required="" onChange={handleFieldChange}/>
            <label>Phone Number</label>
        </div>
        <div className="user-box reg">
            <input type="text" id="address" name="" required="" onChange={handleFieldChange}/>
            <label>Address</label>
        </div>
        <div className="location-container">
        <div className="user-box reg cBox">
            <input type="text" id="city" name="" required="" onChange={handleFieldChange}/>
            <label>City</label>
        </div>
        <div className="user-box reg zBox">
            <input type="text" id="zipcode" name="" required="" onChange={handleFieldChange}/>
            <label>Zip Code</label>
        </div>
        </div>
        
        <div></div>
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
    Upload photo
  </Fab>
              </label>
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