import React from 'react';

//This is our navBar
//on the NavBar there should be links with ability to see 'MyPlants', 'My Profile' and 'Logout'

const NavBar = () => {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href="/";
  }
  return (
    <button onClick={logout}>logout</button>
  );
}

export default NavBar;