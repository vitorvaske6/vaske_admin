import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '../';
import { userProfileData } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import avatar from '../../data/avatar.jpg';
import axios from 'axios';
import env from 'react-dotenv';
import { FaUserAlt, FaUserCircle } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import dummyPicture from '../../data/avatar2.jpg'
import { FiLogOut } from 'react-icons/fi';

const UserProfile = () => {
  const { clearStates, ServerEndpoint, currentColor, userLoginInfo, profileInfo, setCookie, setLoginError, setIsLoggedIn } = useStateContext();
  const [logoutError, setLogoutError] = useState(null);

  async function handleLogout() {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/api/sessions`, {
        withCredentials: true,
      }
      ).then(res => [setCookie({ 'accessToken': res.data.accessToken, 'refreshToken': res.data.refreshToken }), setIsLoggedIn(false)])

    } catch (e) {
      setLogoutError(e.message);
    }
    clearStates()
  }
  //console.log(userLoginInfo)

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">

        {/* {userLoginInfo.picture ?
          (
            <img
              className="rounded-full h-24 w-24"
              src={userLoginInfo.picture}
              alt="user-profile"
            />
          )
          :
          (
            <FaUserCircle
            className="rounded-full h-20 w-20 text-gray-700" />
          )
        } */}
        <img
              className="rounded-full h-24 w-24"
              src={dummyPicture}
              alt="user-profile"
            />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {profileInfo.name} {profileInfo.surname} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {profileInfo.profileFunction}   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {userLoginInfo.email} </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={() => handleLogout()}
          style={{ backgroundColor: currentColor, color: "white", borderRadius: "10px" }}
          className={`w-full grid grid-cols-1 grid-rows-1 place-items-center hover:drop-shadow-xl hover:bg-${currentColor}`}
        >
          <span className='p-3 grid grid-cols-2 place-items-center'>
           Sair <FiLogOut className='ml-2 flex-1' />
          </span>
        </button>

      </div>
    </div>

  );
};

export default UserProfile;
