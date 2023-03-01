import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Button } from '../..';
import { useStateContext } from '../../../contexts/ContextProvider';



const NonCollapseList = (props) => {

    const { verifyPermissions, currentColor, isMouseOver, mouseOver, position, isOpen, handleIsOpencurrentColor, sideMenuKeyActive, setSideMenuKeyActive, isSideMenuActive, setIsSideMenuActive, setSelectedReport } = useStateContext();
    const [isHover, setIsHover] = useState(false);
    const [keyHover, setKeyHover] = useState(undefined);
    const navigate = useNavigate();
    
    const handleIsHover = (key) => {
        setKeyHover(key);
        setIsHover(true);
    }

    const routeChange = (page, groupName, _id) => {
        console.log(_id, page)
        
        verifyPermissions(false, _id, page)

        if(_id !== undefined && groupName === 'Reports'){
            navigate(`${page}/${groupName}/${_id}`);
        }
        else{
            navigate(`${page}`);
        }
    }

    const handleIsActive = (key) => {
        setSideMenuKeyActive(key);
        setIsSideMenuActive(true);
    }
    
    const handleSelectedReport = (item, link) => {
        if(item === "Reports"){
            setSelectedReport(link);
        }
    }

    const activeLink = 'text-white dark:text-gray-200 m-2';
    const normalLink = 'text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    return (
        <>
            {props.customSearch(props.item.links).map((link, index) => (
                <div key={`${props.item.groupTitle}-${props.itemKey}-${index}`} className="mt-2 mr-4"> 
                <div key={`${props.item.title}-${link.name}-${index}`}>
                    <button
                        key={`button-${props.item.title}-${link.name}-${index}`}
                        onClick={() => [handleIsActive(`${props.item.title}-${link.name}-${index}`), handleSelectedReport(props.groupTitle, link), routeChange(link.page, props.item.groupTitle, link?.name.replace(" ", "-"))]}
                        style={{
                            backgroundColor: `${isSideMenuActive & sideMenuKeyActive === `${props.item.title}-${link.name}-${index}` ? currentColor : ''}`,
                        }}
                        className={`flex items-center p-2 rounded-lg text-md ${sideMenuKeyActive === `${props.item.title}-${link.name}-${index}` ? activeLink : normalLink}`}>
                        {link.name}
                    </button>
                </div>
            </div> 
                // <li key={`${item.title}-${index}-${item.name}-li`} className="flex items-center leading-8 gap-1 border-b-1 border-color p-1" >
                //     <p
                //         className={`cursor-pointer text-md dark:text-white p-2 rounded-md hover:text-white 'text-gray-500' ${isHover & keyHover === `${item.title}-${index}-${item.name}-li` ? `text-white` : 'text-gray-500'}`}
                //         key={`${item.title}-${index}-${item.name}-p`}
                //         style={{
                //             backgroundColor: isHover & keyHover === `${item.title}-${index}-${item.name}-li` ? `${currentColor}` : '',
                //         }}
                //         onMouseEnter={() => handleIsHover(`${item.title}-${index}-${item.name}-li`)}
                //         onMouseLeave={() => handleIsHover('')}
                //         //onClick={() => routeChange(item.page, props.item.groupTitle, item?.name.replace(" ", "-"))}
                //         onClick={() => [handleIsActive(`${props.item.title}-${item.name}-${index}`), handleSelectedReport(props.groupTitle, item), routeChange(item.page, props.item.groupTitle, item?.name.replace(" ", "-"))]}

                        
                //     >
                //         {item.name}
                //     </p>
                // </li>
            ))}
  
        </>
    );
};

export default NonCollapseList;
