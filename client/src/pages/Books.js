import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getBooks } from '../features/bookSlice';
import styled from 'styled-components';
import { FaTimes } from "react-icons/fa";
import { deleteBook } from '../features/bookSlice';

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
  };

  const handleDeleteBook = (bookId) =>{
    dispatch(deleteBook(bookId));
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    console.log(name)
  };

  let myArr = []
  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    const bookData = JSON.parse(e.currentTarget.getAttribute('data-test-id'));
    if (e.target.checked){
      myArr.push(bookData)
    }else{
      myArr = myArr.filter((item) => item.bookId !== bookData.bookId)
    }
    console.log(myArr)
  };

  if (isLoading) return <div style={{textAlign:'center', marginTop:'20px', fontSize:'40px'}}>Loading...</div>
  return (
    <Wrapper>    
      <form onSubmit={handleSubmit} className='books-container'>
            <div className='books-container-title'>Books Available for Trade</div>
            {
              book.length < 1 ? (
                <div className='empty-book-body'>No books have been added yet</div>
              ) : (
                book.map((item, i) =>{
                  const creatorName = item.creatorName.split(' ')[0];
                  const myLink = `/users/users-details/${item.creatorId}`
                  const itemId = item._id;
                  const bookId = item._id, bookCreatorName = item.creatorName, creatorId = item.creatorId, bookDesc = item.description, 
                  bookTitle = item.title, bookReq = item.requests;
                  const itemData = `{"bookId": "${bookId}", "bookCreatorName": "${bookCreatorName}", "creatorId": "${creatorId}",
                   "bookDesc": "${bookDesc}", "bookTitle": "${bookTitle}", "bookReq": ${bookReq}  }`
                  return(
                    <div key={item._id}>
                      {/* {console.log(item)} */}
                        <label className='books-container-body'>
                        <input onChange={handleChange} type="checkbox" id="books" name="bookData" value={item._id} data-test-id={itemData}/>
                        <div className='book-details'>
                          <p className='book-title'>{item.title}</p>
                          <p className='book-description'>{item.description}</p>
                          <p className='creator-details'>
                            from <span><Link style={{textDecoration:'none', fontWeight:'800'}} to={myLink}>{creatorName}</Link></span>
                            {' '} in {item.creatorCity}, {item.creatorState}
                          </p>
                        </div>
                        <div className='book-stats'>
                          <p className='request-count'>requests: <span className='request-number'>{item.requests}</span></p>
                          <p className='requestor-list'>(Sam, Peter, Chidi, Sam, David, Sam, Peter, Chidi, Sam, David)</p>
                        </div>
                        { localStorageUser?.userId === item.creatorId ? (
                          <button onClick={() => handleDeleteBook(itemId)} className='remove-book-btn'><FaTimes size={30}/></button>
                        ) : null}
                      </label>
                    </div>
                    
                  )
                })
              )
            }
            
            <div className='books-container-footer'>
                <div className='footer-btn-container'>
                  {localStorageUser ? (
                    <>
                      <button type='submit' className='request-btn'>New request</button>
                      <button onClick={handleUserAddBook} className='add-btn'>Add book</button>
                    </>
                  ) : (
                    <button onClick={handleLoginClick} className='do-login-btn'>Login to add books and create request</button>
                  )}
                </div>
            </div>
        </form>
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
        color: var(--fontColor1);
    }
    .books-container-footer{
        width: 100%;
        background-color: var(--color1);
        height: 60px;
    }
    .books-container-body{
        /* padding-left: 5px; */
        height: fit-content;
        width: 100%;
        /* border-top: var(--color2) 1px solid; */
        border-bottom: var(--color2) 1px solid;
        position: relative;
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
      /* position: relative; */
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
      /* font-size: 12px; */
      margin-top: -20px;
    }
    .remove-book-btn{
      margin-right: 5px;
      background-color: red;
      color: white;
      border: none;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      width: 20px;
      height: 20px;
      position: absolute;
      right: 5px;
      bottom: 5px;
      margin-top: -10px;
      cursor: pointer;
    }
    .books-container-title{
        width: 100%;
        background-color: var(--color1);
        border-bottom: var(--color2) 1px solid;
        height: 100px;
        /* text-align: center; */
        font-weight: 600;
        font-size: 21px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
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
      .remove-book-btn{
        height: 25px;
        width: 25px;
      }
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
        .books-container-title{
          font-size: 30px;
          font-weight: 700;
        }
        .books-container-body{
          display: flex;
          flex-direction: row;
          /* height: 100px; */
        }
        .book-details{
          width: 60%;
        }
        .book-stats{
          width: 40%;
        }
        .requestor-list{
          font-size: 13px;
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