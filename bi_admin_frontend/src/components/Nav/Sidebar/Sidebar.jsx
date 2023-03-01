import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { reports } from '../../../data/dummy';
import { useStateContext } from '../../../contexts/ContextProvider';

import CollapseList from './CollapseList';
import Logo from '../../Logo';
import { Squash as Hamburger } from 'hamburger-react'


const Sidebar = () => {
  const { currentColor, isSidemenu, setIsSidemenu } = useStateContext();

  const handleIsSidemenu = () => {
    setIsSidemenu(!isSidemenu);
  }
  
  return (
    <div className='ml-3 w-[768px] h-screen pb-10 fixed z-50 overflow-auto  sidebar dark:bg-secondary-dark-bg bg-white '>
      <div className="grid grid-cols-[5%_95%] justify-between items-center border-b-1 -border-wx-5  pb-2 ">
        <span></span>
        <Link to="/" className="relative mt-2">
          <Logo />
        </Link>
        {/* <Hamburger toggled={!isSidemenu} toggle={handleIsSidemenu} duration={0} color={currentColor} size={20}/> */}
      </div>
      {
        reports.map((item, index) => (
          <CollapseList item={item} key={`${item.title}-${index}`}/>
        ))
      }
    </div>
  );
};

export default Sidebar;
