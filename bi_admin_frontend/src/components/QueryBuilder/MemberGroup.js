import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import MemberDropdown from './MemberDropdown';
import RemoveButtonGroup from './RemoveButtonGroup';
import MemberGroupTitle from './MemberGroupTitle';
import PlusIcon from './PlusIcon';
import { FiSearch } from 'react-icons/fi';

const MemberGroup = ({
  members, availableMembers, addMemberName, updateMethods, title
}) => {
  const [filterText, setFilterText] = useState('')
  const [q, setQ] = useState("");
  const [searchTerm] = useState(["name"]);

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

  const filteredMembers = availableMembers.filter((item) => `${item.title}`.toLowerCase().includes(q.toLowerCase()) )

  return (
    <div >
      <MemberGroupTitle title={title} />
      {members.map(m => (
        <RemoveButtonGroup key={m.index || m.name} onRemoveClick={() => updateMethods.remove(m)}>
          <MemberDropdown type="selected" availableMembers={filteredMembers} onClick={updateWith => updateMethods.update(m, updateWith)} searchComp={
            (<label className={`mx-2 w-[95%] relative block pb-1`}>
              <FiSearch size={30} className=" absolute left-0 flex pt-2 items-center pl-2 text-gray-400" />
              <input
                type="text"
                placeholder={`Pesquisar...`}
                value={q}
                className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm`}
                onChange={(e) => setQ(e.target.value)} />
            </label>
            )} 
            customSearch={() => search}>
            {m.title}
          </MemberDropdown>
        </RemoveButtonGroup>
      ))}
      <MemberDropdown
        type={members.length > 0 ? "selected" : "new"}
        onClick={m => updateMethods.add(m)}
        availableMembers={filteredMembers}
        searchComp={
          (<label className={`mx-2 w-[95%] relative block pb-1`}>
            <FiSearch size={30} className=" absolute left-0 flex pt-2 items-center pl-2 text-gray-400" />
            <input
              type="text"
              placeholder={`Pesquisar...`}
              value={q}
              className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm`}
              onChange={(e) => setQ(e.target.value)} />
          </label>
          )}
          customSearch={() => search}>
        {addMemberName}
        <PlusIcon onClick={m => updateMethods.add(m)} />
      </MemberDropdown>
    </div>
  )
};

MemberGroup.propTypes = {
  members: PropTypes.array.isRequired,
  availableMembers: PropTypes.array.isRequired,
  addMemberName: PropTypes.string.isRequired,
  updateMethods: PropTypes.object.isRequired
};

export default MemberGroup;
