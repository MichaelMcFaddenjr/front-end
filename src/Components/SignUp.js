import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import schema from '../Validation/signUpFormSchema';
import { useStore } from 'react-redux';
import { useHistory } from 'react-router';

//this is a simple form unit 2 can build  
//only need a username, phone number and password  
//add validation  

const initialUserValues = {
  username: '',
  password: '',
  phone_number: '',
};

const initialSignUpFormErrors = {
  username: '',
  password: '',
  phone_number: '',
};

const initialDisabled = false;

const SignUp = () => {

  const [user, setUser] = useState(initialUserValues);
  const [signUpFormErrors, setSignUpFormErrors] = useState(initialSignUpFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled)

  const postNewUser = newUser => {
    axios.post('https://ft-water-my-plants-3.herokuapp.com/api/users/register', user)
    .then(res => {
      console.log('Post response: ', res.data);
      history.push('/');
    })
    .catch(err => {
      console.log('Error: ', err);
      // return "There was an error..."
    })
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => {
        setSignUpFormErrors({ ...signUpFormErrors, [name]: '' });
      })
      .catch(err => {
        setSignUpFormErrors({ ...signUpFormErrors, [name]: err.errors[0] });
      })
  }

  const handleChange = (e) => {
    validate(e.target.name, e.target.value);
    console.log('event target', e.target);
    setUser({
      ...user, [e.target.name]: e.target.value
    });
  }

  const history = useHistory();

  const handleSubmit = (e) => {
    console.log('clicked submit');
    e.preventDefault();
    postNewUser(user);
  }

  useEffect(() => {
    schema.isValid(user).then(valid => setDisabled(!valid))
  }, [user])

  return (
    <div>
      <h1>Plant Card</h1>
      <form id='sign-up-form' onSubmit={handleSubmit}>
        <input 
          type='text'
          name='username'
          placeholder='Enter username'
          value={user.username}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Enter new password'
          value={user.password}
          onChange={handleChange}
        />
        <input
          type='text'
          name='phone_number'
          placeholder='Enter phone number'
          value={user.phone_number}
          onChange={handleChange}
        />
        <button id='sign-up-button' disabled={disabled}>Sign Up</button>
        <div className='form-errors'>{signUpFormErrors.username}</div>
        <div className='form-errors'>{signUpFormErrors.password}</div>
        <div className='form-errors'>{signUpFormErrors.phone_number}</div>
      </form>
    </div>
  );
}

export default SignUp;