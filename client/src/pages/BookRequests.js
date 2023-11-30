import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { request } from '../features/bookSlice';
import { getUserDetails } from '../features/usersSlice';

const BookRequests = () => {
    const { book, requestedBooks } = useSelector((store) => store.book);
    const { userDetails } = useSelector((store) => store.users);
    const requestedBooksId = requestedBooks?.map((item) => item.bookId);
    const localStorageUser = JSON.parse(localStorage.getItem("user"));

    const requesterBooks = requestedBooks?.filter((item) => item.bookCreatorId === item.requesterId)
    const accepterBooks = requestedBooks?.filter((item) => item.bookCreatorId !== item.requesterId)

    const requesterBooksIds = requesterBooks?.map((item) => item.bookId);
    const accepterBooksIds = accepterBooks?.map((item) => item.bookId);

    const requesterBooksFromState = book.filter((item) => requesterBooksIds.includes(item._id));
    const accepterBooksFromState = book.filter((item) => accepterBooksIds.includes(item._id));

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() =>{
        // console.log(requestedBooks)
        const requestCreatorId = requestedBooks[0].requesterId;
        // const requesterBooksId = requesterBooksIds;
        // const accepterBooksId = accepterBooksIds;
        // console.log(({requestCreatorId, requesterBooksId, accepterBooksId}))
        // dispatch(request({requestCreatorId, requesterBooksId, accepterBooksId}));
        dispatch(getUserDetails(requestCreatorId));
    }, []);

  return (
    <Wrapper>
        <div className='books-container'>
            <div className='books-container-title'>
                All Requests
            </div>
            <div className='books-container-body'>
                {/* <div className='give-take-container'> */}
                    <div className='give-div'>
                        <p><b>You want to give:</b></p>
                        {/* <div className={requesterBooks.length > 0 ? 'main-book-container' : 'main-book-container2'}>
                            {requesterBooksFromState?.map((item) =>{
                                return(
                                    <div key={item.bookId} className='main-book'>
                                        <p className='book-title1'>{item.bookTitle}</p>
                                        <p className='book-description1'>{item.bookDesc}</p>
                                    </div>
                                )
                            })}
                        </div> */}
                    </div>
                    <div className='take-div'>
                        <p><b>And want to take:</b></p>
                        {/* <div className={accepterBooks.length > 0 ? 'main-book-container' : 'main-book-container2'}>
                            {accepterBooksFromState?.map((item) =>{
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
                        </div> */}
                    </div>
                {/* </div> */}
            </div>
            <div className='books-container-footer'>
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
        color: var(--fontColor1);
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
    .books-container-body{
        padding: 10px;
        height: fit-content;
        width: 100%;
        /* border-bottom: var(--color2) 1px solid; */
        display: flex;
        flex-direction: column;
    }
    .give-take-container{
        background-color: red;
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
    }
    /* .give-div>div{
        border-radius: 3px;
        border: var(--color2) 1px solid;
        height: 80px;
        margin-right: 20px;
        margin-left: 1px;
        margin-top: -10px;
    } */
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
        /* border-radius: 3px; */
        border-bottom: var(--color2) 1px solid;
        height: 80px;
        /* margin-right: 20px;
        margin-left: 1px; */
        /* margin-top: -10px; */
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

export default BookRequests;