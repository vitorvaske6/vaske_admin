import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Button } from '../..';
import { useStateContext } from '../../../contexts/ContextProvider';



const NavListV2 = (props) => {

    const { currentColor, isMouseOver, mouseOver, position, isOpen, handleIsOpen } = useStateContext();
    const [isHover, setIsHover] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [keyHover, setKeyHover] = useState(undefined);
    const [q, setQ] = useState("");
    const [searchTerm] = useState(["name"]);
    const navigate = useNavigate();
    
    const handleIsHover = (key) => {
        setKeyHover(key);
        setIsHover(true);
    }

    const handleIsNotHover = () => {
        setKeyHover('');
        setIsHover(false);
    }

    const handleIsClicked = () => {
        setIsClicked(!isClicked);
    }

    const routeChange = (page) => {
        navigate(`${page}`);
    }
    

    function search(items) {
        //console.log('\nFUNCTION SEARCH')
        //console.log({items})
        return items.filter((item) => {
            //console.log({item})
            return searchTerm.some((newItem) => {
                //console.log({newItem})
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
        <>
            {!isOpen ?
                <ul className={`absolute z-10 divide-gray-100 nav-item  top-[50px] bg-white dark:bg-[#42464D] p-2 rounded-lg w-80 border-1 `} onLoad={handleIsOpen}>
                    <li className="flex justify-between items-center py-2">
                        <span className="flex gap-4">
                            <p className="font-semibold text-lg px-4 dark:text-gray-200">{props.report.title}</p>
                            <button type="button" className="text-white text-xs rounded p-1  bg-orange-theme "></button>
                        </span>
                    </li>
                    <li className={`mx-2 w-[95%] relative block pb-1`} >
                        <FiSearch size={30} className=" absolute left-0 flex pt-2 items-center pl-2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={`Pesquisar...`}
                            value={q}
                            className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm`}
                            onChange={(e) => setQ(e.target.value)} />
                    </li>

                    {search(props.report.links).map((item, index) => (
                        <li key={`${item.title}-${index}-${item.name}-li`} className="flex items-center leading-8 gap-1 border-b-1 border-color p-1" >
                            <p
                                className={`cursor-pointer text-md dark:text-white p-2 rounded-md hover:text-white 'text-gray-500' ${isHover & keyHover === `${item.title}-${index}-${item.name}-li` ? `text-white` : 'text-gray-500'}`}
                                key={`${item.title}-${index}-${item.name}-p`}
                                style={{
                                    backgroundColor: isHover & keyHover === `${item.title}-${index}-${item.name}-li` ? `${currentColor}` : '',
                                }}
                                onMouseEnter={() => handleIsHover(`${item.title}-${index}-${item.name}-li`)}
                                onMouseLeave={() => handleIsHover('')}
                                onClick={() => routeChange(item.page)}
                                
                            >
                                {item.name}
                                
                            </p>
                        </li>
                    ))}
                </ul> : <></>
            }
        </>
    );
};

export default NavListV2;
