import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const BookRedirect = () => {
    const { id } = useParams();
  return (
    <div>BookRedirect</div>
  )
}

export default BookRedirect;
