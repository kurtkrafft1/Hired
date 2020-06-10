import { Route, Redirect } from "react-router-dom";
import React from "react";
import Home from "./components/home/home"

const ApplicationViews = props => {
    return (
        <>
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