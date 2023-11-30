import React, { useState } from "react";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getUserDetails } from '../features/usersSlice'
import { Link, useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';

const Navbar = () => {
  
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const ownerFirstName = localStorageUser?.name.split(' ')[0];
  const [showProfile, setShowProfile] = useState(false);
  const [showRequest, setShowRequest] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleProfileClick = () =>{
    navigate(`/users/users-details/${localStorageUser.userId}`);
    setShowProfile(false);
  };

  const handleEditProfile = () =>{
    navigate(`/edit-profile/${localStorageUser?.userId}`);
    setShowProfile(false);
  };

  const handleMyBooks = () =>{
    // navigate(`books/user-books/${localStorageUser?.userId}`);
    navigate(`users/user-books/${localStorageUser?.userId}`);
    setShowProfile(false);
  };

  const handleLogout = () =>{
    localStorage.removeItem("user");
    navigate('/');
    setShowProfile(false);
  };

  return (
    <Wrapper>
      <p className="logo-name">Book Club</p>
      <div className="nav-item-container">
        <p><Link style={{textDecoration:'none', color:'var(--fontColor1)'}} to='books'>Books</Link></p>
        <p style={{cursor:'pointer', display:'flex', flexDirection:'row'}} onClick={() => setShowRequest((prevState) => !prevState)}>
          <span>Requests</span> {localStorageUser ? <AiFillCaretDown className="request-icon"/> : null}
        </p>
        {(showRequest && localStorageUser) ? (
          <div id="request-container">
          <p>
            <Link onClick={() => setShowRequest(false)} style={{textDecoration:'none', color:'var(--fontColor1)'}} to='books/requests'>
              All Requests
            </Link>
          </p>
          <p>
            <Link onClick={() => setShowRequest(false)} style={{textDecoration:'none', color:'var(--fontColor1)'}} to='/books/create-request'>
              Create Request
            </Link>
          </p>
        </div>
        ) : null}
        <p>Trades</p>
        <p><Link style={{textDecoration:'none', color:'var(--fontColor1)'}} to='users'>Users</Link></p>
      </div>
      {!localStorageUser ? (
        <Link className="login-btn-container" to='authentication-page'>Login/Register</Link>
      ) : (
        <p className="owner-name" onClick={() => setShowProfile((prevState) => !prevState)}>
          <span>{ownerFirstName}</span> {localStorageUser ? <AiFillCaretDown className="user-icon"/> : null}
        </p>
      )}
      {(showProfile && localStorageUser) ? (
        <div className="profile-container">
          {/* {console.log(localStorageUser.userId)} */}
        <p onClick={handleProfileClick}>Profile</p>
        <p onClick={handleEditProfile}>Edit Profile</p>
        <p onClick={handleMyBooks}>My Books</p>
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
  .request-icon{
    margin-top: 8px;
  }
  .user-icon{
    margin-top: 6px;
  }
  .profile-container{
    margin-top: -23px;
  }
  .profile-container p{
    margin-left: 25px;
    font-size: 16px;
    margin-top: -13px;
    cursor: pointer;
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
    display: flex;
    flex-direction: row;
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
    .owner-name{
      font-size: 23px;
      margin-top: -10px;
    }
  }
  @media (min-width: 768px) {
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .request-icon{
    margin-top: 4px;
    }
    .user-icon{
      margin-top: 3px;
    }
    #request-container p{
      margin-top: 0px;
    }
    #request-container{
      /* display: none; */
      position: absolute;
      left: 320px;
      top: 60px;
      /* background-color: red; */
      padding-top: 7px;
      background-color: var(--backgroundColor);
      height: fit-content;
      width: 150px;
      box-shadow: 4px 3px 5px #abaaa7, -4px 3px 5px #abaaa7;
    }
    .profile-container{
      /* display: none; */
      padding-top: 6px;
      position: absolute;
      right: 20px;
      top: 60px;
      background-color: var(--backgroundColor);
      /* background-color: red; */
      height: fit-content;
      width: 130px;
      box-shadow: 4px 3px 5px #abaaa7, -4px 3px 5px #abaaa7;
    }
    .profile-container p{
      margin-top: 0px;
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
    .owner-name{
      font-size: 16px;
      margin-top: 10px;
      margin-right: 70px;
    }
  }
  @media (min-width: 850px) {
    #request-container{
      left: 370px;
    }
  }
  @media (min-width: 850px) {
    #request-container{
      left: 420px;
    }
  }
  @media (min-width: 992px) {
    height: 70px;
    #request-container{
      left: 450px;
      top: 70px;
    }
    .profile-container{
      padding-top: 6px;
      position: absolute;
      right: 20px;
      top: 70px;
      height: fit-content;
      width: 130px;
    }
    .request-icon{
    margin-top: 7px;
    }
    .user-icon{
      margin-top: 5px;
    }
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
    .owner-name{
      font-size: 20px;
      margin-top: 15px;
      margin-right: 80px;
    }
  }
  @media (min-width: 1100px) {
    #request-container{
      left: 630px;
    }
  }
`
export default Navbar;