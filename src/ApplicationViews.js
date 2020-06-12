import { Route, Redirect } from "react-router-dom";
import React, {useState} from "react";
import Home from "./components/home/home"
import Login from "./components/login/login"
import Register from "./components/login/Register"

const ApplicationViews = props => {
    const isAuthenticated = () => sessionStorage.getItem("token") !== null;
    const [hasUser, setHasUser] = useState(isAuthenticated());

    return (
        <>
        <Route exact path = "/login"
        render ={props=> {
            return <Login {...props} />
        }}
        />
        <Route exact path = "/register"
        render ={props=> {
            return <Register {...props} />
        }}
        />
        <Route 
        exact path = "/"
        render={props=> {
            return <Home {...props} />
        }}
        />
        </>
    )
}
export default ApplicationViews