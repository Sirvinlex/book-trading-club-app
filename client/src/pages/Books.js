import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getBooks } from '../features/bookSlice';
import styled from 'styled-components';

const Books = () => {
  const { book, isLoading, createdBook } = useSelector((store) => store.book);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() =>{
    dispatch(getBooks());
  }, [dispatch, createdBook]);

  const handleLoginClick = () =>{
    navigate('/authentication-page');
  };

  const handleUserAddBook = () =>{
    navigate(`/users/user-books/${localStorageUser?.userId}`);
  }

  if (isLoading) return <div style={{textAlign:'center', marginTop:'20px', fontSize:'40px'}}>Loading...</div>
  return (
    <Wrapper>
      <div className='books-container'>
            <div className='books-container-title'></div>
            {
              book.length < 1 ? (
                <div className='empty-book-body'>No books have been added yet</div>
              ) : (
                book.map((item, i) =>{
                  const creatorName = item.creatorName.split(' ')[0];
                  const myLink = `/users/users-details/${item.creatorId}`
                  return(
                    <div key={i} className='books-container-body'>
                      <div className='book-details'>
                        <p className='book-title'>{item.title}</p>
                        <p className='book-description'>{item.description}</p>
                        <p className='creator-details'>
                          from <span><Link style={{textDecoration:'none'}} to={myLink}>{creatorName}</Link></span> in {item.creatorCity}, {item.creatorState}
                        </p>
                      </div>
                      <div className='book-stats'>
                        <p className='request-count'>request: <span className='request-number'>{item.requests}</span></p>
                        <p className='requestor-list'>(Sam, Peter, Chidi, Sam, David, Sam, Peter, Chidi, Sam, David)</p>
                      </div>
                    </div>
                  )
                })
              )
            }
            {/* <div className='books-container-body'>
              <div className='book-details'>
                <p className='book-title'>Book titlt book title Book titlt </p>
                <p className='book-description'>Book description book description </p>
                <p className='creator-details'>from Alex in Lugbe, Abuja</p>
              </div>
              <div className='book-stats'>
                <p className='request-count'>request: 0</p>
                <p className='requestor-list'>(Sam, Peter, Chidi, Sam, David, Sam, Peter, Chidi, Sam, David)</p>
              </div>
            </div> */}
            <div className='books-container-footer'>
                <div className='footer-btn-container'>
                  {localStorageUser ? (
                    <>
                      <button className='request-btn'>New request</button>
                      <button onClick={handleUserAddBook} className='add-btn'>Add book</button>
                    </>
                  ) : (
                    <button onClick={handleLoginClick} className='do-login-btn'>Login to add books and create request</button>
                  )}
                </div>
            </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .books-container{
        margin-top: 45px;
        margin-bottom: 40px;
        width: 100%;
        /* border-top: var(--color2) 1px solid; */
        border: var(--color2) 1px solid;
    }
    .books-container-footer{
        width: 100%;
        background-color: var(--color1);
        height: 60px;
    }
    .books-container-body{
        /* padding-left: 5px; */
        height: 200px;
        width: 100%;
        border-top: var(--color2) 1px solid;
        border-bottom: var(--color2) 1px solid;
    }
    .empty-book-body{
        padding-left: 5px;
        font-size: 25px;
        height: 100px;
        width: 100%;
        border-top: var(--color2) 1px solid;
        border-bottom: var(--color2) 1px solid;
    }
    .book-details{
      margin: 5px;
    }
    .book-stats{
      margin: 5px;
    }
    .book-title{
      font-size: 20px;
      font-weight: 600;
      margin-top: 2px;
    }
    .creator-details{
      font-weight: 600;
      font-size: 13px;
      margin-top: -10px;
    }
    .book-description{
      /* font-weight: 500; */
      font-size: 15px;
      margin-top: -20px;
    }
    .request-count{
      font-weight: 600;
      font-size: 20px;
      margin-top: -5px;
    }
    .requestor-list{
      font-weight: 500;
      margin-top: -20px;
    }
    .books-container-title{
        width: 100%;
        background-color: var(--color1);
        height: 100px;
    }
    .footer-btn-container{
        text-align: center;
    }
    .request-btn{
        width: 100px;
        height: 30px;
        margin-top: 13px;
        margin-right: 3px;
        background-color: var(--backgroundColor);
        color: var(--fontColor1);
        border-radius: 3px;
        border: var(--color2) 1px solid;
        cursor: pointer;
    }
    .add-btn{
        width: 100px;
        height: 30px;
        margin-top: 13px;
        background-color: var(--backgroundColor);
        color: var(--fontColor1);
        border-radius: 3px;
        border: var(--color2) 1px solid;
        cursor: pointer;
    }
    .do-login-btn{
        width: 200px;
        height: 40px;
        margin-top: 10px;
        background-color: var(--backgroundColor);
        color: var(--fontColor1);
        border-radius: 3px;
        border: var(--color2) 1px solid;
        cursor: pointer;
    }
    @media (min-width: 600px) {
      /* .btn-container{
            margin-left: 40px;
            margin-right: 40px;
        } */
    }
    @media (min-width: 768px) {
        /* margin-top: -65px; */
        .books-container{
            width: 82%;
            margin-top: 60px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            border-radius: 5px;
        }
        .books-container-body{
          display: flex;
          flex-direction: row;
          height: 100px;
        }
        .book-details{
          width: 60%;
        }
        .book-stats{
          width: 40%;
        }
        /* .btn-container{
            margin-left: 70px;
            margin-right: 68px;
        }
        .form-title{
            margin-top: 65px;
        } */
    }
    @media (min-width: 992px) {
        /* .btn-container{
            margin-left: 200px;
            margin-right: 198px;
        } */
    }
`


export default Books;