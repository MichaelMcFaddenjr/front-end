import axios from 'axios';
import { axiosWithAuth } from './axiosWithAuth';

const fetchPlants = () => {
  return axiosWithAuth()
    .get("/plants")
    .then((res)=>{
      return res;
    })
    .catch((err)=>{
      console.log(err);
    });
}

export default fetchPlants