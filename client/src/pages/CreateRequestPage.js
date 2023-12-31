import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { request } from '../features/bookSlice';

const CreateRequestPage = () => {
  const { requestedBooks, isCreateRequestSuccessful, creatingRequest } = useSelector((store) => store.book);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requesterBooks = requestedBooks?.filter((item) => item.bookCreatorId === item.requesterId);
  const accepterBooks = requestedBooks?.filter((item) => item.bookCreatorId !== item.requesterId);

  const requestAcceptersIds = accepterBooks?.map((item) => item.bookCreatorId);
  const requesterBooksIds = requesterBooks?.map((item) => item.bookId);
  const accepterBooksIds = accepterBooks?.map((item) => item.bookId);

  const handleSubmitRequest = () =>{
    if (!localStorageUser) alert('Please login/Register account to create request')
    else if (requesterBooks.length < 1 && accepterBooks.length < 1) alert('Please select books to trade')
    else if (requesterBooks.length < 1) alert('Please select book you want to give for this trade')
    else if (accepterBooks.length < 1) alert('Please select book you want take for this trade')
    else {
        const requestCreatorId = requestedBooks[0].requesterId;
        const requesterBooksId = requesterBooksIds;
        const accepterBooksId = accepterBooksIds;
        const acceptersId = requestAcceptersIds;

        /* when creating request, books are also updated with number of active incoming requests, and the list of requesters, the logic will be
         used to extract the data needed to update books as request is created. The date will be sent together with the create request data
         and thunk API will be used to dispatch update to the book if create request is successful, we also update the request creator active
         active request count on the user profile, so we also need to sent the data */
        const requesterBookProp = requesterBooksId.map((reqBookProp) =>{
            const isProposed = true;
            const bookId = reqBookProp;
            return { bookId }
        })
        const accepterBookProp = accepterBooksId.map((accBookProp) =>{
            const requesterId = requestCreatorId;
            const isIncreased = true;   // isIncreased constant is used to indicate that request is being created, hence the particular book request count will increase
            const bookId = accBookProp;
            return { requesterId, bookId }
        })
        // isCancelled prop is passed to determine whether request is being created of cancelled
        dispatch(request({ createRequestData: {requestCreatorId, requesterBooksId, accepterBooksId, acceptersId}, 
         updateBookPropData: {requesterBookProp, accepterBookProp, IsCancelled: false}, 
         updateUserRequestCountData: { userId: requestCreatorId, isIncreased: true } }));
    }
  };

  useEffect(() =>{
    if (isCreateRequestSuccessful === true) navigate('/books/requests');
  }, [isCreateRequestSuccessful])
  return (
    <Wrapper>
        <div className='books-container'>
            <div className='books-container-title'>
                Create Request for Trade
            </div>
            <div className='books-container-body'>
                <div className='give-div'>
                    <p><b>You want to give:</b></p>
                    <div className={requesterBooks.length > 0 ? 'main-book-container' : 'main-book-container2'}>
                        {requesterBooks?.map((item) =>{
                            return(
                                <div key={item.bookId} className='main-book'>
                                    <p className='book-title1'>{item.bookTitle}</p>
                                    <p className='book-description1'>{item.bookDesc}</p>
                                </div>
                            )
                        })}
                    </div>
                    <button onClick={() => navigate(`/users/user-books/${localStorageUser?.userId}`, { relative: "path" })} className='give-btn'>Edit Books to Give</button>
                </div>
                <div className='take-div'>
                    <p><b>And want to take:</b></p>
                    <div className={accepterBooks.length > 0 ? 'main-book-container' : 'main-book-container2'}>
                        {accepterBooks?.map((item) =>{
                            const ownerFirstName = item.bookCreatorName.split(' ')[0];
                            const ownerId = item.bookCreatorId;
                            const link = `/users/users-details/${ownerId}`
                                return(
                                    <div key={item.bookId} className='main-book'>
                                        
                                        <p className='book-title2'>
                                            {item.bookTitle} from {' '}
                                            <Link style={{textDecoration:'none'}} to={link}>{ownerFirstName}</Link>
                                        </p>
                                        <p className='book-description2'>{item.bookDesc}</p>
                                    </div>
                                )
                        })}
                    </div>
                    <button onClick={() => navigate('/books')} className='take-btn'>Edit Books to Take</button>
                </div>
            </div>
            <div className='books-container-footer'>
                <button disabled={ creatingRequest ? true : false} onClick={handleSubmitRequest} className='submit-request-btn'>
                    { creatingRequest ? 'Loading...' : 'Submit Request' }
                </button>
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
        border: var(--color2) 1px solid;
        color: var(--fontColor1);
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
    .books-container-body{
        padding: 10px;
        height: fit-content;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    
    .main-book-container{
        border: var(--color2) 1px solid;
        margin-right: 20px;
        margin-left: 1px;
        border-radius: 3px;
        height: fit-content;
    }
    .main-book-container2{
        border: var(--color2) 1px solid;
        margin-right: 20px;
        margin-left: 1px;
        border-radius: 3px;
        height: 80px;
    }
    .main-book{
        border-bottom: var(--color2) 1px solid;
        height: fit-content;
        }
    
    .books-container-footer{
        width: 100%;
        background-color: var(--color1);
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-top: var(--color2) 1px solid;
    }
    .submit-request-btn{
        background-color: var(--btnColor);
        border: none;
        border-radius: 3px;
        color: white;cursor: pointer;
        width: 130px;
        height: 35px;
    }
    .book-title1{
        font-weight: 600;
        margin-left: 5px;
        color: #f59c36;
        font-size: 20px;
        margin-top: 1px;
    }
    .book-title2{
        font-weight: 600;
        margin-left: 5px;
        color: #27a160;
        font-size: 20px;
        margin-top: 1px;
    }
    .book-description1{
        font-weight: 500;
        margin-left: 5px;
        color: #f59c36;
        font-size: 17px;
        margin-top: -10px;
    }
    .book-description2{
        font-weight: 500;
        margin-left: 5px;
        color: #27a160;
        font-size: 17px;
        margin-top: -10px;
    }
    .give-btn,.take-btn{
        margin-left: 1px;
        margin-top: -1px;
        border: var(--color2) 1px solid;
        /* border-top: none; */
        height: 40px;
        width: 130px;
        border-bottom-left-radius: 3px 3px;
        border-bottom-right-radius: 3px 3px;
        cursor: pointer;
        color: var(--fontColor1);
    }
    @media (min-width: 600px) {
        .give-btn,.take-btn{
            margin-left: 2px;
        }
        .books-container-body{
            padding: 15px;
        }
        .main-book-container{
            margin-right: 33px;
            margin-left: 2px;
        }
        .main-book-container2{
            margin-right: 33px;
            margin-left: 2px;
        }
    }
    @media (min-width: 768px) {
        .books-container-body{
            flex-direction: row;
        }
        .give-div{
            width: 50%;
        }
        .take-div{
            width: 50%;
        }
        .books-container-title{
          font-size: 30px;
          font-weight: 700;
        }
        .books-container{
            width: 90%;
            margin-top: 60px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            border-radius: 5px;
        }
    }

`
export default CreateRequestPage;