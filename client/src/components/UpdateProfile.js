import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleOffHasUpdateProfile, toggleOnHasUpdateProfile } from '../features/authSlice';


const UpdateProfile = () => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    const { hasUpdatedProfile } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() =>{
        const name = localStorageUser?.name;
        const city = localStorageUser?.city;
        const state = localStorageUser?.state;
        const address = localStorageUser?.address;
        if((!name || !city || !state || !address) && localStorageUser?.token) dispatch(toggleOffHasUpdateProfile());
    }, [location]);

    const handleUpdateClick = () =>{
        navigate(`users/users-details/${localStorageUser?.userId}`);
        dispatch(toggleOnHasUpdateProfile());
    };

  return (
    <Wrapper>
        <div className={hasUpdatedProfile ? 'modal-container2' : 'modal-container1'}>
            <div className='container'>
                <button onClick={() => dispatch(toggleOnHasUpdateProfile())} className='close-modal-btn'><FaTimes size={22} /></button>
                <div className='update-container'>
                    <p className='update-p'>Please update your profile</p>
                    <button onClick={handleUpdateClick} className='update-btn'>Update</button>
                </div>
            </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`

.modal-container1{
    background-color: rgba(37, 38, 38, 0.7);
    width: 100vw;
    height: 110vh;
    position: fixed;
    z-index: 1;
    display: flex;
    flex-wrap: row;
    align-items: center;
    justify-content: center;
    /* display: none; */
}
.modal-container2{
    display: none;
}
.container{
    width: 70%;
    height: 25%;
    background-color: white;
    border-radius: 3px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.close-modal-btn{
    border: none;
    background: inherit;
    position: absolute;
    right: 1px;
    top: 5px;
    cursor: pointer;
}
.update-container{
    text-align: center;
}
.update-btn{
    background-color: var(--btnColor);
    color: white;
    border: none;
    border-radius: 3px;
    width: 100px;
    height: 30px;
    cursor: pointer;
}
.update-p{
    font-weight: 500;
}
@media (min-width: 600px) {
    .container{
        height: 30%;
    }
    .update-p{
        font-size: 20px;
    }
}
@media (min-width: 768px) {
    .container{
        width: 60%;
        height: 35%;
    }
    .update-p{
        font-size: 25px;
    }
}
@media (min-width: 992px) {
    .container{
        width: 50%;
    }
}
`
export default UpdateProfile;