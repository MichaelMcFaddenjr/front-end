import React from 'react';
import UserProfile from './UserProfile'

//This is our navBar
//on the NavBar there should be links with ability to see 'MyPlants', 'My Profile' and 'Logout'

const NavBar = () => {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href="/";
  }
  return (
    <div>
      <button onClick={logout}>logout</button>
      <UserProfile/>
    </div>
  );
}

export default NavBar;