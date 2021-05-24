import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import axios from 'axios';
import * as yup from 'yup';
import schema from './Validation/signUpFormSchema';

import NavBar from './Components/NavBar';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MyPlants from './Components/PlantPage/MyPlants';
import AddPlant from './Components/AddPlant';
import EditPlant from './Components/EditPlant';
import UserProfile from './Components/UserProfile';


import './App.css';

const initialSignUpFormValues = {
  username: '',
  email: '',
  phone: '',
};

const initialSignUpFormErrors = {
  username: '',
  email: '',
  phone: '',
};

const initialUsers = [];

const initialDisabled = false;

function App() {

  const [users, setUsers] = useState(initialUsers);
  const [signUpFormValues, setSignUpFormValues] = useState(initialSignUpFormValues);
  const [signUpFormErrors, setSignUpFormErrors] = useState(initialSignUpFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled)

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/user', newUser)
      .then(res => {
        setUsers([...users, res.data])
        console.log('Post response: ', res.data)
      })
      .catch(err => {
        console.log('Error: ', err)
        return "There was an error..."
      })
      .finally(setSignUpFormValues(initialSignUpFormValues))
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setSignUpFormErrors({ ...signUpFormErrors, [name]: '' }))
      .catch(err => setSignUpFormErrors({ ...signUpFormErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate(name, value)
    setSignUpFormValues({
      ...signUpFormValues, [name]: value
    })
  }

  const signUpFormSubmit = () => {
    const newUser = {
      username: signUpFormValues.username.trim(),
      email: signUpFormValues.email.trim(),
      phone: signUpFormValues.phone.trim(),
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    schema.isValid(signUpFormValues).then(valid => setDisabled(!valid))
  }, [signUpFormValues])

  return (
    <div className="App">
      <NavBar />
      <h1>Water My Plants</h1>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/signup'>
          <SignUp 
            values={signUpFormValues}
            change={inputChange}
            disabled={disabled}
            submit={signUpFormSubmit}
            errors={signUpFormErrors} 
            />
        </Route>
        <PrivateRoute path='/myplants' component={MyPlants} />
        <PrivateRoute path='/addplant' component={AddPlant} />
        <PrivateRoute path='/editplant' component={EditPlant} />
        <PrivateRoute path='/myprofile' component={UserProfile} />
      </Switch>
    </div>
  );
}

export default App;
