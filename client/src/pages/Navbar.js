import React from "react";
import styled from 'styled-components';

const Navbar = () => {
  return (
    <Wrapper>
      <p className="logo-name">Book Club</p>
      <p>Books</p>
      <p>Requests</p>
      <p>Trades</p>
      <p>Users</p>
      <p>login</p>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  height: 300px;
  padding-top: 3px;
  background-color: red;
  .logo-name{
    font-size: 30px;
  }

`
export default Navbar;