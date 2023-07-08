import React, { useState } from 'react'
import useCollapse from 'react-collapsed';
import { FiChevronDown, FiChevronUp, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';


const ButtonList = ({ topTitle, buttonLevel, search, group, handleIsActive, routeChange, activeLink, normalLink }) => {
    const { setSelectedReport, currentColor, sideMenuKeyActive, isSideMenuActive } = useStateContext();

    const handleSelectedReport = (item, link) => {
        if (item === "Reports") {
            setSelectedReport(link);
        }
    }

    return (
        search(group.links).map((link, index) => (
            <div key={`${link._id}`} style={{ marginLeft: buttonLevel * 26 }}>
                <button
                    key={`button-${link._id}`}
                    onClick={() => [handleIsActive(`${link._id}`), handleSelectedReport(topTitle, link), routeChange(link, topTitle, group.groupTitle)]}
                    style={{
                        backgroundColor: `${isSideMenuActive & sideMenuKeyActive === `${link._id}` ? currentColor : ''}`,
                    }}
                    className={`flex items-center p-2 rounded-lg text-md ${sideMenuKeyActive === `${link._id}` ? activeLink : normalLink}`}>
                    {link.name}
                </button>
            </div>
        ))
    )
}
const ButtonToggle = ({ toggleLevel, title, isExpanded, getToggleProps }) => {
    const { sidebarToggle } = useStateContext();

    return (
        <>
            {sidebarToggle ? (
                <div style={{ marginLeft: toggleLevel * 26 }} className="grid gap-1 grid-cols-2 grid-rows-1" {...getToggleProps()}>
                    <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase" >{title}</p>
                    <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase" >
                        {isExpanded ? (<FiChevronUp />) : (<FiChevronDown />)}
                    </p>
                </div>
            ) : (
                <div {...getToggleProps()} className=' w-[60%] h-[60%] hover:rounded-xl hover:bg-main-dark-bg hover:bg-opacity-10 p-4'>
                    <p className="text-gray-400 dark:text-gray-400 uppercase text-center" >{title.substring(0, 3)}</p>
                </div>
            )}
        </>
    )
}

const InnerColapseList = ({ group, buttonListProps, topTitle }) => {
    const { currentColor, sideMenuKeyActive, isSideMenuActive } = useStateContext();
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded: true });

    return (
        <>
            {group.groupTitle !== topTitle && (<ButtonToggle toggleLevel={1} title={group.groupTitle} isExpanded={isExpanded} getToggleProps={getToggleProps} />)}
            <div {...getCollapseProps()}>
                <ButtonList topTitle={topTitle} buttonLevel={1} group={group} {...buttonListProps} />
            </div>
        </>
    )
}

const CollapseList = ({ item, customSearch }) => {
    const { sidebarToggle, setSelectedReport, verifyPermissions, currentColor, sideMenuKeyActive, setSideMenuKeyActive, isSideMenuActive, setIsSideMenuActive } = useStateContext();
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded: true });
    const { getSubCollapseProps, getSubToggleProps, isSubExpanded } = useCollapse({ defaultSubExpanded: true });
    const [q, setQ] = useState("");
    const [searchTerm] = useState(["name"]);
    const navigate = useNavigate();


    const activeLink = 'text-white dark:text-gray-200 m-2';
    const normalLink = 'text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    const handleIsActive = (key) => {
        setSideMenuKeyActive(key);
        setIsSideMenuActive(true);
    }

    const routeChange = (link, topTitle, groupTitle) => { //page, groupName, _id, menuTitle) => {

        if (link._id !== undefined && topTitle === 'Reports') {
            setSelectedReport(link)
            navigate(`relatorios/${groupTitle}/${link.page}`);
        }
        else {
            verifyPermissions(false, link._id, link.page)
            navigate(`${link.page}`);
        }
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

    const buttonListProps = {
        search,
        handleIsActive,
        routeChange,
        activeLink,
        normalLink
    }

    return (
        <>
            {sidebarToggle ? (
                <div key={item._id} className="border-b-1 justify-center place-items-center">
                    <ButtonToggle toggleLevel={0} title={item.title} isExpanded={isExpanded} getToggleProps={getToggleProps} />

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
                        <>
                            {item.groups.map((group, index) => (
                                <>
                                    {item.groupEnabled ? (
                                        <InnerColapseList topTitle={item.title} group={group} buttonListProps={buttonListProps} />
                                    ) : (
                                        <ButtonList topTitle={item.title} buttonLevel={0} group={group} {...buttonListProps} />
                                    )}
                                </>
                            ))}
                        </>
                    </div>
                </div>
            ) : (
                <div key={item._id} className="mt-4 relative">
                    <div className='w-full h-full'>
                        <ButtonToggle toggleLevel={0} title={item.title} isExpanded={isExpanded} getToggleProps={getToggleProps} />

                    </div>

                    <div {...getCollapseProps()} className='relative'>
                        {/* <label className={`mx-2 w-[95%] relative block pb-1`}>
                            <FiSearch size={30} className=" absolute left-0 flex pt-2 items-center pl-2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={`Pesquisar...`}
                                value={q}
                                className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm`}

                                onChange={(e) => setQ(e.target.value)} />
                        </label> */}
                        <>
                            {item.groups.map((group, index) => (
                                <>
                                    {item.groupEnabled ? (
                                        <InnerColapseList topTitle={item.title} group={group} buttonListProps={buttonListProps} />
                                    ) : (
                                        <ButtonList topTitle={item.title} buttonLevel={0} group={group} {...buttonListProps} />
                                    )}
                                </>
                            ))}
                        </>
                    </div>
                </div>
            )}
        </>

    )
}

export default CollapseList;