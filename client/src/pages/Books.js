import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../features/bookSlice';

const Books = () => {
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getBooks());
  }, []);

  return (
    <div>Book</div>
  )
}

export default Books;