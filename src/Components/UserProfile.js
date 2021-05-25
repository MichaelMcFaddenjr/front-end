import React from 'react';
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {useHistory} from 'react-router-dom'
//this component is where a user can view and edit their profile info 
//Their username and phone number should be visible but they should have the ability to edit all including their password

const Page = styled.section``
const Inputs = styled.input`
  width: 7%;
  margin: 0 1rem 0 .5rem;
  border-radius: 5px;
`
const Form = styled.form``
const Button = styled.button``

const UserProfile = () => {

  const [user, setUser] = useState({})

  const user_id = localStorage.getItem('user_id')

  useEffect(()=>{
    axiosWithAuth()
    .get(`/users/${user_id}`)
    .then(res=>{
      setUser(res.data)
    })
    .catch(err=>{
      console.log(err);
    })
  }, []);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const {username, password, phone_number} = user
    axiosWithAuth()
    .put(`/users/${user_id}`, {username, password, phone_number})
    .then(res=>{
      console.log(`confirmed`)
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const {phone_number, password} = user

  return (
    <Page>
      <Form onSubmit={handleSubmit}>
        <label for="password">Change password</label>
        <Inputs
          value={password}
          name="password"
          type="password"
          placeholder= "New password"
          onChange={handleChange}
        />
        <label for="phone_number">Edit phone number</label>
        <Inputs
          value={phone_number}
          name="phone_number"
          type="text"
          onChange={handleChange}
        />
        <Button>Edit my information</Button>
      </Form>
    </Page>
  )
// const {userName, password, phone } = props

//     const {push} = useHistory()
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//     const [edit, setEdit] = useState(false);
//     const [values, setValues] = useState({
//       userName: "",
//       phone: "",
//       password: "",
//     });
  
//     const handleChanges = (e) => {
//       setValues({ ...values, [e.target.name]: e.target.value });
//     };
  
//     // useEffect(()=>{
//     //   axiosWithAuth()
//     //   .get(`/users/${user_id}`)
//     //   .then(res=>{
//     //     setValues(res.data)
//     //   })
//     //   .catch(err=>{
//     //     console.log(err);
//     //   })
//     // }, []);
//     const handleSubmit = (e) => {
//       // e.preventDefault();
//       // setShowSuccessMessage(true);
//       // axiosWithAuth()
//       // .put(`/users/${user_id}`, values)
//       // .then(res=>{
//       //   setValues(res.data);
//       //   push(`/users/${user_id}`);
//       // })
//       // .catch(err=>{
//       //   console.log(err);
//       // })
//     };
    
//     return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <h2>Update Profile Form:</h2>
//         <label>
//           Password:
//           <input
//             name='password'
//             value={values.password}
//             onChange={handleChanges}
//             type={password}
//             />
//         </label>
//         <label>
//           Phone Number:
//           <input
//             name='phone'
//             value={values.phone}
//             onChange={handleChanges}
//             />
//         </label>
//         <button onClick={handleSubmit}>Submit</button>
//       </form>
//       {showSuccessMessage && (
//         <div className="success-message" data-testid="successMessage">
//           <p>
//             Update successful!
//           </p>
//           <p>
//             {values.userName}
//           </p>
//           <p>
//             {values.phone}
//           </p>
//         </div>
//       )}
//     </>
//   );
};
export default UserProfile;