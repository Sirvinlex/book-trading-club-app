import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/usersSlice';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

{/* <Link to='users/:id'>Login/Register</Link> */}

// users/:id
const UsersPage = () => {
    const { users, isLoading } = useSelector((store) => store.users);
    const myUsers = users ? users : [];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() =>{
        dispatch(getUsers());
    }, []);

    if (isLoading) return <div style={{textAlign:'center', marginTop:'20px', fontSize:'40px'}}>Loading...</div>
  return (
    <Wrapper>
      <p className='user-title'>Users</p>
      <div className='user-page'>
        {myUsers.map((item, i) =>{
          const id = item?._id;
          return(
            <div key={i} className='users-container'>
              {/* <p className='user-name'>{item.name}</p> */}
              <p className='user-name' onClick={() => navigate(`users-details/${id}`)}>{item.name}</p>
              <p>City: {item.city}</p>
              <div style={{display:'flex', flexDirection:'row'}}>
                <div className='book-div'>Books: {item.books}</div><div className='request-div'>Active Requests: 1</div>
              </div>
              <p className='joined'>Joined: {item.createdAt}</p>
            </div>
          )
        })}
        {/* <div className='users-container'>
          <p className='user-name'>Name: USer Name user name</p>
          <p>City: User city user city</p>
          <p style={{display:'flex', flexDirection:'row'}}>
            <div className='book-div'>Books: 2</div><div className='request-div'>Active Request: 1</div>
          </p>
          <p className='joined'>Joined: date date</p>
        </div> */}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .joined{
    font-size: 13px;
    font-weight: 400;
  }
  .user-page{
    height: fit-content;
    border: var(--color1) 1px solid;
    margin-top: 20px;
    margin-bottom: 30px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 4px;
  }
  .user-title{
    text-align: center;
    font-weight: 600;
    font-size: 40px;
    margin-bottom: -15px;
  }
  .user-name:hover{
    text-decoration: underline;
  }
  .user-name{
    color: var(--btnColor);
    font-weight: 600;
    cursor: pointer;
  }
  .users-container p{
    margin-top: 2px;
    margin-bottom: 5px;
  }
  .users-container{
    border-bottom: var(--color1) 1px solid;
    height: fit-content;
    padding-left: 5px;
  }
  .book-div{
    height: 15px;
    width: fit-content;
    font-size: 13px;
    background-color: var(--btnColor);
    color: white;
    margin-right: 5px;
    padding: 2px 5px 6px 5px;
    border-radius: 3px;
  }
  .request-div{
    height: 15px;
    width: fit-content;
    font-size: 13px;
    background-color: var(--btnColor2);
    color: white;
    margin-right: 5px;
    padding: 2px 5px 6px 5px;
    border-radius: 3px;
  }
  @media (min-width: 768px) {
    .user-page{
      margin-left: 30px;
      margin-right: 30px;
    }
    .users-container{
      padding-left: 7px;
    }
  }
  @media (min-width: 992px) {
    .user-page{
      margin-left: 100px;
      margin-right: 100px;
    }
  }
`

export default UsersPage;