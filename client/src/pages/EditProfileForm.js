import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getUserDetails, handleEditProfileInputs, handleAddress, handleCity, handleName, handleState, updateUserProfile 
} from '../features/usersSlice';
import { useParams, } from 'react-router-dom';
import FormInput from '../components/FormInput';
import styled from 'styled-components';


const EditProfileForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { userDetails, isLoading, name, city, state, address, } = useSelector((store) => store.users);

    useEffect(() =>{
        dispatch(getUserDetails(id));
    }, [id])

    useEffect(() =>{
        const name = 'name', state = 'state', city = 'city', address = 'address';
        const stateName = userDetails?.name, stateState = userDetails?.state, stateCity = userDetails?.city, stateAddress = userDetails.address;
        dispatch(handleName({name, stateName}));
        dispatch(handleState({state, stateState}));
        dispatch(handleCity({city, stateCity}));
        dispatch(handleAddress({address, stateAddress}));
    }, [userDetails])

    // {type, name, value,  handleChange, labelText, page,placeholder }

    const handleChange = (e) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleEditProfileInputs({name, value}));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        const userId = id; 
        dispatch(updateUserProfile({userId, name, city, state, address}));
    };

  return (
    <Wrapper>
        <p className='form-title'>Edit Your Profile</p>
        <form onSubmit={handleSubmit}>
            <FormInput type='text' name='name' value={name} handleChange={handleChange} labelText='Full Name' />
            <FormInput type='text' name='city' value={city} handleChange={handleChange} labelText='City' />
            <FormInput type='text' name='state' value={state} handleChange={handleChange} labelText='State' />
            <FormInput type='text' name='address' value={address} handleChange={handleChange} labelText='Address' />
            <div className='btn-container'><button className='profile-btn' type='submit'>Submit</button></div>
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