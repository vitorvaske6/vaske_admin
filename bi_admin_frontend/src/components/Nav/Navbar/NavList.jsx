import React, { useEffect, useState } from 'react';
import useCollapse from 'react-collapsed';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Button, CollapseList, CollapseListV2 } from '../..';
import { useStateContext } from '../../../contexts/ContextProvider';
import { reportsv2 } from '../../../data/dummy';
import NonCollapseList from './NonCollapseList';
import removeAccents from 'remove-accents'



const NavList = (props) => {
  const { currentColor, isMouseOver, navData, mouseOver } = useStateContext();
  const [isHover, setIsHover] = useState(false);
  const [keyHover, setKeyHover] = useState(undefined);
  const [q, setQ] = useState("");
  const [searchTerm] = useState(["name"]);
  const navigate = useNavigate();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded: true });
  
  const handleIsHover = (key) => {
    setKeyHover(key);
    setIsHover(true);
  }

  const handleIsNotHover = () => {
    setKeyHover(undefined);
    setIsHover(false);
  }

  const routeChange = (page) => {
    //console.log("routechange")
    navigate(`${page}`);
  }

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

  console.log("props.item.groups", props.item)

  return (

    <div className={`absolute z-10 divide-gray-100 nav-item  top-[60px] bg-white dark:bg-[#42464D] p-2 rounded-lg w-80 border-1 border-t-8 `} style={{borderTopColor: currentColor}}>
      <p className='absolute z-10 top-[-25px] w-[100%]'>
        <FiChevronUp color={`${currentColor}`} size={30} style={{fill: currentColor}}/>
      </p>
      <label className={`mx-2 w-[95%] relative block pb-1`}>
        <FiSearch size={30} className=" absolute left-0 flex pt-2 items-center pl-2 text-gray-400" />
        <input
          type="text"
          placeholder={`Pesquisar...`}
          value={q}
          className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm`}
          onChange={(e) => setQ(e.target.value)} />
      </label>
      {
        props.item.groupEnabled ? (
          props.item.groups.map((item, index) => (
            props.item.title !== item.groupTitle && item.links.length > 0 ? (
              <CollapseListV2 item={item} key={`${item.title}-${index}`} itemKey={`${item.title}-${index}`} groupTitle={props.groupTitle} customSearch={search} />
            ) : (
              <NonCollapseList item={item} key={`${item.title}-${index}`} groupTitle={props.groupTitle} customSearch={search} />
            )
          ))
        ) : (
          <NonCollapseList item={props.item.groups[0]} key={`${props.item.groups[0].title}-${0}`} groupTitle={props.groupTitle} customSearch={search} />
        )
      }
    </div>
  );
};

export default NavList;
