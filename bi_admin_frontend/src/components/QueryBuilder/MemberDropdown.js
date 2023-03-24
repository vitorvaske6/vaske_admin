import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { Menu } from "antd";
import { sortBy, prop } from 'ramda';
import ButtonDropdown from "./ButtonDropdown"; // Can't be a Pure Component due to Dropdown lookups overlay component type to set appropriate styles
import styled from "styled-components";
import PlusIcon from "./PlusIcon";
import Search from "../Search";
import { FiSearch } from "react-icons/fi";

const sortByTitle = sortBy(prop("title"));



// const memberMenu = (onClick, availableMembers) => (
//   <Menu>
//     {availableMembers.length ? (
//       sortByTitle(availableMembers).map(m => (
//         <Menu.Item key={m.name} onClick={() => {onClick(m);console.log('click',m)}}>
//           {m.title}
//         </Menu.Item>
//       ))
//     ) : (
//       <Menu.Item disabled>No members found</Menu.Item>
//     )}
//   </Menu>
// );

const memberMenu = (onClick, availableMembers, searchComp) => {
  const items = availableMembers.map(m => ({
    ...m,
    key: m.name,
    label: m.title
  }))

  const _onClick = (e) => {
    const memberClicked = availableMembers.filter((item) => item.name === e.key)
    onClick(memberClicked[0]);
  };

  return (
    <div className="relative overflow-y-auto overflow-x-hidden max-h-[400px] bg-main-bg dark:bg-main-dark-bg shadow-sm p-2 block rounded-sm">
      {searchComp}
      {availableMembers.map(m => (
        <p className="cursor-pointer hover:bg-gray-600 hover:bg-opacity-5 p-1 rounded-sm" key={m.name} onClick={() => onClick(m)}>{m.title}</p>
      ))}
    </div>
  )
};

const MemberDropdown = ({ onClick, availableMembers, searchComp, ...buttonProps }) => (
  <ButtonDropdown
    overlay={memberMenu(onClick, availableMembers, searchComp)}
    {...buttonProps}
  />
);

MemberDropdown.propTypes = {
  onClick: PropTypes.func.isRequired,
  availableMembers: PropTypes.array.isRequired
};
export default MemberDropdown;
