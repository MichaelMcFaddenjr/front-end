import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as yup from 'yup';
import schema from '../Validation/signUpFormSchema';
import { useStore } from 'react-redux';

//this is a simple form unit 2 can build  
//only need a username, phone number and password  
//add validation  

const initialUserValues = {
  username: '',
  password: '',
  phone_number: '',
};

const initialSignUpFormErrors = {
  username_error: '',
  password_error: '',
  phone_number_error: '',
};

const initialDisabled = false;

const SignUp = () => {

  // const { values, change, disabled, submit, errors } = props;

  const [user, setUser] = useState(initialUserValues);
  // const [signUpFormValues, setSignUpFormValues] = useState(initialSignUpFormValues);
  const [signUpFormErrors, setSignUpFormErrors] = useState(initialSignUpFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled)

  const postNewUser = newUser => {
    axios.post('https://ft-water-my-plants-3.herokuapp.com/api/users/register', newUser)
      .then(res => {
        console.log('Post response: ', res.data);
        setUser(res.data);
      })
      .catch(err => {
        console.log('Error: ', err);
        // return "There was an error..."
      })
  }

  // const validate = (name, value) => {
  //   yup.reach(schema, name)
  //     .validate(value)
  //     .then(() => setSignUpFormErrors({ ...signUpFormErrors, [name]: '' }))
  //     .catch(err => setSignUpFormErrors({ ...signUpFormErrors, [name]: err.errors[0] }))
  // }

  const handleChange = (e) => {
    // validate(e.target.name, e.target.value);
    console.log('event target', e.target);
    setUser({
      ...user, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    console.log('clicked submit');
    const newUser = {
      username: user.username.trim(),
      password: user.password.trim(),
      phone_number: user.phone_number.trim(),
    };
    postNewUser(newUser);
  }

  // useEffect(() => {
  //   schema.isValid(signUpFormValues).then(valid => setDisabled(!valid))
  // }, [signUpFormValues])


//   const handleChange = event => {
//     const { name, value } = event.target;
//     change(name, value);
// }

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   submit();
  // }

  const { username, password, phone_number } = user;
  const { username_error, password_error, phone_number_error } = signUpFormErrors;

  return (
    <div>
      <h1>Plant Card</h1>
      <form id='sign-up-form' onSubmit={handleSubmit}>
        <input 
          type='text'
          name='username'
          placeholder='Enter username'
          value={username}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Enter new password'
          value={password}
          onChange={handleChange}
        />
        <input
          type='text'
          name='phone_number'
          placeholder='Enter phone number'
          value={phone_number}
          onChange={handleChange}
        />
        <button onClick={handleSubmit} disabled={disabled} id='sign-up-button'>Sign Up</button>
        <div className='form-errors'>{username_error}</div>
        <div className='form-errors'>{password_error}</div>
        <div className='form-errors'>{phone_number_error}</div>
      </form>
    </div>
  );
}

export default SignUp;