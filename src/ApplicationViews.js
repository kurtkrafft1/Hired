import { Route, Redirect, NavLink } from "react-router-dom";
import React, {useState} from "react";
import Dashboard from "./components/home/dashboard"
import Login from "./components/login/login"
import Register from "./components/login/Register"
import UserProfiles from "./components/profiles/profiles"
import ProfileForm from "./components/profiles/profileForm"
import EditProfileForm from "./components/profiles/editProfileForm"
import YourJobs from "./components/jobs/yourjobs"
import Search from "./components/search/search"
import MessageBoard from "./components/messages/messageBoard"
const ApplicationViews = props => {

    const hasUser = props.hasUser
    const setHasUser = props.setHasUser
    

        if(hasUser){

            return (
                <>
                <div className="app_views">
                <Route exact path = "/login"
                render ={props=> {
                    return <Login {...props} setHasUser={setHasUser}/>
                }}
                />
                <Route exact path = "/register"
                render ={props=> {
                    return <Register {...props} setHasUser={setHasUser}/>
                }}
                />
                <Route 
                exact path = "/"
                render={props=> {
                    if(hasUser){
                        return <Dashboard {...props} />
                        
                    } else {
                        return <Redirect to="/login" />
                        
                    }
                    
                }}
                />
                <Route
                exact path = '/profiles'
                render={props=> {
                    if(hasUser){
                        return <UserProfiles {...props} />
                    }
                    else{
                        return <Redirect to="/login" />
                    }
                }}
                />
                <Route 
                exact path = "/profiles/new"
                render={props=> {
                    if(hasUser){
                        return <ProfileForm {...props} />
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }}
                />
                <Route 
                exact path = "/profiles/edit/:profileId(\d+)"
                render={props=> {
                    if(hasUser){
                        return <EditProfileForm  profileId={parseInt(props.match.params.profileId)} {...props} />
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }}
                />
                <Route 
                exact path = "/jobs"
                render={props=> {
                    if(hasUser){
                        return <YourJobs {...props} />
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }}
                />
                <Route 
                exact path = "/search"
                render={props=> {
                    if(hasUser){
                        return <Search {...props} />
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }}
                />
                <Route 
                exact path = "/messages"
                render={props=> {
                    if(hasUser){
                        return <MessageBoard {...props} />
                    }
                    else {
                        return <Redirect to="/login" />
                    }
                }}
                />
                
                </div>
                </>
            )
        }else {
            return(
                <>
                <Route exact path = "/login"
            render ={props=> {
                return <Login {...props} setHasUser={setHasUser}/>
            }}
            />
            <Route exact path = "/register"
            render ={props=> {
                return <Register {...props} setHasUser={setHasUser}/>
            }}
            />
                </>
            )
            
            }
        

}
export default ApplicationViews