import React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Wrapper>
      <p className="logo-name">Book Club</p>
      <div className="nav-item-container">
        <p>Books</p>
        <p>Requests</p>
        <p>Trades</p>
        <p>Users</p>
      </div>
      <Link className="login-btn-container" to='authentication-page'>Login/Register</Link>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  height: 300px;
  padding-top: 3px;
  background-color: var(--color1);
  .logo-name{
    font-size: 27px;
    font-weight: 600;
    margin-left: 10px;
    margin-top: 4px;
  }
  .nav-item-container p{
    margin-left: 10px;
    font-size: 20px;
    color: var(--fontColor1);
  }
  .login-btn-container{
    margin-left: 10px;
    font-size: 20px;
    color: var(--fontColor1);
    text-decoration: none;

  }
  @media (min-width: 600px) {
    .logo-name{
      font-size: 35px;
    }
    .nav-item-container p{
      font-size: 23px;
      margin-top: -10px;
    }
    .login-btn-container{
      font-size: 23px;
      margin-top: -10px;
    }
  }
  @media (min-width: 768px) {
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .logo-name{
      font-size: 25px;
      margin-left: 50px;
    }
    .nav-item-container{
      display: flex;
      flex-direction: row;
    }
    .nav-item-container p{
      font-size: 16px;
      margin-top: 10px;
      margin-left: 30px;
    }
    .login-btn-container{
      font-size: 16px;
      margin-top: 10px;
      margin-right: 70px;
    }
  }
  @media (min-width: 992px) {
    height: 70px;
    .logo-name{
      font-size: 30px;
      margin-left: 80px;
    }
    .nav-item-container p{
      font-size: 20px;
      margin-top: 15px;
      margin-left: 60px;
    }
    .login-btn-container{
      font-size: 20px;
      margin-top: 15px;
      margin-right: 80px;
    }
  }
`
export default Navbar;