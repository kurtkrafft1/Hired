import React, {useState} from "react"
import ApplicationViews from "./ApplicationViews";
import Sidebar from "./components/navbar"
import "./components/navbar.css"
import {NavLink} from 'react-router-dom';
import "./hired.css"
import logo from "./images/hiredlogo.png";


const Hired = props => {
    const isAuthenticated = () => sessionStorage.getItem("token") !== null;
    const [hasUser, setHasUser] = useState(isAuthenticated());
    const clearUser = () => {
        sessionStorage.clear();
        setHasUser(false);
      };

    return (
        <>
        {
            hasUser? (
                <div id="outer-container">
                    
                    <Sidebar clearUser={clearUser}/>
                    <main id="page-wrap">
                    <div className="page-header"><div></div><div className="title-holder"><h1 className="title">hired</h1></div><div className="logo-holder"></div></div>
                        <ApplicationViews hasUser={hasUser} setHasUser={setHasUser}/>
                    </main>
                </div>

         
        
            ) : (
                <div id="page-wrap">
                 <div className="page-header"><div></div><div className="title-holder"><h1 className="title">hired</h1></div><div className="logo-holder"></div></div>
                <ApplicationViews hasUser={hasUser} setHasUser={setHasUser}/>
                </div>
            )

        }
        
       
            
        </>
    )
}
export default Hired