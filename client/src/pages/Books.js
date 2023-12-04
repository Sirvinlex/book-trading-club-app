import React, { useEffect,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getBooks } from '../features/bookSlice';
import styled from 'styled-components';
import { FaTimes } from "react-icons/fa";
import { deleteBook, addBook, removeBook } from '../features/bookSlice';

const Books = () => {
  const { book, isLoading, createdBook, requestedBooks } = useSelector((store) => store.book);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requestedBooksId = requestedBooks?.map((item) => item.bookId);

  useEffect(() =>{
    dispatch(getBooks());
  }, [dispatch, createdBook,]);

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
    
  };

  const handleChange = (e) =>{
    const bookData = JSON.parse(e.currentTarget.getAttribute('data-test-id'));
    if (!localStorageUser){
      e.target.checked = null;
      alert('Login/Create account to select book to trade');
    }
    else if (e.target.checked && !requestedBooksId.includes(e.target.id)){
      dispatch(addBook(bookData));
    }
    else if (!e.target.checked && requestedBooksId.includes(e.target.id)){
      dispatch(removeBook(bookData));
    }
  };

  if (isLoading) return <div style={{textAlign:'center', marginTop:'20px', fontSize:'40px'}}>Loading...</div>
  return (
    <Wrapper>
      {requestedBooks.length > 0 ? (
        <div className='request-btn-absolute_container'>
          <button onClick={() => navigate('create-request')} className='request-btn-absolute' >Create New Request</button>
        </div> 
      ) : null}   
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
                  const bookId = item._id, bookCreatorName = item.creatorName, bookCreatorId = item.creatorId, bookDesc = item.description, 
                  bookTitle = item.title, bookReq = item.requests, requesterId = localStorageUser?.userId;
                  const itemData = `{"bookId": "${bookId}", "bookCreatorName": "${bookCreatorName}", "bookCreatorId": "${bookCreatorId}",
                   "bookDesc": "${bookDesc}", "bookTitle": "${bookTitle}", "bookReq": ${bookReq}, "requesterId": "${requesterId}"  }`
                  return(
                    // requestedBooksId.includes(bookId)
                    <div key={item._id}>
                      {/* {console.log(item)} */}
                        <label className='books-container-body'>
                        <input onChange={handleChange} type="checkbox" id={item._id} name="bookData" value={item._id} 
                        data-test-id={itemData}  checked={requestedBooksId.includes(bookId) ? 'checked' : null}
                        />
                        <div className='book-details'>
                          <p className={requestedBooksId.includes(item._id) && bookCreatorId === requesterId ? 'book-title2' :
                         requestedBooksId.includes(item._id) && bookCreatorId !== requesterId ? 'book-title3' : 'book-title'}>
                            {item.title}
                          </p>
                          <p className={requestedBooksId.includes(item._id) && bookCreatorId === requesterId ? 'book-description2' :
                         requestedBooksId.includes(item._id) && bookCreatorId !== requesterId ? 'book-description3' : 'book-description'}>
                            {item.description}
                          </p>
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
                      <button onClick={() => navigate('create-request')} type='submit' className='request-btn'>New Request</button>
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
  .request-btn-absolute_container{
    position: sticky;
    z-index: 1;
    top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    margin-bottom: -30px;
  }
  .request-btn-absolute{
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 3px;
    box-shadow: 4px 3px 5px #abaaa7, -4px 3px 5px #abaaa7;
    cursor: pointer;
    color: var(--fontColor1);
  }
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
    .book-title2{
      font-size: 20px;
      font-weight: 600;
      margin-top: 2px;
      color: #f59c36;
      font-style: italic;
    }
    .book-title3{
      font-size: 20px;
      font-weight: 600;
      margin-top: 2px;
      color: #27a160;
      font-style: italic;
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
    .book-description2{
      /* font-weight: 500; */
      font-size: 15px;
      margin-top: -20px;
      color: #f59c36;
      font-style: italic;
    }
    .book-description3{
      /* font-weight: 500; */
      font-size: 15px;
      margin-top: -20px;
      color: #27a160;
      font-style: italic;
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
        .request-btn-absolute{
          width: 200px;
          height: 45px;
        }
        .request-btn-absolute_container{
          margin-bottom: -35px;
        }
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