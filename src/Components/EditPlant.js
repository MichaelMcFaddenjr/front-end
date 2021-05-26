import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import StyledForm from '../StyledForm';

//This component will give the user the ability to edit plants they have already created
//When this form appears, the currently stored info should render and a post call needs to be made on submission
//Make sure we are matching backend keys  

const EditPlant = ({ close }) => {
  const { push } = useHistory();
  const { plant_id } = useParams();
  // const user_id = localStorage.getItem('user_id')

  const [ plant, setPlant ] = useState({});

  const history = useHistory();

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
      .put(`/plants/${plant_id}`, plant)
      .then(res=>{
        history.push('/myplants');
        close();
      })
      .catch(err=>{
        console.log(err);
      })
  }

  const { nickname, species, h2o_frequency, image } = plant

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <h1>Edit plant</h1>
        <label>Nickname: 
          <input 
            value={nickname}
            name="nickname"
            type="text"
            onChange={handleChange}
          />
        </label>
        <label>Species:
          <input
            value={species}
            name= "species"
            type= "text"
            onChange={handleChange}
          />
        </label>
        <label>Water Frequency (in days):
          <input  
            value={h2o_frequency}
            name="h2o_frequency"
            type="number"
            onChange={handleChange}
          />
        </label>
        <label>Image (URL):
          <input
            value={image}
            name="image"
            type="text"
            onChange={handleChange}
          />
        </label>
        <button id='add-button' onClick={handleSubmit}>Save Changes</button>
        <button id='cancel-button' onClick={close}>Cancel</button>
      </StyledForm>
    </div>
  );
}

export default EditPlant;