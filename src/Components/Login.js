import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../Login.css';

const Login = (props) => {

  const token = localStorage.getItem("token")

  const [ login, setLogin ] = useState ({
    username: "",
    password: ""
  });
  

  const [ error, setError ] = useState ("");

  let history = useHistory();

  useEffect(()=>{
    token && history.push('/myplants')
  }, [])

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
        console.log(res);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_id', res.data.user_id)
        history.push('/myplants');
      })
      .catch(err=>{
        console.log(err);
        setError('Username or Password are incorrect')
      })
  }

  return (
  <div className="login">
    <div className="login-container">
      <span className="login-form-title">Log In:</span>
      <form className="login-form" onSubmit={submitHandler}>
        <label className="username-textbox">
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Username"
            value={login.username}
            onChange={handleChange}
          />
        </label>
        <label className="password-textbox">
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={handleChange}
          />
        </label>
        <div className="btn-container">
        <button className="login-form-btn" onSubmit={submitHandler}>Log In</button>
          <div className="bottom">
            <span className="txt1">Don’t have an account?</span>
            <a href="/signup" className="txt3">Sign Up Here!</a>
          </div>
        </div>
      </form>
    </div>
      {error ? <p>{error} </p> : null}
    </div>
  );
}

export default Login;