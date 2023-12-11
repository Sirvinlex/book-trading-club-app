import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrades } from '../features/bookSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getUsers } from '../features/usersSlice';
import Moment from 'react-moment';



const Trades = () => {
    const { trades, isLoading } = useSelector((store) => store.book);
    const { users } = useSelector((store) => store.users);

    const dispatch = useDispatch();

    useEffect(() =>{
      if (trades.length > 0){
          dispatch(getUsers());
      }
    }, [trades]);

    useEffect(() =>{
        dispatch(getTrades());
    }, []);

    if (isLoading) return <div style={{textAlign:'center', marginTop:'20px', fontSize:'40px'}}>Loading...</div>
    
  return (
    <Wrapper>
      <div className='books-container'>
        <div className='books-container-title'>
            Completed Trades 
        </div>
          <div className='books-container-body'></div>
                {
                  trades.length < 1 ? (
                    <p>No completed trades yet</p>
                  ) : (
                    trades.map((item, i) =>{
                        const requestCreatorLink = `/users/users-details/${item.idOfRequestCreator}`;
                        const myId = item.idOfRequestCreator
                        let requestCreatorName;
                        let requestAccepterName;
                        let requestAccepterLinks
                        users?.forEach((user) => {
                            if (user._id === item.idOfRequestCreator) requestCreatorName = user.name
                        });

                        item.requestAccepterBooks.map((accBook) =>{
                          users?.forEach((user) => {
                              if (user._id === accBook.creatorId){
                                requestAccepterName = user.name;
                                requestAccepterLinks = `/users/users-details/${accBook.creatorId}`;
                              }
                          })});

                      return(
                        <div key={i} className='request-container-cover'>
                            <div className='request-container'>
                                <div className='give-div'>
                                  {
                                    
                                  }
                                    <p>
                                        <b>
                                          <Link style={{textDecoration:'none'}} to={requestCreatorLink}>{requestCreatorName}</Link>{' '}
                                            Gave:
                                        </b>
                                    </p>
                                    <div className='main-book-container'>
                                        {item.requestCreatorBooks.map((reqBook) =>{
                                            return(
                                                <div key={reqBook._id} className='main-book'>
                                                    <div className='book-details-container'>
                                                        <p className='book-title'>{reqBook.title}</p>
                                                        <p className='book-description'>{reqBook.description}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='take-div'>
                                    <p><b>And received from <Link style={{textDecoration:'none'}} to={requestAccepterLinks}>{requestAccepterName}</Link>:</b></p>
                                    <div className='main-book-container'>
                                        {item.requestAccepterBooks.map((accBook) =>{
                                            return(
                                                <div key={accBook._id} className='main-book'>
                                                    <div className='book-details-container'>
                                                        <p className='book-title'>{accBook.title}</p>
                                                        <p className='book-description'>{accBook.description}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        
                                    </div>
                                </div>
                                <p className='date'><Moment fromNow ago>{item.createdAt}</Moment> ago</p>
                            </div>
                        <hr/>
                        </div>
                    )
                    })
                  )
                }
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
    .give-div{
        width: 100%;
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
    .main-book{
        border-radius: 3px;
        border-bottom: var(--color2) 1px solid;
        height: fit-content;
        background-color: var(--backgroundColor);
        display: flex;
        flex-direction: column;
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
    }
    .book-title{
        font-weight: 600;
        margin-left: 5px;
        color: var(--fontColor1);
        font-size: 20px;
        margin-top: 1px;
    }
    .book-description{
        font-weight: 500;
        margin-left: 5px;
        color: var(--fontColor1);
        font-size: 17px;
        margin-top: -10px;
    }
    @media (min-width: 600px) {
        /* .give-btn,.take-btn{
            margin-left: 2px;
        } */
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

export default Trades;