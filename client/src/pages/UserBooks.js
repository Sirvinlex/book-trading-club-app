import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FormInput from '../components/FormInput';
import { createBook, handleInput } from '../features/bookSlice';


// navigate(`/users/user-books/${id}`, { relative: "path" });
// type, name, value,  handleChange, labelText, page,placeholder 
const UserBooks = () => {
    const { title, description, isLoading } = useSelector((store) => store.book);
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserAddBook = () =>{
        navigate(`/users/user-books/${localStorageUser?.userId}`);
    };

    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleInput({ name, value }));
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
        <div className='books-container'>
            <div className='books-container-title'>title</div>
            <div className='books-container-body'></div>
            <div className='books-container-footer'>
                {
                    (localStorageUser?.userId && localStorageUser?.userId !== id)
                }
                <div className='footer-btn-container'>
                    {localStorageUser?.userId ? <button className='request-btn'>New request</button> : null}
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
    height: 100vh;
    margin-top: -40px;
    padding-top: 30px;
    .books-container{
        margin-top: 45px;
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
        height: 70px;
        width: 100%;
        border-top: var(--color2) 1px solid;
        border-bottom: var(--color2) 1px solid;
    }
    .books-container-title{
        width: 100%;
        background-color: var(--color1);
        height: 100px;
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
    @media (min-width: 600px) {
      .btn-container{
            margin-left: 40px;
            margin-right: 40px;
        }
    }
    @media (min-width: 768px) {
        margin-top: -65px;
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
    }
    @media (min-width: 992px) {
        .btn-container{
            margin-left: 200px;
            margin-right: 198px;
        }
    }
`

export default UserBooks;