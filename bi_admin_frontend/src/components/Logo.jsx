import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { useStateContext } from '../contexts/ContextProvider'
import vaskeLogoBlack from '../data/vaskeLogoBlack.svg'
import vaskeLogoWhite from '../data/vaskeLogoWhite.svg'

const Logo = ({ logoSize, noText }) => {
  const { currentColor, currentMode } = useStateContext()

  const fullImg = "h-[60px] p-2"
  const smallImg = "h-[50px] p-2"
  const fullTxt = "font-bold text-4xl mt-2 ml-1 mr-4 dark:text-white"
  const smallTxt = "font-bold text-2xl mt-2 ml-1 mr-4 dark:text-white"

  return (
    <>
      <div className='w-full justify-center flex'>
        <img src={currentMode === 'Dark' ? vaskeLogoWhite : vaskeLogoBlack} className={smallImg} alt='biadminLogo' />
        {noText && (<p className={smallTxt}>Vaske</p>)}
      </div>
    </>
  )

}

export default Logo