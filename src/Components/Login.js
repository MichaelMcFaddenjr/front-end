import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

//this component is for login in  
//Unit 3 student can handle this because we will use axiosWithAuth

const Login = (props) => {

  const [ login, setLogin ] = useState ({
    username: "",
    password: ""
  });

  const [ error, setError ] = useState ("");

  let history = useHistory();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios 
      .post('https://ft-water-my-plants-3.herokuapp.com/api/users/login', login)
      .then(res=>{
        localStorage.setItem('token', res.data.payload);
        history.push('/myplants');
      })
      .catch(err=>{
        console.log(err);
        setError('Username or Password are incorrect')
      })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <label>Username
          <input
            type="text"
            name="username"
            value={login.username}
            onChange={handleChange}
          />
        </label>
        <label>Password
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
          />
        </label>
        <button onSubmit={submitHandler}>Login</button>
      </form>
      {error ? <p>{error} </p> : null}
    </div>
  );
}

export default Login;