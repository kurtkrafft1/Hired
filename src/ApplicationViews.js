import { Route, Redirect, NavLink } from "react-router-dom";
import React, {useState} from "react";
import Home from "./components/home/home"
import Login from "./components/login/login"
import Register from "./components/login/Register"

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
                        return <Home {...props} />
                        
                    } else {
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