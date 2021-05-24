import React from 'react'

//this is a simple form unit 2 can build  
//only need a username, phone number and email  
//add validation  

const SignUp = (props) => {

  const { values, change, disabled, submit, errors } = props;

  const onChange = event => {
    const { name, value } = event.target;
    change(name, value);
}

  const onSubmit = event => {
    event.preventDefault();
    submit();
  }

  return (
    <div>
      <h1>Plant Card</h1>
      <form id='sign-up-form' onSubmit={onSubmit}>
        <input 
          type='name'
          name='username'
          placeholder='Enter username'
          value={values.username}
          onChange={onChange}
        />
          <input
            type='email'
            name='email'
            placeholder='Enter email'
            value={values.email}
            onChange={onChange}
          />
        <input
          type='phone'
          name='phone'
          placeholder='Enter phone number'
          value={values.phone}
          onChange={onChange}
        />
        <button disabled={disabled} id='sign-up-button'>Sign Up</button>
        <div className='form-errors'>{errors.username}</div>
        <div className='form-errors'>{errors.email}</div>
        <div className='form-errors'>{errors.phone}</div>
      </form>
    </div>
  );
}

export default SignUp;