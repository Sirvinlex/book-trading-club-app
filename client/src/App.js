import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorPage, Home, Navbar, RegisterLogin, Books, UsersPage, UserDetails } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <ToastContainer position='top-center' /> */}
      {/* <PostToast /> */}
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='authentication-page' element={<RegisterLogin />} />
        <Route path='books' element={<Books />} />
        <Route path='users' element={<UsersPage />} />
        <Route path='users/users-details/:id' element={<UserDetails />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
