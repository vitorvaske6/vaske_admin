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
    //console.log(reports[mouseOver])


    return (
        <>
            {isLoggedIn ?
                <div className='flex relative dark:bg-main-dark-bg'>
                    {!isNavmenu ? (
                        <>
                            <div className='mt-2'>
                                <Hamburger toggled={!isSidemenu} toggle={handleIsNavMenu} duration={0.8} color={currentColor} size={20}/>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='p-1 '>
                                <Link to="/" className="relative ">
                                    <Logo />
                                </Link>
                            </div>
                            <div className='relative border-r-1 my-2 ' />
                            <div className="flex-1 block relative mt-2 w-24">
                                <div className='flex'>
                                    <div className='relative'>
                                        {navData.menusInfo?.map((item, index) => (
                                            <div key={`${item.title}-${index}`} className='inline-flex'>
                                                <NavMenu
                                                    title={item.title}
                                                    color={currentColor}
                                                    customFunc={() => [handleMouseOver(index), handleIsMouseOver(true), handleClick('navMenu'), handleMouseOverTitle(`${item.title}-${index}`)]}
                                                    report={reports[mouseOver]} />
                                                {isClicked.navMenu && isMouseOver !== null && mouseOver !== null && mouseOverTitle === `${item.title}-${index}` && (<NavList report={reports[mouseOver]} item={navData.menusInfo[mouseOver]} groupTitle={item.title}/>)}
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <UserNav />
                    {isClicked.cart && (<Cart />)}
                    {isClicked.chat && (<Chat />)}
                    {isClicked.notification && (<Notification />)}
                    {isClicked.userProfile && (<UserProfile />)}

                    {/* {isMouseOver != null && mouseOver != null && (<NavListV2 report={reports[mouseOver]} />)} */}
                </div> :
                <></>
            }
        </>
    );
};
