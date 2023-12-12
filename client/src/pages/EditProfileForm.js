import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getUserDetails, handleEditProfileInputs, handleAddress, handleCity, handleName, handleState, updateUserProfile, resetUpdateProfileMessage
} from '../features/usersSlice';
import { useParams, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import styled from 'styled-components';
import { toggleOnHasUpdateProfile } from '../features/authSlice';



const EditProfileForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const { 
        userDetails, isLoading, name, city, userState, address, updateProfileMessage, profileUpdateResult
    } = useSelector((store) => store.users);
 
    useEffect(() =>{
        dispatch(getUserDetails(id));
    }, [id])

    useEffect(() =>{
        const name = 'name', userState = 'userState', city = 'city', address = 'address';
        const stateName = userDetails?.name, stateState = userDetails?.state, stateCity = userDetails?.city, stateAddress = userDetails.address;
        dispatch(handleName({name, stateName}));
        dispatch(handleState({userState, stateState}));
        dispatch(handleCity({city, stateCity}));
        dispatch(handleAddress({address, stateAddress}));
    }, [userDetails]);

    useEffect(() =>{
        dispatch(toggleOnHasUpdateProfile());
    }, []);


    const handleChange = (e) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleEditProfileInputs({name, value}));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        const userId = id; 
        if (!userId || !name || !city || !userState || !address) alert('Please provide all values');
        else dispatch(updateUserProfile({userId, name, city, userState, address}));
    };

    useEffect(() =>{
        if (updateProfileMessage === 'Your profile has been updated successfully'){
            navigate(`/users/users-details/${id}`);
            dispatch(resetUpdateProfileMessage());
            const localStorageUser = JSON.parse(localStorage.getItem("user"));
            
            localStorageUser.name = profileUpdateResult.name;
            localStorageUser.city = profileUpdateResult.city;
            localStorageUser.state = profileUpdateResult.state;
            localStorageUser.address = profileUpdateResult.address;
            
            localStorage.setItem('user', JSON.stringify(localStorageUser));
        }
    }, [updateProfileMessage]);
  return (
    <Wrapper>
        <p className='form-title'>Edit Your Profile</p>
        <form onSubmit={handleSubmit}>
            <FormInput type='text' name='name' value={name} handleChange={handleChange} labelText='Full Name' />
            <FormInput type='text' name='city' value={city} handleChange={handleChange} labelText='City' />
            <FormInput type='text' name='userState' value={userState} handleChange={handleChange} labelText='State' />
            <FormInput type='text' name='address' value={address} handleChange={handleChange} labelText='Address' />
            <div className='btn-container'>
                <button disabled={isLoading ? true : false} className='profile-btn' type='submit'>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </div>
        </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    background: var(--color1);
    padding-top: 5px;
    width: 100%;
    height: 90vh;
    .form-title{ 
        font-size: 25px;
        font-weight: 600;
        margin-top: 7px;
        margin-bottom: -7px;
        text-align: center;
    }
    .btn-container{
        margin-left: 10px;
        margin-right: 10px;
    }
    .profile-btn{
        width: 100%;
        margin-top: 15px;
        border: none;
        background-color: var(--btnColor);
        height: 33px;
        border-radius: 3px;
        color: var(--backgroundColor);
        cursor: pointer;
    }
    @media (min-width: 600px) {
      .btn-container{
        margin-left: 40px;
        margin-right: 40px;
        }
    }
    @media (min-width: 768px) {
        .btn-container{
        margin-left: 70px;
        margin-right: 68px;
        }
        .form-title{
        margin-top: 65px;
        }
    }
    @media (min-width: 992px) {
    .btn-container{
      margin-left: 200px;
      margin-right: 198px;
    }
  }
`

export default EditProfileForm;