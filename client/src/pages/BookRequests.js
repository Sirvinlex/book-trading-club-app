import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getRequestData, getBooks, deleteRequestData, updateRequestData, createTrade } from '../features/bookSlice';
import { getUsers } from '../features/usersSlice';
import Moment from 'react-moment';

const BookRequests = () => {
    const { book, requestedBooks, requestData, createTradeMsg } = useSelector((store) => store.book);
    const { users } = useSelector((store) => store.users);
    const requestedBooksId = requestedBooks?.map((item) => item.bookId);
    const localStorageUser = JSON.parse(localStorage.getItem("user"));


    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() =>{
        if (requestData.length > 0){
            dispatch(getBooks());
            dispatch(getUsers());
        }
    }, [requestData]);

    useEffect(() =>{
        dispatch(getRequestData());
    }, []);

    useEffect(() =>{
        if (createTradeMsg === 'Trade successfully added') navigate('/trades');
    }, [createTradeMsg]);


    const myData = requestData.map((item) =>{
        let mainData = item, requestCreatorId = item.requestCreatorId, accepterBooks = [], requesterBooks = [], 
        acceptersId = item.acceptersId, requestCreatorName, requestDataId = item._id, requestTime = item.createdAt;
        book?.forEach((bk) =>{
            if (mainData.requesterBooksId.includes(bk._id)) requesterBooks.push(bk)
            else if (mainData.accepterBooksId.includes(bk._id)) accepterBooks.push(bk)
        });
        
        users?.forEach((user) =>{
            if (user._id === requestCreatorId) requestCreatorName = user.name;
        })

        return { requestCreatorId, accepterBooks, requesterBooks, acceptersId, requestCreatorName, requestDataId, requestTime }
    });


  return (
    <Wrapper>
        <div className='books-container'>
            <div className='books-container-title'>
                All Requests 
            </div>
            <div className='books-container-body'>
                {requestData.length < 1 ? <p>No active requests</p>
                    : ( myData.map((item, i) =>{

                        // getting bookIds belonging to each user that will accept or reject request
                        const userBooks = item.accepterBooks.filter((userBook) => userBook.creatorId === localStorageUser?.userId);
                        const userBookIds = [];
                        const requestId = item.requestDataId;                        
                        userBooks.forEach((userBook) => userBookIds.push(userBook._id))
                        // console.log(userBookIds)

                        const requestUpdateData = { userBookIds, requestId, userId: localStorageUser?.userId };
                        // console.log(requestUpdateData)

                        const requesterBookProp = item.requesterBooks.map((reqBookProp) =>{
                            const isProposed = false;
                            const bookId = reqBookProp._id;
                            return { bookId }
                            // return { isProposed, bookId }
                        });
                        const accepterBookProp = item.accepterBooks.map((accBookProp) =>{
                            const isIncreased = false;
                            const requesterId = item.requestCreatorId;
                            const bookId = accBookProp._id;
                            return { requesterId, bookId }
                            // return { requesterId, isIncreased, bookId }
                        })
                        // isCancelled prop is passed to determine whether request is being created of cancelled
                        const updateBookPropData = {requesterBookProp, accepterBookProp, IsCancelled: true}
                        // console.log(updateBookPropData, 'test test')
                        // when a user rejects a request and their books are removed from the request, the particular books request properties
                        // also need to be updated. so we need to get updateBookPropData for those particular book
                        
                        // requestId: "6572945236e361f898d3a5a4"
                        // userBookIds: (2) ['656e12acae7f0c4f347751b5', '656ac1ba07c6a5a4423f388b']
                        const updateBookPropDataForReject = { 
                            requesterBookProp: [], 
                            accepterBookProp: requestUpdateData.userBookIds.map((myData) =>{
                                return { bookId: myData, requesterId: item.requestCreatorId}
                            }),
                            IsCancelled: true,
                        }

                        // console.log(updateBookPropDataForReject, ' jjjjjjjjjjj')
                        // dispatch action to delete request is if accepters book is zero, that is if all accepters reject's request
                        if (item.accepterBooks.length < 1){
                            // dispatch(deleteRequestData({cancelData: {dataId: item.requestDataId, role: 'cancel'}, updateBookPropData}))
                        }
                        
                        const link = `/users/users-details/${item.requestCreatorId}`;
                        return(
                            <div key={i} className='request-container-cover'>
                                <div className='request-container'>
                                    {localStorageUser?.userId === item.requestCreatorId ? (
                                        <button
                                            className='cancel-btn'
                                            onClick={() => {
                                                dispatch(deleteRequestData({cancelData: {dataId: item.requestDataId, role: 'cancel'}, updateBookPropData,
                                                updateUserRequestCountData: { userId: item.requestCreatorId, isIncreased: false }
                                            }))
                                            }} 
                                        >
                                            Cancel Request
                                        </button>
                                    ) : null}

                                    {item.acceptersId.includes(localStorageUser?.userId) ? (
                                        <div className='accept-reject-btn-container'>
                                            {/* requestCreatorId, accepterBooks, requesterBooks, acceptersId, requestCreatorName, requestDataId */}
                                            <button className='accept-btn'
                                                onClick={() =>{
                                                    const idOfRequestCreator = item.requestCreatorId;
                                                    const requestCreatorBooks = item.requesterBooks;
                                                    const requestAccepterBooks = item.accepterBooks.filter((reqAccBook) => reqAccBook.creatorId === localStorageUser?.userId) 
                                                    dispatch(createTrade({ idOfRequestCreator, requestCreatorBooks, requestAccepterBooks }));

                                                    dispatch(deleteRequestData({cancelData: {dataId: item.requestDataId, role: 'accept request'}, updateBookPropData,
                                                    updateUserRequestCountData: { userId: item.requestCreatorId, isIncreased: false }
                                                    }));
                                                }}
                                            >
                                                Accept
                                            </button>
                                            <button 
                                                onClick={() => dispatch(updateRequestData({requestUpdateData, updateBookPropData: updateBookPropDataForReject,
                                                    updateUserRequestCountData: { userId: item.requestCreatorId, isIncreased: false }
                                                }))} 
                                                className='reject-btn'
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : null}
                                    <div className='give-div'>
                                        <p>
                                            <b>
                                            <Link style={{textDecoration:'none'}} to={link}>{item.requestCreatorName}</Link>{' '}
                                                want to give:
                                            </b>
                                        </p>
                                        <div className='main-book-container'>
                                            {item.requesterBooks.map((reqBook) =>{
                                                return(
                                                    <div key={reqBook._id} className='main-book'>
                                                        <div className='book-details-container'>
                                                            <p className='book-title'>{reqBook.title}</p>
                                                            <p className='book-description'>{reqBook.description}</p>
                                                        </div>
                                                        {
                                                            reqBook.requests > 0 ? (
                                                                <div className='book-stats'>
                                                                    <div className='request-count'>Requests <p className='request-number'>{reqBook.requests}</p></div>
                                                                </div>
                                                            ) : null
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className='take-div'>
                                        <p><b>And want to take:</b></p>
                                        <div className='main-book-container'>
                                            {item.accepterBooks.map((accBook) =>{
                                                const link = `/users/users-details/${accBook.creatorId}`;
                                                let name;
                                                users?.forEach((user) => {
                                                    if (user._id === accBook.creatorId) name = user.name
                                                })
                                                return(
                                                    <div key={accBook._id} className='main-book'>
                                                        <div className='book-details-container'>
                                                            <p className='book-title'>{accBook.title} from {' '}
                                                            <Link style={{textDecoration:'none'}} to={link}>{name}</Link>
                                                            {/* <span>{name}</span> */}
                                                            </p>
                                                            <p className='book-description'>{accBook.description}</p>
                                                        </div>
                                                        {
                                                            accBook.requests > 0 ? (
                                                                <div className='book-stats'>
                                                                    <div className='request-count'>Requests <p className='request-number'>{accBook.requests}</p></div>
                                                                </div>
                                                            ) : null
                                                        }
                                                    </div>
                                                )
                                            })}
                                            
                                        </div>
                                    </div>
                                    {/* <p className='date'><Moment fromNow ago></Moment> ago</p> */}
                                    <p className='date'><Moment fromNow ago>{item.requestTime}</Moment> ago</p>
                                </div>
                            <hr/>
                            </div>
                        )
                    })
                    )
                }

            </div>
            <div className='books-container-footer'>
            </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    .book-stats{
      margin: 5px;
    }
    .request-count{
      font-weight: 600;
      font-size: 20px;
      margin-top: -5px;
      display: flex;
      color: var(--btnColor2);
    }
    .request-number{
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
    .books-container{
        margin-top: 45px;
        margin-bottom: 40px;
        width: 100%;
        /* border-top: var(--color2) 1px solid; */
        border: var(--color2) 1px solid;
        color: var(--fontColor1);
        /* background: pink; */
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
        /* padding: 10px; */
        height: fit-content;
        width: 100%;
        /* border-bottom: var(--color2) 1px solid; */
        display: flex;
        flex-direction: column;
        /* background-color: blue; */
        align-items: center;
        justify-content: center;
    }
    .give-take-container{
        /* background-color: red; */
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
    .give-div{
        width: 100%;
        /* margin-left: 10px; */
        /* display: flex; */
        /* flex-direction: column; */
        /* justify-content: center; */
        /* align-items: center; */
        
        padding-bottom: 30px;
    }
    .take-div{
        width: 100%;
        /* margin-left: 10px; */
        /* display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; */
        padding-bottom: 30px;
    }
    .date{
        position: absolute;
        bottom: -11px;
        left: 27px;
        font-weight: 700;
        font-size: 14px;
    }
    .take-div>p{
        text-align: center;
    }
    .give-div>p{
        text-align: center;
    }
    .request-container-cover{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .request-container{
        display: flex;
        flex-direction: column;
        /* background-color: pink; */
        background-color: var(--color1);
        width: 100%;
        height: fit-content;
        margin-top: 20px;
        margin-bottom: 20px;
        /* padding-top: 10px; */
        border: var(--color2) 1px solid;
        position: relative;
    }
    .cancel-btn{
        position: absolute;
        left: 4px;
        top: 4px;
        background-color: inherit;
        border: none;
        color: red;
        cursor: pointer;
        font-weight: 600;
        font-size: 11px;
    }
    .accept-reject-btn-container{
        position: absolute;
        right: 4px;
        top: 0;
    }
    .reject-btn{
        background-color: inherit;
        border: none;
        color: red;
        font-weight: 700;
        cursor: pointer;
        font-size: 11px;
    }
    .accept-btn{
        background-color: inherit;
        border: none;
        color: green;
        font-weight: 700;
        cursor: pointer;
        font-size: 11px;
        margin-right: -5px;
    }
    .main-book-container{
        border: var(--color2) 1px solid;
        /* margin-right: 20px; */
        /* margin-left: 1px; */
        border-radius: 3px;
        height: fit-content;
        width: 90%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    hr{
        width: 100%;
    }
    /* .main-book-container2{
        border: var(--color2) 1px solid;
        margin-right: 20px;
        margin-left: 1px;
        border-radius: 3px;
        height: 80px;
    } */
    .main-book{
        border-radius: 3px;
        border-bottom: var(--color2) 1px solid;
        height: fit-content;
        background-color: var(--backgroundColor);
        display: flex;
        flex-direction: column;
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
        margin-top: -9px;
        /* border-top: var(--color2) 1px solid; */
    }
    .submit-request-btn{
        background-color: var(--btnColor);
        border: none;
        border-radius: 3px;
        color: white;cursor: pointer;
        width: 130px;
        height: 35px;
    }
    .book-title{
        font-weight: 600;
        margin-left: 5px;
        color: var(--fontColor1);
        font-size: 20px;
        margin-top: 1px;
    }
    /* .book-title2{
        font-weight: 600;
        margin-left: 5px;
        color: #27a160;
        font-size: 20px;
        margin-top: 1px;
    } */
    .book-description{
        font-weight: 500;
        margin-left: 5px;
        color: var(--fontColor1);
        font-size: 17px;
        margin-top: -10px;
    }
    /* .book-description2{
        font-weight: 500;
        margin-left: 5px;
        color: #27a160;
        font-size: 17px;
        margin-top: -10px;
    } */
    
    
    @media (min-width: 600px) {
        .give-btn,.take-btn{
            margin-left: 2px;
        }
        .books-container-body{
            /* padding: 15px; */
        }
        .main-book-container{
            /* margin-right: 33px; */
            /* margin-left: 2px; */
        }
        .main-book-container2{
            margin-right: 33px;
            margin-left: 2px;
        }
    }
    @media (min-width: 768px) {
        .main-book{
            display: flex;
            flex-direction: row;
        }
        .book-details-container{
            width: 80%;
        }
        .book-stats{
          width: 20%;
        }
        .accept-reject-btn-container{
            top: 4;
        }
        .cancel-btn, .accept-btn, .reject-btn{
            font-size: 12px;
        }
        .request-container{
            flex-direction: row;
            width: 97%;
            border-radius: 4px;
        }
        .books-container-body{
            /* flex-direction: row; */
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