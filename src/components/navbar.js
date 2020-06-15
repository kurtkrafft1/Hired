import { scaleDown as Menu } from 'react-burger-menu'
import React from 'react';

const Sidebar = props =>  {
    
  const showSettings = (event) => {
    event.preventDefault();
    return (<a>Hey</a>)
  }

 
return (
    <>
      <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
          <p></p>
        <div className="menu-header"><h1 className="menu-title">-Hired-</h1></div>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/profiles">Profiles</a>
        <a id="contact" className="menu-item" href="/jobs">Your Jobs</a>
        <a className="menu-item" href="/messages">Messages</a>
        <a className="menu-item" href="/account">Account</a>
        <a className="menu-item" href="/login" onClick={()=> props.clearUser()}>Logout</a>
      </Menu>
      </>
    );
    
  
}
export default Sidebar