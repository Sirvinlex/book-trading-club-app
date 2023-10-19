import React from "react";
import FormInput from "../components/FormInput";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { handleInputs } from '../features/authSlice';

// type, name, value,  handleChange, labelText, page,placeholder 
const RegisterLogin = () => {
  const { name, email, password } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = React.useState(true);
  const handleSubmit = (e) =>{
    e.preventDefault();
  };

  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleInputs({name, value}));
  };

  return (
    <Wrapper>
      <p className="form-title">{isLogin ? 'Login' : 'Register'}</p>
      <form onSubmit={handleSubmit}>
        {isLogin ? (
        <>
          <FormInput handleChange={handleChange} className='input' name='email' type='email' value={email} labelText='Email' />
          <FormInput handleChange={handleChange} name='password' type='password' value={password} labelText='Password' />
        </>
        ) : (
        <>
          <FormInput handleChange={handleChange} name='name' type='text' value={name} labelText='Name' />
          <FormInput handleChange={handleChange} name='email' type='email' value={email} labelText='Email' />
          <FormInput handleChange={handleChange} name='password' type='password' value={password} labelText='Password' />
        </>
        )}
        <div className="btn-container">
          <button className="submit-btn" type='submit'>{isLogin ? 'Login' : 'Register'}</button>
          <p className="switch-form">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <button className="switch-btn" onClick={() => setIsLogin((prevState) => !prevState)} type='button'>{isLogin ? 'Register' : 'Login'}</button>
          </p>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: var(--color1);
  padding-top: 5px;
  width: 100%;
  height: 90vh;
  .form-title{
    font-size: 35px;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: -7px;
    text-align: center;
  }
  .btn-container{
    margin-left: 10px;
    margin-right: 10px;
  }
  .submit-btn{
    width: 100%;
    margin-top: 15px;
    border: none;
    background-color: var(--backgroundColor);
    height: 33px;
    border-radius: 3px;
    color: var(--fontColor1);
    cursor: pointer;
  }
  .switch-form{
    margin-left: 0px;
  }
  .switch-btn{
    border: none;
    background-color: inherit;
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
export default RegisterLogin;