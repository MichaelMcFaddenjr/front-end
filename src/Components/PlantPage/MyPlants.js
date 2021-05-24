import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

//this page will render all of the users plant cards. 
//There should be an add plant button.

const MyPlants = () => {
  
  const [myPlant, setMyPlant] = useState([]);

  useEffect( () => {
      // needed to set a function that handled the axios.get for it to render a .map of the array
      const data = () => {
          axios.get(`https://ft-water-my-plants-3.herokuapp.com/api/plants/:plant_id`)
                     .then( res => {
                         console.log( res.data );
                         setMyPlant( res.data.data );
                     } )
                     .catch( err => console.error( "darn... nothing: ", err) );
      };
      data();
  }, 
  [] );

  return (
    <>
        <NavBar/>
        <section className="plant-container">
            {myPlant.map( ( res ) => (
                <Link to={`/myplants${res.id}`} key={res.id} className="plant-link">
                    <div className="plant-card">
                            <h2 className="plant-name">{res.first_name} {res.last_name}</h2>
                            <h3 className='watering-instructions-title'> Watering Instructions: </h3>
                            <p className='watering-instructions'></p>
                    </div>
                    <div className="button-container">
                            <button className="add-plant-button">
                              Add Plant
                            </button>
                    </div>  
                </Link>
            ) )}
        </section>
    </>
);
};

export default MyPlants;