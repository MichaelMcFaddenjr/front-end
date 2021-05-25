import React from 'react';
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Page = styled.section`
  background-image: url('http://www.adventurewildlife.in/wp-content/uploads/2019/06/571962-plants-1.jpg');
  background-repeat: no-repeat;
  background-position: center;
  padding: 4rem 8rem;
  margin: 2rem auto 0;
  font-family: 'KoHo', sans-serif;
  font-weight: 500;
  font-size: 1.75rem;
`
const Cont = styled.div`
  margin: 1rem;
`
const Inputs = styled.input`
  margin-left: .5rem;
  padding: 0 1rem 0 .5rem;
  border-radius: 5px;
  font-size: 1.75rem;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Button = styled.button`
  font-family: 'KoHo', sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  border: none;
  background-color: rgba(6,68,32,0.3);
  border-radius: 10px;
  padding: .25rem .5rem;
  width: 15rem;

  &:hover{
    text-decoration: underline;
    font-weight: 600
}
`
const InfoDiv = styled.div`
  width: 80%;

`
const Info = styled.p``

const UserProfile = () => {

  const [edit, setEdit] = useState(false)
  const [user, setUser] = useState({})

  const user_id = localStorage.getItem('user_id')

  useEffect(()=>{
    axiosWithAuth()
    .get(`/users/${user_id}`)
    .then(res=>{
      setUser(res.data)
      setEdit(false)
    })
    .catch(err=>{
      console.log(err);
    })
  }, []);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  console.log(user)

  const handleSubmit = e => {
    e.preventDefault()
    const {username, password, phone_number} = user
    axiosWithAuth()
    .put(`/users/${user_id}`, {username, password, phone_number})
    .then(() =>{
      setEdit(false)
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const editChange = () => {
    setEdit(true)
  }

  const {username, phone_number, password} = user

  return (
    <Page>
      {edit === true ? (
          <Form onSubmit={handleSubmit}>
            <Cont><label for="password">Change password</label>
            <Inputs
              value={password}
              name="password"
              type="password"
              placeholder= "New password"
              onChange={handleChange}
            />
            </Cont>
            <Cont>
            <label for="phone_number">Edit phone number</label>
            <Inputs
              value={phone_number}
              name="phone_number"
              type="text"
              onChange={handleChange}
            />
            </Cont>
            <Button>Edit my information</Button>
          </Form>
        )
      : (
        <InfoDiv>
          <Info>Username: {username}</Info>
          <Info>Phone number: {phone_number}</Info>
          <Button onClick={() => {editChange()}}>Edit my phone and password</Button>
        </InfoDiv>
        )
      }
      
    </Page>
  )
};
export default UserProfile;