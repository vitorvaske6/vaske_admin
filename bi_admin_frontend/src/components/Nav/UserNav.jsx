import React from 'react';
import { MdKeyboardArrowDown, MdOutlineCancel } from 'react-icons/md';

import { Button, NavButton } from '../';
import { chatData } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { RiNotification3Line } from 'react-icons/ri';
import avatar from '../../data/avatar.jpg';
import { FaUserAlt, FaUserCircle } from 'react-icons/fa';
import dummyPicture from '../../data/avatar2.jpg'

const UserNav = () => {
    const { currentColor, profileInfo, handleClick, userLoginInfo } = useStateContext();

    return (
        <div className="flex ml-0 ml-1px mt-2 absolute right-0">
            <NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor} icon={<FiShoppingCart />} />
            <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
            <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
            <TooltipComponent content="Profile" position="BottomCenter">
                <div
                    className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                    onClick={() => handleClick('userProfile')}
                >
                    {/* {userLoginInfo.picture ?
                        (
                            <img
                                className="rounded-full w-8 h-8"
                                src={userLoginInfo.picture}
                                alt="user-profile"
                            />
                        )
                        :
                        (
                            <FaUserCircle
                            className="rounded-full w-8 h-8 text-gray-700" />
                        )
                    } */}
                    <img
                                className="rounded-full w-8 h-8"
                                src={dummyPicture}
                                alt="user-profile"
                            />
                    <p>
                        <span className="text-gray-400 font-bold ml-1 text-14">
                            {profileInfo.name}
                        </span>
                    </p>
                    <MdKeyboardArrowDown className="text-gray-400 text-14" />
                </div>
            </TooltipComponent>
        </div>
    );
};

export default UserNav;
