import React, { useState } from 'react'
import useCollapse from 'react-collapsed';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';


const CollapseList = (props) => {
    const { currentColor, sideMenuKeyActive, setSideMenuKeyActive, isSideMenuActive, setIsSideMenuActive } = useStateContext();
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded: true });
    const [q, setQ] = useState("");
    const [searchTerm] = useState(["name"]);
    const navigate = useNavigate();


    const activeLink = 'text-white dark:text-gray-200 m-2';
    const normalLink = 'text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    const handleIsActive = (key) => {
        setSideMenuKeyActive(key);
        setIsSideMenuActive(true);
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

    return (
        <div key={props.key} className="border-b-1 mt-2 mr-4">
            <div className="grid gap-1 grid-cols-2 grid-rows-1" {...getToggleProps()}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase" >
                    {props.item.title}
                </p>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase" >
                    {isExpanded ? (<FiChevronUp />) : (<FiChevronDown />)}
                </p>
            </div>

            <div {...getCollapseProps()}>
                <label className={`mx-2 w-[95%] relative block pb-1`}>
                    <FiSearch size={30} className=" absolute left-0 flex pt-2 items-center pl-2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={`Pesquisar...`}
                        value={q}
                        className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm`}
                        
                        onChange={(e) => setQ(e.target.value)} />
                </label>
                {search(props.item.links).map((links, index) => (
                    <div key={`${props.item.title}-${links.name}-${index}`}>
                        <button
                            key={`button-${props.item.title}-${links.name}-${index}`}
                            onClick={() => [handleIsActive(`${props.item.title}-${links.name}-${index}`), routeChange(links.page)]}
                            style={{
                                backgroundColor: `${isSideMenuActive & sideMenuKeyActive === `${props.item.title}-${links.name}-${index}` ? currentColor : ''}`,
                            }}
                            className={`flex items-center p-2 rounded-lg text-md ${sideMenuKeyActive === `${props.item.title}-${links.name}-${index}` ? activeLink : normalLink}`}>
                            {links.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CollapseList;