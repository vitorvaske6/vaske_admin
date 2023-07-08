import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { Cart, Chat, Notification, UserProfile, NavList, NavListV2, NavMenu, NavButton, UserNav, Logo } from '../../';
import { useStateContext } from '../../../contexts/ContextProvider';
import { reports, reportsv2 } from '../../../data/dummy';
import Hamburger from 'hamburger-react';

export const Navbar = () => {
    const { navData, profileInfo, isLoggedIn, currentColor, isMouseOver, handleClick, isClicked, handleMouseOver, mouseOver, isSidemenu, isNavmenu, handleIsMouseOver, setIsSidemenu, handlePosition } = useStateContext();
    const [mouseOverTitle, setMouseOverTitle] = useState('')
    const navigate = useNavigate();

    const handleIsNavMenu = () => {
        //console.log("click")
        setIsSidemenu(!isSidemenu);
    }

    const handleMouseOverTitle = (title) => {
        //console.log("click")
        setMouseOverTitle(title);
    }
    console.log(reports)


    return (
        <>
            {isLoggedIn ?
                <div className='flex relative dark:bg-main-dark-bg bg-main-bg h-16 w-full'>
                    <UserNav />
                    {isClicked.cart && (<Cart />)}
                    {isClicked.chat && (<Chat />)}
                    {isClicked.notification && (<Notification />)}
                    {isClicked.userProfile && (<UserProfile />)}

                    {isMouseOver != null && mouseOver != null && (<NavListV2 report={reports[mouseOver]} />)}
                </div> :    
                <></>
            }
        </>
    );
};
