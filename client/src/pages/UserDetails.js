import React, {useEffect} from 'react';
import { useParams, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../features/usersSlice';
const UserDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() =>{
        dispatch(getUserDetails(id));
    }, [id]);

  return (
    <div>UserDetails {console.log(id)}</div>
  )
}

export default UserDetails