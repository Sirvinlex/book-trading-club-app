import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';

const Navbar = () => {
  
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const ownerFirstName = localStorageUser?.name.split(' ')[0];
  const [showProfile, setShowProfile] = useState(false);
  const [showProfile2, setShowProfile2] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [showRequest2, setShowRequest2] = useState(false);
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();
  const ref = useRef();
  const ref2 = useRef();
  
  const handleProfileClick = () =>{
    navigate(`/users/users-details/${localStorageUser.userId}`);
    // setShowProfile(false);
    setClicked(true);
  };

  const handleEditProfile = () =>{
    navigate(`/edit-profile/${localStorageUser?.userId}`);
    // setShowProfile(false);
    setClicked(true);
  };

  const handleMyBooks = () =>{
    navigate(`users/user-books/${localStorageUser?.userId}`);
    setShowProfile(false);
    setShowRequest(false);
    setClicked(true);
  };

  const handleLogout = () =>{
    localStorage.removeItem("user");
    navigate('/');
    // setShowProfile(false);
    setClicked(true);
  };

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showProfile && ref.current && !ref.current.contains(e.target)) {
        setShowProfile(false)
      }
      
      if (showRequest && ref2.current && !ref2.current.contains(e.target)) {
        setShowRequest(false)
      }
      
    }

    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [showProfile, showRequest])

  useEffect(() =>{
    if(clicked){
      setShowRequest(false);
      setShowProfile(false);
      setClicked(false);
    }
  }, [clicked]);
  return (
    <Wrapper>
      <p className="logo-name">Book Club</p>
      <div className="nav-item-container">
        <p><Link style={{textDecoration:'none', color:'var(--fontColor1)'}} to='books'>Books</Link></p>
        {/* <p style={{cursor:'pointer', display:'flex', flexDirection:'row'}} onClick={() => setShowRequest((prevState) => !prevState)}>
          <span>Requests</span> {localStorageUser ? <AiFillCaretDown className="request-icon"/> : null}
        </p> */}
        {/* ///////////// */}
        <div className="big-screen-request">
          <ul className="nav-request-container" onClick={() => setShowRequest((prevState) => !prevState)}>
            <li className="nav-request" style={{position:'relative'}}>Requests
              { showRequest ? (
                <ul ref={ref2} id="request-container">
                  <li>
                    <Link onClick={() => setClicked(true)} style={{textDecoration:'none', color:'var(--fontColor1)'}} to='books/requests'>
                      Active Requests
                    </Link>
                  </li>
                  <li onClick={() => {
                        if(!localStorageUser) alert('Login/Create account to create request')
                        else {
                          navigate('/books/create-request');
                          setClicked(true);
                        }
                      }} style={{cursor: 'pointer'}}>
                      Create Request
                  </li>
                  <li style={{cursor: 'pointer'}} onClick={ () =>{
                    !localStorageUser ? alert('Login/Create account to add books to exchange') : handleMyBooks();
                    setClicked(true);
                  }}>
                    Add Book
                  </li>
                </ul>
              ) : null}
            </li> {localStorageUser ? <AiFillCaretDown className="request-icon"/> : null}
          </ul>
        </div>
         
        <div className="small-screen-request">
          <ul className="nav-request-container" onClick={() => setShowRequest2((prevState) => !prevState)}>
            <li className="nav-request" style={{position:'relative'}}>Requests
              { showRequest2 ? (
                <ul id="request-container">
                <li>
                  <Link onClick={() => setClicked(true)} style={{textDecoration:'none', color:'var(--fontColor1)'}} to='books/requests'>
                    Active Requests
                  </Link>
                </li>
                <li onClick={() => {
                      if(!localStorageUser) alert('Login/Create account to create request')
                      else {
                        navigate('/books/create-request');
                        setClicked(true);
                      }
                    }} style={{cursor: 'pointer'}}>
                    Create Request
                </li>
                <li style={{cursor: 'pointer'}} onClick={ () =>{
                  !localStorageUser ? alert('Login/Create account to add books to exchange') : handleMyBooks();
                  setClicked(true);
                }}>
                  Add Book
                </li>
              </ul>
              ) : null}
            </li> {localStorageUser && !showRequest2 ? <AiFillCaretDown className="request-icon"/> : null}
          </ul>
        </div>
         
        {/* ///////////// */}
        

        <p><Link style={{textDecoration:'none', color:'var(--fontColor1)'}} to='trades'>Completed Trades</Link></p>
        <p><Link style={{textDecoration:'none', color:'var(--fontColor1)'}} to='users'>Users</Link></p>
      </div>
      
      {!localStorageUser ? (
        <Link className="login-btn-container" to='authentication-page'>Login/Register</Link>
      ) : (
        // <p className="owner-name" onClick={() => setShowProfile((prevState) => !prevState)}>
        //   <span>{ownerFirstName}</span> {localStorageUser ? <AiFillCaretDown className="user-icon"/> : null}
        // </p>
        <>
          <div className="big-screen-profile">
            <ul onClick={() => setShowProfile((prevState) => !prevState)} className="owner-name">
              <li style={{position:'relative', fontWeight:'700'}}>{ownerFirstName}
                {
                  (showProfile && localStorageUser) ? (
                      <ul ref={ref} className="profile-container">
                        <li onClick={handleProfileClick}>Profile</li>
                        <li onClick={handleEditProfile}>Edit Profile</li>
                        <li onClick={handleMyBooks}>My Books</li>
                        <li><button className="logout-btn" type="button" onClick={handleLogout}>Logout</button></li>
                      </ul>
                      
                  ) : null
                }
                
              </li> {localStorageUser ? <AiFillCaretDown className="user-icon"/> : null}
            </ul>
          </div>
          <div className="small-screen-profile">
            <ul onClick={() => setShowProfile2((prevState) => !prevState)} className="owner-name">
              <li style={{position:'relative', fontWeight:'700'}}>{ownerFirstName}
              {(showProfile2 && localStorageUser) ? (
              <div ref={ref2} className="profile-container2">
                <p onClick={handleProfileClick}>Profile</p>
                <p onClick={handleEditProfile}>Edit Profile</p>
                <p onClick={handleMyBooks}>My Books</p>
                <p><button className="logout-btn" type="button" onClick={handleLogout}>Logout</button></p>
              </div>
              ) : null}
                
              </li> {(localStorageUser && !showProfile2) ? <AiFillCaretDown className="user-icon"/> : null}
            </ul>
          </div>
        </>
      )}
      
      
    </Wrapper>
  )
}


