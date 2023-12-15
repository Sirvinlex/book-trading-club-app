import React, {useEffect} from 'react';
import { useParams, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../features/usersSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toggleOnHasUpdateProfile } from '../features/authSlice';


const UserDetails = () => {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const { userDetails, isLoading } = useSelector((store) => store.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() =>{
    dispatch(getUserDetails(id));
  }, [id, dispatch]);

  useEffect(() =>{
    dispatch(toggleOnHasUpdateProfile());
  }, [dispatch]);

  if (isLoading) return <div style={{textAlign:'center', marginTop:'20px', fontSize:'40px'}}>Loading...</div>

  const userFirstName = (userDetails?.name && userDetails?.userId !== localStorageUser?.userId) ? `${userDetails?.name.split(' ')[0]}'s` 
  : (userDetails?.name && userDetails?.userId === localStorageUser?.userId) ? 'Your' : '';
  
  const userId = userDetails?.userId ? userDetails?.userId : '';


  const handleUserBooks = () =>{
    navigate(`/users/user-books/${id}`, { relative: "path" });
  };

  return (
    <Wrapper>
      <p className='details-title'>
        <span id='span1'>{userFirstName}</span> <span id='span2'>Profile</span>
      </p>
      <p>Full Name: {userDetails?.name}</p>
      <p>City: {userDetails?.city}</p>
      <p>State: {userDetails?.state}</p>
      <p>Address: {userDetails?.address}</p>
      {/* <p>Books: {userDetails?.books}</p> */}
      <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
        <div className='book-div'>Books: {userDetails?.books}</div>
        <div className='request-div'>Active Requests: {userDetails?.activeRequest}</div>
        <div className='trade-div'>Completed Trades: {userDetails?.completedTrades}</div>
      </div>
      <div className='btn-container'>
        <button onClick={handleUserBooks} className='book-btn' type='button'>See {userFirstName} Books</button>
        {localStorageUser?.userId === userId ? (
          <button onClick={() => navigate(`/edit-profile/${localStorageUser?.userId}`)} className='edit-btn' type='button'>Update Profile</button>
        ) : null}
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  margin-left: 7px;
  margin-right: 7px;
  margin-bottom: 20px;
  #span1{
    font-weight: 600;
    font-size: 30px;
  }
  #span2{
    font-size: 23px;
  }
  .book-btn:hover{
    background-color: var(--btnColor);
    color: white;
  }
  .book-btn{
    border: var(--btnColor) solid 2px;
    background: inherit;
    width: fit-content;
    height: 25px;
    color: var(--btnColor);
    border-radius: 3px;
    margin-right: 3px;
    cursor: pointer;
    margin-top: 5px;
  }
  .edit-btn:hover{
    background-color: var(--btnColor2);
    color: white;
  }
  .edit-btn{
    background: inherit;
    border: var(--btnColor2) solid 2px;
    width: fit-content;
    height: 25px;
    color: var(--btnColor2);
    border-radius: 3px;
    cursor: pointer;
    margin-top: 5px;
  }
  .book-div{
    height: 15px;
    width: fit-content;
    font-size: 13px;
    background-color: var(--btnColor);
    color: white;
    margin-right: 5px;
    padding: 2px 5px 6px 5px;
    /* border-radius: 3px; */
    margin-bottom: 3px;
  }
  .request-div{
    height: 15px;
    width: fit-content;
    font-size: 13px;
    background-color: var(--btnColor2);
    color: white;
    margin-right: 5px;
    padding: 2px 5px 6px 5px;
    /* border-radius: 3px; */
    margin-bottom: 3px;
  }
  .trade-div{
    height: 15px;
    width: fit-content;
    font-size: 13px;
    background-color: #277d4c;
    color: white;
    margin-right: 5px;
    padding: 2px 5px 6px 5px;
    /* border-radius: 3px; */
    margin-bottom: 3px;
  }
`

export default UserDetails;