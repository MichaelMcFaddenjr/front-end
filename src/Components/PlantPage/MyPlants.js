import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth.js';
import Plant from './Plant'
import AddPlant from '../AddPlant.js';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import '../../Modal.css';
import '../../MyPlants.css';

const MyPlants = () => {
  
    const [myPlants, setMyPlants] = useState([]);
    const [add, setAdd] = useState(false);
    const [open, setOpen] = useState(false);
    const user_id = localStorage.getItem('user_id');



    useEffect( () => {
        axiosWithAuth()
            .get(`/users/${user_id}/plants`)
            .then( res => {
                setMyPlants( res.data );
            })
            .catch( err => console.error( "darn... nothing: ", err) );
        }, 
    [myPlants]);

    const onClickAdd = (e) =>{
        setAdd(!add);
        setOpen(true);
    }

    const onCloseModal = () => {
        setOpen(false);
        setAdd(!add);
    }

  return (
    <div>
        <h1 className="my-plants-title">My Plants</h1>

        { add ? (
            <Modal 
                open={open} 
                onClose={onCloseModal} 
                center 
                classNames={{
                    modal: 'customModal',
                    overlay: 'customOverlay',
                }}
            >
                <AddPlant 
                    setAdd={setAdd} 
                    myPlants={myPlants} 
                    setMyPlants={setMyPlants} 
                    user_id={user_id}
                />
            </Modal>)
        : null}

        { add ? null : (<button className='add-plant-btn' onClick={onClickAdd}>Add Plant</button>) }

        {myPlants.map(plant=>
            <Plant plant={plant} setMyPlants={setMyPlants} myPlants={myPlants}/>)}

    </div>

);
};

export default MyPlants;