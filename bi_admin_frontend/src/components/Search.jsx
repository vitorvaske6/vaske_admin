import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { useStateContext } from '../contexts/ContextProvider'

const Search = ({ width, filterText, setFilterText, customClassName}) => {
  const {currentColor} = useStateContext()

  const customColor = 'focus:border-['+currentColor+'] focus:ring-['+currentColor+']'
  return (
    <label className={`mx-2 w-${width} relative block pb-1 ${customClassName}`}>
      <FiSearch size={30} className={" absolute left-0 flex pt-2 items-center pl-2 text-gray-400 "} />
      <input
        type="text"
        placeholder={`Pesquisar...`}
        value={filterText}
        className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none ${customColor} focus:ring-1 text-sm`}
        onChange={e => setFilterText(e.target.value)} />
    </label>
  )
}

export default Search