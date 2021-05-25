import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

//This is our add a plant form 
//Unit 2 students can build out most of this component 
//be sure to look at the backend keys and make sure yours match

const AddPlant = ({ setAdd, myPlants, setMyPlants, user_id }) => {
  const { push } = useHistory();

  const [addPlant, setAddPlant] = useState({
    nickname: "",
    species: "",
    h2o_frequency: "",
    image: null
  });

  const handleChange = (e) => {
    setAddPlant({
      ...addPlant,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
    .post(`/plants/user/${user_id}`, addPlant)
    .then(res=>{
      // setMyPlants(res.data);
      push(`/myplants`);
      setAdd(false)
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const handleCancel = (e) => {
    setAdd(false)
  }

  const { nickname, species, h2o_frequency, image } = addPlant

  return (
    <div>
      <h1>Add A Plant</h1>
      <form onSubmit={handleSubmit}>
        <label>Nickname:</label>
        <input
          name="nickname"
          type="text"          
          value={nickname}
          onChange={handleChange}
        />
        <label>Species:</label>
        <input
          name="species"
          type="text"
          value={species}
          onChange={handleChange}
        />
        <label>Water Frequency (in days):</label>
        <input
          name="h2o_frequency"
          type="number"
          value={h2o_frequency}
          onChange={handleChange}
        />
        <label>Image (URL):</label>
        <input
          name="image"
          type="text"
          value={image}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Add Plant</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default AddPlant;