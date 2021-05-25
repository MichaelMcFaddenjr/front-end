import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar.js';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth.js';
import Plant from './Plant'

//this page will render all of the users plant cards. 
//There should be an add plant button.

const MyPlants = () => {
  
  const [myPlants, setMyPlants] = useState([]);
  const user_id = localStorage.getItem('user_id');
;

  useEffect( () => {
      // needed to set a function that handled the axios.get for it to render a .map of the array
      const data = () => {
        axiosWithAuth()
            .get(`/users/${user_id}/plants`)
            .then( res => {
                setMyPlants( res.data );
                     })
                     .catch( err => console.error( "darn... nothing: ", err) );
      };
      data();
  }, 
  [] );

  return (
    <div>
        <h1>My Plants</h1>
        {myPlants.map(plant=>
            <Plant key={myPlants.id} plant={plant}/>)}
    </div>
);
};

export default MyPlants;