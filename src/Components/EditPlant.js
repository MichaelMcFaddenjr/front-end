import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';


//This component will give the user the ability to edit plants they have already created
//When this form appears, the currently stored info should render and a post call needs to be made on submission
//Make sure we are matching backend keys  

const EditPlant = (props) => {
  const { push } = useHistory();
  const { plant_id } = useParams();
  const user_id = localStorage.getItem('user_id')

  const [ plant, setPlant ] = useState({});

  useEffect(()=>{
    axiosWithAuth()
    .get(`/plants/${plant_id}`)
    .then(res=>{
      setPlant(res.data)
    })
    .catch(err=>{
      console.log(err);
    })
  }, []);

  const handleChange = (e) =>{
    setPlant({
      ...plant,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    axiosWithAuth()
      .put(`/plants/${user_id}/${plant_id}`, plant)
      .then(res=>{
        // setPlant(res.data);
        push(`plants/${plant_id}`);
        console.log("handleSubmit:", res);
      })
      .catch(err=>{
        console.log(err.Response.message);
      })
  }

  const { nickname, species, h2o_frequency, image } = plant

  return (
    <div>
      <h1>Edit Your Plant</h1>
      <div>
        <form onSubmit={handleSubmit}>
        <label>Nickname
          <input 
            value={nickname}
            name="nickname"
            type="text"
            onChange={handleChange}
          />
        </label>
        <label>Species
          <input
            value={species}
            name= "species"
            type= "text"
            onChange={handleChange}
          />
        </label>
        <label>Water Frequency (# of days)
          <input  
            value={h2o_frequency}
            name="h2o_frequency"
            type="number"
            onChange={handleChange}
          />
        </label>
        <label>Image
          <input
            value={image}
            name="image"
            type="null"
            onChange={handleChange}
          />
        </label>
        <button onClick={handleSubmit}>Save Changes</button>
        <Link to={'/myplants'}><button>Cancel</button></Link>
        </form>
      </div>
    </div>
  );
}

export default EditPlant;