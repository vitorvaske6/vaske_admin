import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import {
  Button,
  Menu
} from 'antd';
import ButtonDropdown from './ButtonDropdown';
import MemberDropdown from './MemberDropdown';
import RemoveButtonGroup from './RemoveButtonGroup';
import MemberGroupTitle from './MemberGroupTitle';
import PlusIcon from './PlusIcon';
import styled from 'styled-components';
import TextInput from '../TextInput';
import { DatePicker, Space } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';
import { FiSearch } from 'react-icons/fi';

const { RangePicker } = DatePicker;

const DateRanges = [
  { title: 'Todo o Período', value: 'All time' },
  { title: 'Hoje', value: 'Today' },
  { title: 'Ontem', value: 'Yesterday' },
  { title: 'Essa semana', value: 'This week' },
  { title: 'Esse mês', value: 'This month' },
  { title: 'Esse quarter', value: 'This quarter' },
  { title: 'Esse ano', value: 'This year' },
  { title: 'Últimos 7 dias', value: 'Last 7 days' },
  { title: 'Últimos 30 dias', value: 'Last 30 days' },
  { title: 'Última semana', value: 'Last week' },
  { title: 'Último mês', value: 'Last month' },
  { title: 'Último quarter', value: 'Last quarter' },
  { title: 'Último ano', value: 'Last year' },
  { title: 'Personalizar', value: 'Custom' }
];

const DateGranularity = [
  { title: 'Sem Agrupamento', value: 'w/o grouping' },
  { title: 'Segundo', value: 'Second' },
  { title: 'Minuto', value: 'Minute' },
  { title: 'Hora', value: 'Hour' },
  { title: 'Dia', value: 'Day' },
  { title: 'Semana', value: 'Week' },
  { title: 'Mês', value: 'Month' },
  { title: 'Quarter', value: 'Quarter' },
  { title: 'Ano', value: 'Year' }
];

const GroupLabel = styled.span`
  font-size: 14px;
  margin: 0 12px;
`

const dateRange = {
  start: '',
  end: ''
}

const TimeGroup = ({
  members, availableMembers, addMemberName, updateMethods, title
}) => {

  const [dateRangeInput, setDateRangeInput] = useState(dateRange)
  const [appliedCustomRange, setAppliedCustomRange] = useState(false)
  const [filterText, setFilterText] = useState('')
  const [q, setQ] = useState("");
  const [searchTerm] = useState(["name"]);

  useEffect(() => {
    if (appliedCustomRange)
      setDateRangeInput(dateRange)
    setAppliedCustomRange(false)
  }, [appliedCustomRange])

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



  function returnTranslatedTitle(m) {
    if (Array.isArray(m)) {
      // let formattedDates = m.map((item) => (
      //   moment(item).format('DD/MM/YYYY')
      // ))
      return m.join(' - ')
    }
    const title = DateGranularity.filter((item) => {
      return m === item.value
    })

    const titleDim = DateRanges.filter((item) => {
      return m === item.value
    })

    let res = title.length > 0 ? title : titleDim

    return res[0]?.title !== undefined ? res[0].title : m
  }

  const granularityMenu = (member, onClick) => {
    return (
      <Menu>
        {member.granularities.length ? member.granularities.map(m => (
          <Menu.Item key={m.title} onClick={() => onClick(m)}>
            {returnTranslatedTitle(m.title)}
          </Menu.Item>
        )) : <Menu.Item disabled>No members found</Menu.Item>}
      </Menu>
    )
  };

  const dateRangeMenu = (onClick) => (
    <Menu>
      {DateRanges.map(m => (
        <Menu.Item key={m.title || m.value} onClick={() => onClick(m)}>
          {m.title || m.value}
        </Menu.Item>
      ))}
    </Menu>
  );

  const filteredMembers = availableMembers.filter((item) => `${item.title}`.toLowerCase().includes(q.toLowerCase()) )

  return (
    <div>
      <MemberGroupTitle title={title} />
      {members.map(m => [
        <RemoveButtonGroup onRemoveClick={() => updateMethods.remove(m)} key={`${m.dimension.name}-member`}>
          <MemberDropdown
            type="selected"
            onClick={updateWith => updateMethods.update(m, { ...m, dimension: updateWith })}
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
              customSearch={() => search}
          >
            {m.dimension.title}
          </MemberDropdown>
        </RemoveButtonGroup>,
        <GroupLabel key={`${m.dimension.name}-for`}>Período</GroupLabel>,
        <ButtonDropdown
          type="time-group"
          overlay={dateRangeMenu(dateRange => dateRange.value === 'All time' ? updateMethods.update(m, { ...m, dateRange: null }) : updateMethods.update(m, { ...m, dateRange: dateRange.value }))}
          key={`${m.dimension.name}-date-range`}
        >
          {returnTranslatedTitle(m.dateRange) || 'Todo o Período'}
        </ButtonDropdown>,
        <GroupLabel key={`${m.dimension.name}-by`}>por</GroupLabel>,
        <ButtonDropdown
          type="time-group"
          overlay={granularityMenu(
            m.dimension,
            granularity => updateMethods.update(m, { ...m, granularity: granularity.name })
          )}
          key={`${m.dimension.name}-granularity`}
        >
          {
            returnTranslatedTitle(m.dimension.granularities.find(g => g.name === m.granularity)
              && m.dimension.granularities.find(g => g.name === m.granularity).title)
          }
        </ButtonDropdown>,
        <>
          {m.dateRange === 'Custom' && (
            <GroupLabel key={`custom-daterange-#33`}>Range: &nbsp;
            <RangePicker locale={locale} onChange={(value, dateString) => updateMethods.update(m, { ...m, dateRange: [dateString[0], dateString[1]] })} />
            </GroupLabel>
          )}
        </>
      ])}
      {!members.length && (
        <MemberDropdown
          onClick={member => updateMethods.add({ dimension: member, granularity: 'day' })}
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
      )}
    </div>
  );
};

TimeGroup.propTypes = {
  members: PropTypes.array.isRequired,
  availableMembers: PropTypes.array.isRequired,
  addMemberName: PropTypes.string.isRequired,
  updateMethods: PropTypes.object.isRequired
};

export default TimeGroup;
