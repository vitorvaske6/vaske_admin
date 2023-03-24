import React from 'react'
import { FiChevronDown } from 'react-icons/fi';
import { useStateContext } from '../../../contexts/ContextProvider';

const NavMenu = (props) => {
    return (
        <button
            type="button"
            onMouseOver={() => props.customFunc()}
            style={{ color: props.color, backfaceVisibility: "hidden" }}
            className={`relative text-xl py-2 px-3 hover:bg-light-gray hover:dark:bg-gray-600 bg-cover`}>
            {props.title}

        </button>
    );
};

export default NavMenu;