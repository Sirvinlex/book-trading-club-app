import React from 'react';
import styled from 'styled-components';
import FormInput from '../components/FormInput';

// type, name, value,  handleChange, labelText, page,placeholder 
const UserBooks = () => {
    const handleChange = () =>{

    };

    const handleSubmit = (e) =>{
        e.preventDefault();
    };

  return (
    <Wrapper>
        <p className='form-title'>Add Book</p>
        <form onSubmit={handleSubmit}>
            <FormInput type='text' name='title' value='' handleChange={handleChange} labelText='Book title'/>
            <FormInput type='text' name='description' value='' handleChange={handleChange} labelText='Book description'/>
            <div className='btn-container'><button className='book-btn' type='submit'>Add book to exchange</button></div>
        </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    margin-top: -65px;
    padding-top: 30px;
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
    @media (min-width: 600px) {
      .btn-container{
            margin-left: 40px;
            margin-right: 40px;
        }
    }
    @media (min-width: 768px) {
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