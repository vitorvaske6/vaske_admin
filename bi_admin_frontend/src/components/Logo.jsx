import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { useStateContext } from '../contexts/ContextProvider'
import vaskeLogoBlack from '../data/vaskeLogoBlack.svg'
import vaskeLogoWhite from '../data/vaskeLogoWhite.svg'

const Logo = ({ logoSize }) => {
    const { currentColor, currentMode } = useStateContext()

    const fullImg = "h-[60px] p-2"
    const smallImg = "h-[50px] p-2"
    const fullTxt = "font-bold text-4xl mt-2 ml-1 mr-4 dark:text-white"
    const smallTxt = "font-bold text-2xl mt-2 ml-1 mr-4 dark:text-white"
    const src = ''

    return (
        <>
           <div className='grid grid-cols-1 grid-rows-1 place-items-center self-center justify-center'>
              <div className='flex'>
                <img src={currentMode === 'Dark' ? vaskeLogoWhite : vaskeLogoBlack } className={smallImg} alt='biadminLogo' />
                <p className={smallTxt}>Vaske</p>
              </div>
            </div>
        </>
    )
}

export default Logo