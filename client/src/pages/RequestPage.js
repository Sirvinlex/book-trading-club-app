import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const RequestPage = () => {
  const { requestBooks } = useSelector((store) => store.book);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));

const myArr = [1,2,3]
  return (
    <Wrapper>
        <div className='books-container'>
            <div className='books-container-title'>

            </div>
            <div className='books-container-body'>
                <div className='give-div'>
                    <p>You want to give:</p>
                    <div className='main-book-container'>
                        {/* <div className='main-book'>
                        
                        </div> */}
                    </div>
                </div>
                <div className='take-div'>
                    <p>And want to take:</p>
                    <div className='main-book-container'>
                        {/* <div className='main-book'>
                        
                        </div> */}
                    </div>
                </div>
            </div>
            <div className='books-container-footer'>
                <button className='submit-request-btn'>Submit Request</button>
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
    @media (min-width: 600px) {
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
export default RequestPage;