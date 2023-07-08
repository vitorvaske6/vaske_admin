import React, { useState } from 'react'
import useCollapse from 'react-collapsed';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';

const CollapseListV2 = (props) => {
    const { currentColor, sideMenuKeyActive, setSideMenuKeyActive, isSideMenuActive, setIsSideMenuActive, setSelectedReport } = useStateContext();
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded: true });
    const navigate = useNavigate();

    const activeLink = 'text-white dark:text-gray-200 m-2';
    const normalLink = 'text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    const handleIsActive = (key) => {
        setSideMenuKeyActive(key);
        setIsSideMenuActive(true);
    }

    const routeChange = (page, groupName, _id) => {
        //console.log(_id)
        if (_id !== undefined) {
            navigate(`${page}/${groupName}/${_id}`);
        }
        else {
            navigate(`${page}`);
        }
    }

    const handleSelectedReport = (item, link) => {
        if (item === "Reports") {
            setSelectedReport(link);
        }
    }


    return (
        <>
            <div className="grid gap-1 grid-cols-2 grid-rows-1" {...getToggleProps()}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase" >
                    {props.item.groupTitle}-
                </p>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase" >
                    {isExpanded ? (<FiChevronUp />) : (<FiChevronDown />)}
                </p>
            </div>

            <div className="border-b-1">
                {
                    props.customSearch(props.item.links).map((link, index) => (
                        <div key={`${props.item.groupTitle}-${props.itemKey}-${index}`} className="mt-2 mr-4" {...getCollapseProps()}>
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
                    ))
                }
            </div>
        </>


    )
}

export default CollapseListV2;