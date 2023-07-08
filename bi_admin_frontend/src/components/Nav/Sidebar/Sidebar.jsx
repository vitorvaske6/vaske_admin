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
  const { sidebarToggle, sidebarSize, currentColor, isSidemenu, setIsSidemenu, navData } = useStateContext();
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
      <div style={{ width: sidebarSize }} className={`transition-all duration-500 ease-in-out h-full z-10 fixed top-0 left-0 overflow-x-hidden  sidebar dark:bg-secondary-dark-bg bg-main-bg`}>
      <div className="justify-between items-center border-b-1 -border-wx-5 flex pb-2 ">
        <Link to="/" className="relative mt-2 w-52">
          <Logo noText={sidebarToggle} />
        </Link>
      </div>
      {
        navData?.menusInfo.map((propsItem, index) => (
            <CollapseList item={propsItem} customSearch={search} />
        ))
      }
    </div>
  );
};

export default Sidebar;
