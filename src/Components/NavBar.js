import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Page = styled.section`
  height: 20vh;
  font-family: 'KoHo', sans-serif;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #064420;
`
const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  padding: 0;
`
const Buttons = styled.div`
  display: flex
  justify-content: center;
`
const Button = styled.button`
  font-family: 'KoHo', sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  border: none;
  background-color: inherit;
  margin: 0 1rem;
  color: #064420;

  &:hover{
    text-decoration: underline;
    font-weight: 600
  }
`

//This is our navBar
//on the NavBar there should be links with ability to see 'MyPlants', 'My Profile' and 'Logout'

const NavBar = () => {

  const token = localStorage.getItem('token')
  
  const { push } = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href="/";
  }

  const onClickPlants = (e) =>{
    push('/myplants')
  } 
  const onClickProfile = (e) =>{
    push('/myprofile')
  }
  return (
    <Page>
      <Title>Water My Plants</Title>
      <Buttons>
        
        <Button onClick={onClickPlants}>My Plants</Button>
        <Button onClick={onClickProfile}>My Profile</Button>
        {token ? 
        (<Button onClick={logout}>Logout</Button>)
        :
        (null)
        }
      </Buttons>

    </Page>
  );
}

export default NavBar;