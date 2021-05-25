import axios from 'axios';



export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'https://ft-water-my-plants-3.herokuapp.com/api',
    headers: {
      Authorization: token,
    }
  })
}