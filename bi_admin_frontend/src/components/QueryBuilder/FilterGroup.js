import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Select } from 'antd';
import MemberDropdown from './MemberDropdown';
import RemoveButtonGroup from './RemoveButtonGroup';
import FilterInput from './FilterInput';
import PlusIcon from './PlusIcon';
import { FiSearch } from 'react-icons/fi';

const FilterGroup = ({
  members, availableMembers, addMemberName, updateMethods
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
  <span>
    {members.map(m => (
      <div style={{ marginBottom: 12 }} key={m.index}>
        <RemoveButtonGroup onRemoveClick={() => updateMethods.remove(m)}>
          <MemberDropdown
            type="selected-filter"
            onClick={updateWith => updateMethods.update(m, { ...m, dimension: updateWith })}
            availableMembers={filteredMembers}
            style={{
              width: "fit",
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
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
              customSearch={() => search}
          >
            {m.dimension.title}
          </MemberDropdown>
        </RemoveButtonGroup>
        <Select
          value={m.operator}
          onChange={(operator) => updateMethods.update(m, { ...m, operator })}
          style={{ width: 200, marginRight: 8 }}
        >
          {m.operators.map(operator => (
            <Select.Option
              key={operator.name}
              value={operator.name}
            >
              {operator.title}
            </Select.Option>
          ))}
        </Select>
        <FilterInput member={m} key="filterInput" updateMethods={updateMethods}/>
      </div>
    ))}
    <MemberDropdown
      onClick={(m) => updateMethods.add({ dimension: m })}
      availableMembers={filteredMembers}
      type="new"
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
        customSearch={() => search}
    >
      {addMemberName}
      <PlusIcon />
    </MemberDropdown>
  </span>
)};

FilterGroup.propTypes = {
  members: PropTypes.array.isRequired,
  availableMembers: PropTypes.array.isRequired,
  addMemberName: PropTypes.string.isRequired,
  updateMethods: PropTypes.object.isRequired
};

export default FilterGroup;