const Wrapper = styled.div`
  height: fit-content;
  padding-top: 3px;
  padding-bottom: 10px;
  background-color: var(--color1); 
  .big-screen-profile{
    display: none;
  }
  .small-screen-request{
    /* background-color: red; */
  }
  .big-screen-request{
    display: none;
  }
  ul{
    list-style-type: none;
  }
  ul>li{
    margin-bottom: 5px;
    font-size: 16px;
  }
  /* style={{cursor:'pointer', display:'flex', flexDirection:'row'}} */
  /* .nav-request:hover>#request-container{
      display: block;
  }
  .nav-request-container:hover>.request-icon{
      display: none;
  } */
  #request-container{
    padding-left: 20px;
    /* background-color: red; */
    /* margin-left: 10px; */
    /* margin-top: -22px; */
    /* display: none; */
  }
  #request-container2{
    padding-left: 20px;
    /* background-color: pink; */
    /* margin-left: 10px; */
    margin-top: -22px;
    display: block;
    font-weight: 500;
  }
  .nav-request-container{
    cursor: pointer;
    display: flex;
    flex-direction: row;
  }
  .nav-request{
    font-size: 21px;
    color: var(--fontColor1);
    margin-left: -30px;
    /* background-color: red; */
  }
  
  
  #request-container2>p{
    font-size: 16px;
    margin-top: -15px;
    /* margin-left: 25px; */
  }
  .request-icon{
    margin-top: 8px;
  }
  .request-icon2{
    margin-top: 8px;
    margin-left: -48px;
  }
  
  .user-icon{
    margin-top: 6px;
  }
  .user-icon2{
    margin-top: 6px;
    margin-left: -33px;
  }
  .profile-container{
    padding-top: 0px;
    padding-left: 10px;
    /* padding-left: 10px; */
    margin-left: 10px;
    margin-top: -2px;
    display: none;
  }
  .profile-container2{
    /* position: relative; */
    /* z-index: 1; */
    /* padding-top: -10px; */
    /* padding-left: 10px; */
    /* padding-left: 20px; */
    /* margin-left: -30px; */
    margin-top: -23px;
    margin-bottom: 10px;
    color: var(--fontColor1);
    /* background-color: red; */
    font-weight: 500;
  }
  .profile-container li{
    font-weight: 400;
  }
  .profile-container2 p{
    margin-left: 25px;
    font-size: 16px;
    margin-bottom: -13px;  
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
  .owner-name>li{
    font-size: 20px;
  }
  .owner-name{
    margin-left: -30px;
    font-size: 20px;
    color: var(--fontColor1);
    /* font-weight: 500; */
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
    .big-screen-profile{
      display: block;
    }
    .small-screen-profile{
      display: none;
    }
    .big-screen-request{
      display: block;
    }
    .small-screen-request{
      display: none;
    }
    .request-icon{
      margin-top: -2px;
    }
    .request-icon2{
      margin-top: -2px;
      margin-left: 0px;
    }
    .user-icon{
      margin-top: 8px;
    }
    .user-icon2{
      margin-top: 6px;
      margin-left: 0px;
    }
    #request-container p{
      margin-top: 0px;
    }
    .nav-request{
      font-size: 16px;
      color: var(--fontColor1);
      margin-left: 8px;
      margin-top: -6px;
    }
    /* .nav-request-container:hover>.request-icon{
      display: block;
    }
    .nav-request:hover>#request-container{
      display: block;
    } */
    #request-container{
      position: absolute;
      left: -50%;
      top: 30px;
      /* left: 320px; */
      /* top: 60px; */
      padding-top: 7px;
      background-color: var(--backgroundColor);
      height: fit-content;
      width: 150px;
      box-shadow: 4px 3px 5px #abaaa7, -4px 3px 5px #abaaa7;
      display: block;
    }
    #request-container2{
      display: none;
    }
    ul>li{
    margin-bottom: 5px;
    font-size: 16px;
    }
    .profile-container2{
      display: none;
    }
    .profile-container{
      /* padding-tsop: 6px; */
      position: absolute;
      /* right: 0px; */
      left: -60%;
      top: 37px;
      background-color: var(--backgroundColor);
      height: fit-content;
      width: 100px;
      padding-left: 15px;
      box-shadow: 4px 3px 5px #abaaa7, -4px 3px 5px #abaaa7;
      display: block;
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
      margin-top: 8px;
      margin-right: 50px;
    }
  }
  @media (min-width: 850px) {
    #request-container{
      /* left: 370px; */
    }
  }
  @media (min-width: 850px) {
    #request-container{
      /* left: 420px; */
    }
  }
  @media (min-width: 992px) {
    height: 70px;
    #request-container{
      /* left: 450px; */
      /* top: 70px; */
    }
    .nav-request{
      font-size: 20px;
      color: var(--fontColor1);
      margin-left: 12px;
      margin-top: -1px;
    }
    .profile-container{
      padding-top: 6px;
      position: absolute;
      /* right: 20px; */
      /* top: 70px; */
      height: fit-content;
      width: 130px;
    }
    .request-icon{
      margin-top: 6px;
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
      /* left: 630px; */
    }
  }
`
export default Navbar;