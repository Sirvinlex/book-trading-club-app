import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <p>Oops! Nothing here.</p>
      <button onClick={() => navigate('/books')}>Back to home</button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p{
    font-size: 30px;
    font-weight: 600;
  }
  button{
    border: none;
    background-color: var(--btnColor);
    color: white;
    border-radius: 3px;
    width: 100px;
    height: 35px;
    cursor: pointer;
  }
`
export default ErrorPage