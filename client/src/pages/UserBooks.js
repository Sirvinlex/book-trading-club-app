import React,{ useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FormInput from '../components/FormInput';
import { createBook, handleInput, getUserBooks } from '../features/bookSlice';
import { FaTimes } from "react-icons/fa";
import { deleteBook, addBook, removeBook } from '../features/bookSlice';
import { getUserDetails, getUsers } from '../features/usersSlice';


const UserBooks = () => {
    const { title, description, isLoading, userBooks, createdBook, requestedBooks, } = useSelector((store) => store.book);
    const { userDetails, users } = useSelector((store) => store.users);
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const requestedBooksId = requestedBooks?.map((item) => item.bookId);
    
    useEffect(() =>{
       dispatch(getUserDetails(id));
    }, [id]);
  
    useEffect(() =>{
        const userId = id;
        if (!localStorageUser){
          alert('Something went wrong, please login and try again.')
        } 
        else dispatch(getUserBooks(userId));
    }, [id, createdBook]);

    useEffect(() =>{
      dispatch(getUsers());
    }, [dispatch, createdBook,]);

    const handleUserAddBook = () =>{
        navigate(`/users/user-books/${localStorageUser?.userId}`);
    };

    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleInput({ name, value }));
    };

    const handleCheckedChange = (e) =>{
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

    const handleSubmit = (e) =>{
        e.preventDefault();
        const creatorName = localStorageUser?.name;
        const creatorId = localStorageUser?.userId;
        const creatorState = localStorageUser?.state;
        const creatorCity = localStorageUser?.city;
        
        if  (!creatorName || !creatorId) alert('Oops! Something went wrong')
        else if (!title || !description) alert('Please provide all fields')
        else dispatch(createBook({ title, description, creatorName, creatorId, creatorState, creatorCity }));
    };

    const handleDeleteBook = ({itemId, activeRequest, proposedCount }) =>{
      if (proposedCount > 0){
        alert(`This book is currently being proposed in ${proposedCount} active requests, please cancel request in order to be able to delete book`);
      }else if (activeRequest > 0){
        alert(`This book is currently involved in ${activeRequest} active requests, please reject/accept request to be able to delete book`);
      }else{
        dispatch(deleteBook(itemId));
      }
    };

  if (isLoading) return <div style={{textAlign:'center', marginTop:'20px', fontSize:'40px'}}>Loading...</div>

  return (
    <Wrapper>
        {
            (localStorageUser?.userId && localStorageUser?.userId === id) ? (
                <>
                    <p className='form-title'>Add Book</p>
                    <form onSubmit={handleSubmit}>
                        <FormInput type='text' name='title' value={title} handleChange={handleChange} labelText='Book title'/>
                        <FormInput placeholder='Author, condition' type='text' name='description' 
                         value={description} handleChange={handleChange} labelText='Book description'/>
                        <div className='btn-container'>
                            <button disabled={ isLoading ? true : false} className='book-btn' type='submit'>
                                { isLoading ? 'Loading...' : 'Add book to exchange' }
                            </button>
                        </div>
                    </form>
                </> 
            ) : null
        }

      {requestedBooks.length > 0 ? (
        <div className='request-btn-absolute_container'>
          <button onClick={() => navigate('/books/create-request')} className='request-btn-absolute' >Create New Request</button>
        </div> 
      ) : null} 

        <div className='books-container'>
            <div className='books-container-title'>
              {localStorageUser?.userId === userDetails?.userId ? 'Your' : `${userDetails?.name}'s`} Books available for trade
            </div>

            {
              userBooks.length < 1 ? (
                <div className='empty-book-body'>
                  No books have been added by {localStorageUser?.userId === userDetails?.userId ? 'You' : `${userDetails?.name}`} yet.
                </div>
              ) : (
                userBooks.map((item, i) =>{
                  let bookCreatorNameFromUsersState;
                  users?.map((user) => user._id === item.creatorId ? bookCreatorNameFromUsersState = user.name.split(' ')[0] : null);
                  const creatorName = item.creatorName.split(' ')[0];
                  const myLink = `/users/users-details/${item.creatorId}`
                  const itemId = item._id;
                  const bookId = item._id, bookCreatorName = item.creatorName, bookCreatorId = item.creatorId, bookDesc = item.description, 
                  bookTitle = item.title, bookReq = item.requests, requesterId = localStorageUser?.userId;
                  const itemData = `{"bookId": "${bookId}", "bookCreatorName": "${bookCreatorName}", "bookCreatorId": "${bookCreatorId}",
                   "bookDesc": "${bookDesc}", "bookTitle": "${bookTitle}", "bookReq": ${bookReq}, "requesterId": "${requesterId}"  }`
                   const bookLink = `/books/requests/${bookId}`;
                  return(
                    <div key={item._id}>
                        <label className='books-container-body'>
                            <input onChange={handleCheckedChange} type="checkbox" id={item._id} name="bookData" value={item._id} 
                            data-test-id={itemData} checked={requestedBooksId.includes(bookId) ? 'checked' : null}
                            />
                            <div className='main-book'>
                              <div className='book-details'>
                                <p className='book-title'>{item.title}</p>
                                <p className='book-description'>{item.description}</p>
                                <p className='creator-details'>
                                  from <span><Link className='name-link' to={myLink}>{bookCreatorNameFromUsersState || creatorName}</Link></span>
                                  {' '} in {item.creatorCity}, {item.creatorState}
                                </p>
                              </div>
                              <div className='book-stats'>
                                {
                                  item.requests > 0 ? (
                                    <div className='request-count'><Link className='request-link' to={bookLink}>Requests</Link> <p className='request-number'>{item.requests}</p></div>
                                  ) : null
                                }
                              </div>
                              { localStorageUser?.userId === item.creatorId ? (
                                <button onClick={() => handleDeleteBook({itemId, activeRequest: item.requests, proposedCount: item.proposed})} className='remove-book-btn'><FaTimes size={30}/></button>
                              ) : null}
                            </div>
                      </label>
                    </div>
                    
                  )
                })
              )
            }

            <div className='books-container-footer'>
                {
                    (localStorageUser?.userId && localStorageUser?.userId !== id)
                }
                <div className='footer-btn-container'>
                    {localStorageUser?.userId ? <button onClick={() => navigate('/books/create-request')} className='request-btn'>New request</button> : null}
                    {(localStorageUser?.userId && localStorageUser?.userId !== id) ? (
                        <button onClick={handleUserAddBook} className='add-btn'>Add book</button>
                    ) : null}
                </div>
            </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: 100%;
    margin-top: -40px;
    padding-top: 30px;
    /* style={{textDecoration:'none', fontWeight:'800'}} */
    .name-link{
      text-decoration: none;
      font-weight: 800;
    }
    .request-link:hover,.name-link:hover{
      text-decoration: underline;
    }
    .request-link{
      text-decoration: none;
    }
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
        width: 100%;
        border: var(--color2) 1px solid;
        margin-bottom: 40px;
    }
    .books-container-footer{
        width: 100%;
        background-color: var(--color1);
        height: 60px;
    }
    .books-container-body{
        height: fit-content;
        width: 100%;
        border-bottom: var(--color2) 1px solid;
        position: relative;
        display: flex;
        flex-direction: row;
    }
    .books-container-title{
        width: 100%;
        background-color: var(--color1);
        border-bottom: var(--color2) 1px solid;
        height: 100px;
        font-weight: 600;
        font-size: 21px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
   .form-title{ 
        font-size: 25px;
        font-weight: 600;
        margin-bottom: -25px;
        text-align: center;
    }
   .btn-container{
        margin-left: 10px;
        margin-right: 10px;
    }
    .book-btn{
        width: 100%;
        margin-top: 15px;
        border: none;
        background-color: var(--btnColor);
        height: 33px;
        border-radius: 3px;
        color: var(--backgroundColor);
        cursor: pointer;
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
    .book-title{
      font-size: 20px;
      font-weight: 600;
      margin-top: 2px;
    }
    .book-description{
      font-size: 15px;
      margin-top: -20px;
    }
    .creator-details{
      font-weight: 600;
      font-size: 13px;
      margin-top: -10px;
    }
    .book-stats{
      margin: 5px;
    }
    .request-count{
      font-weight: 600;
      font-size: 20px;
      margin-top: -5px;
      display: flex;
      color: #22229c;
      font-weight: 700;
    }
    .request-number{
      font-weight: 600;
      height: 20px;
      width: 20px;
      background-color: var(--fontColor1);
      color: var(--backgroundColor);
      margin-top: 7px;
      margin-left: 2px;
      border-radius: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 15px;
    }
    .requestor-list{
      font-weight: 500;
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
    @media (min-width: 600px) {
      .btn-container{
            margin-left: 40px;
            margin-right: 40px;
        }
      .remove-book-btn{
        height: 25px;
        width: 25px;
      }
    }
    @media (min-width: 768px) {
        margin-top: -65px;
        .main-book{
          display: flex;
          flex-direction: row;
          width: 100%;
        }
        .request-btn-absolute{
          width: 200px;
          height: 45px;
        }
        .requestor-list{
          font-size: 13px;
        }
        .request-count{
          float: right;
          margin-right: 10px;
        }
        .book-stats{
          width: 20%;
        }
        .book-details{
          width: 80%;
        }
        .books-container{
            width: 82%;
            margin-top: 60px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            border-radius: 5px;
        }
        .btn-container{
            margin-left: 70px;
            margin-right: 68px;
        }
        .form-title{
            margin-top: 65px;
        }
        .books-container-body{
          display: flex;
          flex-direction: row;
        }
        .books-container-title{
          font-size: 30px;
          font-weight: 700;
        }
    }
    @media (min-width: 992px) {
        .btn-container{
            margin-left: 200px;
            margin-right: 198px;
        }
    }
`

export default UserBooks;