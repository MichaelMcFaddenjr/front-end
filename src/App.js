import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';

import NavBar from './Components/NavBar';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MyPlants from './Components/PlantPage/MyPlants';
import EditPlant from './Components/EditPlant';
import UserProfile from './Components/UserProfile';

import './App.css';

function App() {

  const [ loggedIn, setLoggedIn ] = useState(false);

  const token = localStorage.getItem("token")

  const isLoggedIn = () => {
    if (token === localStorage.getItem("token") ) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    return (isLoggedIn)
  }



  return (
    <div className="App">
      <NavBar isLoggedIn={loggedIn}/>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <PrivateRoute path='/myplants' component={MyPlants} />
        <PrivateRoute path='/editplant/:plant_id' component={EditPlant} />
        <PrivateRoute path='/myprofile' component={UserProfile} />
      </Switch>
    </div>
  );
}

export default App;
