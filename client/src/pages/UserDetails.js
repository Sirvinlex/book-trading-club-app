import React, {useEffect} from 'react';
import { useParams, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../features/usersSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const UserDetails = () => {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const { userDetails, isLoading } = useSelector((store) => store.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() =>{
    dispatch(getUserDetails(id));
  }, [id]);


  if (isLoading) return <div style={{textAlign:'center', marginTop:'20px', fontSize:'40px'}}>Loading...</div>

  const userFirstName = (userDetails?.name && userDetails?.userId !== localStorageUser?.userId) ? `${userDetails?.name.split(' ')[0]}'s` 
  : (userDetails?.name && userDetails?.userId === localStorageUser?.userId) ? 'Your' : '';
  
  const userId = userDetails?.userId ? userDetails?.userId : '';

  // const userBooks = (userDetails !== {} && userDetails !== undefined) ? userDetails.books : 0;
  const userBooks = userDetails?.books ? userDetails?.books : 0;

  const handleUserBooks = () =>{
    if (userBooks < 1) {
      if(userDetails?.userId === localStorageUser?.userId) alert('You have not added any book');
      else alert('This user has not added any books');
    }else{}
  };

  return (
    <Wrapper>
      <p className='details-title'>
        {/* {console.log(userDetails)} */}
        <span id='span1'>{userFirstName}</span> <span id='span2'>Profile</span>
      </p>
      <p>Full Name: {userDetails?.name}</p>
      <p>City: {userDetails?.city}</p>
      <p>State: {userDetails?.state}</p>
      <p>Address: {userDetails?.address}</p>
      <p>Books: {userDetails?.books}</p>
      <div className='btn-container'>
        <button onClick={handleUserBooks} className='book-btn' type='button'>See {userFirstName} Books</button>
        {localStorageUser?.userId === userId ? (
          <button onClick={() => navigate(`/edit-profile/${localStorageUser?.userId}`)} className='edit-btn' type='button'>Edit Profile</button>
        ) : null}
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  margin-left: 7px;
  margin-right: 7px;
  #span1{
    font-weight: 600;
    font-size: 30px;
  }
  #span2{
    font-size: 23px;
  }
  .book-btn{
    border: none;
    background: var(--btnColor);
    width: fit-content;
    height: 25px;
    color: white;
    border-radius: 3px;
    margin-right: 3px;
    cursor: pointer;
  }
  .edit-btn{
    background: var(--btnColor2);
    border: none;
    width: fit-content;
    height: 25px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`

export default UserDetails;