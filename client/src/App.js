import React from "react";
import UpdateProfile from "./components/UpdateProfile";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  ErrorPage, Home, Navbar, RegisterLogin, Books, UsersPage, UserDetails, EditProfileForm, UserBooks, BookRedirect, CreateRequestPage, 
  BookRequests, Trades, AllRequestsForBook,
} from './pages';

function App() {
  return ( 
    <BrowserRouter>
      <UpdateProfile />
      <Navbar />
      {/* <ToastContainer position='top-center' /> */}
      {/* <PostToast /> */}
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='books' element={<Books />} />
        {/* <Route path='books/user-books/:id' element={<UserBooks />} /> */}
        <Route path='authentication-page' element={<RegisterLogin />} />
        <Route path='users' element={<UsersPage />} />
        <Route path='edit-profile/:id' element={<EditProfileForm />} />
        <Route path='users/users-details/:id' element={<UserDetails />} />
        <Route path='users/user-books/:id' element={<UserBooks />} />
        <Route path='books/create-request' element={<CreateRequestPage />} />
        <Route path='books/requests' element={<BookRequests />} />
        <Route path='books/requests/:id' element={<AllRequestsForBook />} />
        <Route path='trades' element={<Trades />} />
        <Route path='' element={<BookRedirect />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
