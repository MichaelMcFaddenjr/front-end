import React from 'react';
import { useHistory } from 'react-router-dom'

//This is our navBar
//on the NavBar there should be links with ability to see 'MyPlants', 'My Profile' and 'Logout'

const NavBar = ({isLoggedIn}) => {
  const { push } = useHistory();

  console.log(isLoggedIn);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href="/";
  }
  const onClickPlants = (e) =>{
    push('/myplants')
  } 
  const onClickProfile = (e) =>{
    push('/myprofile')
  }
  return (
    <div>

      <span onClick={onClickPlants}>my plants</span>
      <span onClick={onClickProfile}>my profile</span>
      {isLoggedIn ? 
      (<span onClick={logout}>logout</span>)
      :
      (null)
      }

    </div>
  );
}

export default NavBar;