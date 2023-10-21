import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/usersSlice';

const UsersPage = () => {
    const { users, isLoading } = useSelector((store) => store.users);
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getUsers());
    }, []);

    if (isLoading) return <div>Loading...</div>
  return (
    <div>UsersPage {console.log(users, 'render page')}</div>
  )
}

export default UsersPage;