import React, { useState, useEffect } from 'react'
import axios from 'axios';
import * as yup from 'yup';
import schema from '../Validation/signUpFormSchema';
import { useStore } from 'react-redux';

//this is a simple form unit 2 can build  
//only need a username, phone number and password  
//add validation  

const initialSignUpFormValues = {
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

const SignUp = (props) => {

  // const { values, change, disabled, submit, errors } = props;

  const [user, setUser] = useState({});
  const [signUpFormValues, setSignUpFormValues] = useState(initialSignUpFormValues);
  const [signUpFormErrors, setSignUpFormErrors] = useState(initialSignUpFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled)

  const postNewUser = newUser => {
    axios.post('https://ft-water-my-plants-3.herokuapp.com/api/users/register', newUser)
      .then(res => {
        setUser(res.data)
        console.log('Post response: ', res.data)
      })
      .catch(err => {
        console.log('Error: ', err)
        return "There was an error..."
      })
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setSignUpFormErrors({ ...signUpFormErrors, [name]: '' }))
      .catch(err => setSignUpFormErrors({ ...signUpFormErrors, [name]: err.errors[0] }))
  }

  const inputChange = (e) => {
    // validate(name, value)
    // debugger;
    console.log('event target', e.target);
    setUser({
      ...user, [e.target.name]: e.target.value
    })
  }

  const signUpFormSubmit = () => {
    const newUser = {
      username: user.username.trim(),
      password: user.password.trim(),
      phone: user.phone_number.trim(),
    }
    postNewUser(newUser)
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

  const { username, password, phone } = user;
  const { usernameError, passwordError, phoneError } = signUpFormErrors;

  return (
    <div>
      <h1>Plant Card</h1>
      <form id='sign-up-form' onSubmit={signUpFormSubmit}>
        <input 
          type='text'
          name='username'
          placeholder='Enter username'
          value={username}
          onChange={inputChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Enter new password'
          value={password}
          onChange={inputChange}
        />
        <input
          type='text'
          name='phone_number'
          placeholder='Enter phone number'
          value={phone}
          onChange={inputChange}
        />
        <button onClick={signUpFormSubmit} disabled={disabled} id='sign-up-button'>Sign Up</button>
        <div className='form-errors'>{usernameError}</div>
        <div className='form-errors'>{passwordError}</div>
        <div className='form-errors'>{phoneError}</div>
      </form>
    </div>
  );
}

export default SignUp;