import React from 'react';
import EditPlant from '../EditPlant'
import { useHistory } from 'react-router-dom'

//this is where we will build out each plant card with the data we want to display for each plant
//Each plant card should have a button to edit and delete the selected plant 

const Plant = ({ key, plant, setMyPlants, myPlants}) => {
  const { push } = useHistory();
  const onClick = () =>{
    push(`/editplant/${plant.plant_id}`)
  }

  const onClickDelete = (key) => {
    setMyPlants(myPlants.filter(item=>item.key !== key))
    // console.log("delete:", plant_id);
  }

  return (
    <div>
    <h2>{plant.nickname}</h2>
    <h3>{plant.species}</h3>
    <h3>Water Frequency: Every {plant.h2o_frequency} days</h3>
    <div className='btn-ctn'>
      <button onClick={onClick}>Edit</button>
      <button onClick={onClickDelete}>Delete</button>
    </div>
    </div>
  );
}

export default Plant;