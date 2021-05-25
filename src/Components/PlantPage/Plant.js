import React from 'react';
import EditPlant from '../EditPlant'
import { useHistory } from 'react-router-dom'

//this is where we will build out each plant card with the data we want to display for each plant
//Each plant card should have a button to edit and delete the selected plant 

const Plant = ({ key, plant}) => {
  const { push } = useHistory();
  const onClick = () =>{
    push(`/editplant/${plant.plant_id}`)
  }

  return (
    <div>
    <h2>{plant.nickname}</h2>
    <h3>{plant.species}</h3>
    <h3>Water Frequency: Every {plant.h2o_frequency} days</h3>
    <div className='btn-ctn'>
      <button component={EditPlant} onClick={onClick}>Edit</button>
      <button>Delete</button>
    </div>
    </div>
  );
}

export default Plant;