import React, {useEffect} from "react";
import FormInput from "../components/FormInput";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleInputs, logUser, regUser, resetUserState } from '../features/authSlice';


const RegisterLogin = () => {
  const { name, email, password, authSuccess, deactivateBtn, user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState(true);

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (isLogin){
      if (!email || !password) alert("Please provide all values");
      else dispatch(logUser({ email, password }))
    }else{
      if (!name || !email || !password) alert("Please provide all values");
      else dispatch(regUser({ name, email, password }));
    }
  };

  useEffect(() => {
    if (user?.userId && user?.token) {
      setTimeout(() => {
        navigate('/');
        dispatch(resetUserState());
      }, 500);
    }
  }, [user, navigate]); 

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
          <FormInput handleChange={handleChange} name='name' type='text' value={name} labelText='Full Name' />
          <FormInput handleChange={handleChange} name='email' type='email' value={email} labelText='Email' />
          <FormInput handleChange={handleChange} name='password' type='password' value={password} labelText='Password' />
        </>
        )}
        <div className="btn-container">
          <button disabled={deactivateBtn ? true : false} className="submit-btn" type='submit'>
            {deactivateBtn ? 'Loading...' : isLogin ? 'Login' : 'Register'}
          </button>
          <p className="switch-form">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <button className="switch-btn" onClick={() => setIsLogin((prevState) => !prevState)} type='button'>
              {isLogin ? 'Register' : 'Login'}
            </button>
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
    background-color: var(--btnColor);
    height: 33px;
    border-radius: 3px;
    color: var(--backgroundColor);
    cursor: pointer;
  }
  .switch-form{
    margin-left: 0px;
  }
  .switch-btn{
    border: none;
    background-color: inherit;
    cursor: pointer;
    font-weight: 600;
    color: var(--btnColor);
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