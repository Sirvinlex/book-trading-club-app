import React from 'react';
import styled from 'styled-components';


const FormInput = ({type, name, value,  handleChange, labelText, page,placeholder }) => {
  return (
    <Wrapper>
      <label htmlFor={name}>{labelText}</label>
      <input  
       type={type} name={name}
       value={value} id={name} 
       onChange={handleChange}
       placeholder={placeholder}
      />
    </Wrapper>
  )
}

    const Wrapper = styled.div`
        margin-left: 10px;
        margin-right: 17px;
        padding-top: 20px;
        display: flex;
        flex-direction: column;
      label{
        font-weight: 600;
        font-size: 20px;
      }
      input{
        width: 100%;
        height: 30px;
        margin-bottom: 1px;
        background-color: var(--backgroundColor);
      }
      @media (min-width: 600px) {
        margin-left: 40px;
        margin-right: 45px;
      }
      @media (min-width: 768px) {
        margin-left: 70px;
        margin-right: 75px;
      }
      @media (min-width: 992px) {
        margin-left: 200px;
        margin-right: 205px;
      }
    `
export default FormInput