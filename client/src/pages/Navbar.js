import React, { useState } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const ownerFirstName = localStorageUser?.name.split(' ')[0];
  const [showProfile, setShowProfile] = useState(false);
  const [showRequest, setShowRequest] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem("user");
    navigate('/');
    setShowProfile(false);
  };

  return (
    <Wrapper>
      <p className="logo-name">Book Club</p>
      <div className="nav-item-container">
        <p>Books</p>
        <p style={{cursor: 'pointer'}} onClick={() => setShowRequest((prevState) => !prevState)}>Requests</p>
        {(showRequest && localStorageUser) ? (
          <div id="request-container">
          <p>All Requests</p>
          <p>Create Request</p>
        </div>
        ) : null}
        <p>Trades</p>
        <p>Users</p>
      </div>
      {!localStorageUser ? (
        <Link className="login-btn-container" to='authentication-page'>Login/Register</Link>
      ) : (
        <p className="owner-name" onClick={() => setShowProfile((prevState) => !prevState)}>{ownerFirstName}</p>
      )}
      {(showProfile && localStorageUser) ? (
        <div className="profile-container">
        <p>Profile</p>
        <p>Edit Profile</p>
        <p>My Books</p>
        <p><button className="logout-btn" type="button" onClick={handleLogout}>Logout</button></p>
      </div>
      ) : null}
    </Wrapper>
  )
}


const Wrapper = styled.div`
  height: fit-content;
  padding-top: 3px;
  padding-bottom: 10px;
  background-color: var(--color1);
  #request-container{
    margin-top: -22px;
  }
  #request-container>p{
    font-size: 16px;
    margin-top: -15px;
    margin-left: 25px;
  }
  .profile-container{
    margin-top: 15px;
  }
  .profile-container p{
    margin-left: 25px;
    font-size: 16px;
    margin-top: -13px;
  }
  .logout-btn{
    border: none;
    background-color: inherit;
    font-size: 16px;
    padding-left: 0px;
    cursor: pointer;
  }
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
  .owner-name{
    margin-left: 10px;
    font-size: 20px;
    color: var(--fontColor1);
    font-weight: 500;
    cursor: pointer;
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
    #request-container{
      display: none;
    }
    .profile-container{
      display: none;
    }
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