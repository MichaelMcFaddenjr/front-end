import axios from 'axios';

const token = localStorage.getItem('token');

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: 'https://ft-water-my-plants-3.herokuapp.com/api',
    headers: {
      Authorization: token,
    }
  })
}