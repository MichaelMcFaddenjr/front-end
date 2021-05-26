import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import schema from '../Validation/signUpFormSchema';
import { useHistory } from 'react-router';
import StyledForm from '../StyledForm';
import '../SignUp.css';

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
    <div className='form-container'>
      <StyledForm id='sign-up-form' onSubmit={handleSubmit}>
      <h1>Sign Up!</h1>
        <label>Username<span> *</span>
          <input 
            type='text'
            name='username'
            value={user.username}
            onChange={handleChange}
          />
        </label>
        {signUpFormErrors.username && <div className='form-errors'>{signUpFormErrors.username}</div>}
        <label>Password<span> *</span>
          <input
            type='password'
            name='password'
            value={user.password}
            onChange={handleChange}
          />
        </label>
        {signUpFormErrors.password && <div className='form-errors'>{signUpFormErrors.password}</div>}
        <label>Phone Number<span> *</span>
          <input
            type='text'
            name='phone_number'
            value={user.phone_number}
            onChange={handleChange}
          />
        </label>
        {signUpFormErrors.phone_number && <div className='form-errors'>{signUpFormErrors.phone_number}</div>}
        <button id='sign-up-button' disabled={disabled}>Sign Up</button>
      </StyledForm>
    </div>
  );
}

export default SignUp;