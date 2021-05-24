import React from 'react';
import { useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
//this component is where a user can view and edit their profile info 
//Their username and phone number should be visible but they should have the ability to edit all including their password
const UserProfile = (props) => {

const {userName, password, phone } = props()

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [edit, setEdit] = useState(false);
    const [values, setValues] = useState({
      userName: "",
      phone: "",
      password: "",
    });
  
    const handleChanges = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
  
    // useEffect(()=>{
    //   axiosWithAuth()
    //   .get(`/users/${user_id}`)
    //   .then(res=>{
    //     setValues(res.data)
    //   })
    //   .catch(err=>{
    //     console.log(err);
    //   })
    // }, []);
//
    const handleSubmit = (e) => {
      e.preventDefault();
      setShowSuccessMessage(true);
      axiosWithAuth()
      .put(`/users/${user_id}`, values)
      .then(res=>{
        setValues(res.data);
        push(`/users/${user_id}`);
      })
      .catch(err=>{
        console.log(err);
      })
    };
    
    return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Update Profile Form:</h2>
        <label>
          Password:
          <input
            name='password'
            value={values.password}
            onChange={handleChanges}
            type={password}
            />
        </label>
        <label>
          Phone Number:
          <input
            name='phone'
            value={values.phone}
            onChange={handleChanges}
            />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>

      {showSuccessMessage && (
        <div className="success-message" data-testid="successMessage">
          <p>
            Update successful!
          </p>
          <p>
            {values.userName}
          </p>
          <p>
            {values.phone}
          </p>
        </div>
      )}
    </>
  );
};

export default UserProfile;