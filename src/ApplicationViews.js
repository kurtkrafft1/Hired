import { Route, Redirect, NavLink } from "react-router-dom";
import React, {useState} from "react";
import Dashboard from "./components/home/dashboard"
import Login from "./components/login/login"
import Register from "./components/login/Register"
import UserProfiles from "./components/profiles/profiles"

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