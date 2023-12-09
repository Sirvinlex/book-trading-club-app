import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrades } from '../features/bookSlice';

const Trades = () => {
    const { trades } = useSelector((store) => store.book);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getTrades());
    }, []);

  return (
    <div>{console.log(trades, 'trades')}</div>
  )
}

export default Trades;