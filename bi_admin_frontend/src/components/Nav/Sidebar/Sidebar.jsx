import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { reports } from '../../../data/dummy';
import { useStateContext } from '../../../contexts/ContextProvider';

import CollapseList from './CollapseList';
import Logo from '../../Logo';
import { Squash as Hamburger } from 'hamburger-react'
import CollapseListV2 from '../Navbar/CollapseList';
import NonCollapseList from '../Navbar/NonCollapseList';


const Sidebar = () => {
  const { currentColor, isSidemenu, setIsSidemenu, navData } = useStateContext();
  const [q, setQ] = useState("");
  const [searchTerm] = useState(["name"]);

  const handleIsSidemenu = () => {
    setIsSidemenu(!isSidemenu);
  }
  console.log(navData, reports)

  function search(items) {
    return items.filter((item) => {
      return searchTerm.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  return (
    <div className='w-[368px] h-screen pb-10 fixed z-50 overflow-auto  sidebar dark:bg-secondary-dark-bg bg-white '>
      <div className="justify-between items-center border-b-1 -border-wx-5 flex pb-2 ">
        <span></span>
        <Link to="/" className="relative mt-2 w-52">
          <Logo />
        </Link>
        <Hamburger toggled={!isSidemenu} toggle={handleIsSidemenu} duration={0} color={currentColor} size={20}/> 
      </div>
      {
        navData.menusInfo.map((propsItem, index) => (
          propsItem.groups.map((item, index) => (
            <CollapseListV2 item={item} key={`${item.title}-${index}`} itemKey={`${item.title}-${index}`} groupTitle={item.groupTitle} customSearch={search} />
          ))
        ))
      }
    </div>
  );
};

export default Sidebar;
