import React, { useState } from 'react';
import EditPlant from '../EditPlant'
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { Modal } from 'react-responsive-modal';
import '../../Modal.css';
import '../../Plants.css';

//this is where we will build out each plant card with the data we want to display for each plant
//Each plant card should have a button to edit and delete the selected plant 

const Plant = ({ key, plant, setMyPlants, myPlants, user_id}) => {

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const onClickDelete = (plant_id) => {
    axiosWithAuth()
    .delete(`/plants/${user_id}/${plant.plant_id}`)
    .then(res=>{
      setMyPlants(myPlants.filter((plant)=> plant.plant_id !== plant_id))
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const onClickEdit = (e) => {
    setEdit(!edit);
    setOpen(true);
  }

  const onCloseModal = () => {
    setOpen(false);
    setEdit(!edit);
  }

  return (
    <div>
      <h2>{plant.nickname}</h2>
      <img className="plant-img" src={plant.image} alt = {plant.nickname}/>
      <h3>{plant.species}</h3>
      <h3>Water Frequency: Every {plant.h2o_frequency} days</h3>

      { edit ? (
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{modal: 'customModal'}}
          >
            <EditPlant close={onCloseModal} plant_id={plant.plant_id}/>
          </Modal>)
        : null}

      <div className='btn-ctn'>
        <button className='edit-btn' onClick={onClickEdit}>Edit</button>
        <button className='delete-btn' onClick={onClickDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Plant;