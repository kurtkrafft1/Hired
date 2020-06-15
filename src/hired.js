import React, {useState} from "react"
import ApplicationViews from "./ApplicationViews";
import Sidebar from "./components/navbar"
import "./components/navbar.css"
import {NavLink} from 'react-router-dom';
import "./hired.css"


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
                    
                    <Sidebar />
                    <main id="page-wrap">
                    <div className="page-header"><h1 className="title">Hired</h1></div>
                        <ApplicationViews hasUser={hasUser} setHasUser={setHasUser}/>
                    </main>
                </div>

         
        
            ) : (
                <div id="page-wrap">
                <div className="page-header"><h1 className="title">Hired</h1></div>
                <ApplicationViews hasUser={hasUser} setHasUser={setHasUser}/>
                </div>
            )

        }
        
       
            
        </>
    )
}
export default Hired