import React from 'react';
import {AiOutlineLineChart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlinePieChart, AiOutlineTable, AiOutlineInfoCircle, AiFillCaretDown, AiOutlineMenu} from 'react-icons/ai'

import styled from 'styled-components';

// const ChartTypes = [
//    { name: 'line', title: 'Line', icon: 'line-chart' },
//    { name: 'area', title: 'Area', icon: 'area-chart' },
//    { name: 'bar', title: 'Bar', icon: 'bar-chart' },
//    { name: 'pie', title: 'Pie', icon: 'pie-chart' },
//    { name: 'table', title: 'Table', icon: 'table' },
//    { name: 'number', title: 'Number', icon: 'info-circle' }
//  ];

const ChartIcon = ({type}) => {
   const iconsClass = 'inline-block relative bg-inherit text-center w-[16px] h-[16px] mr-1 text-inherit'
   
   if(type === 'line-chart'){
      return <AiOutlineLineChart className={iconsClass} />
   }
   if(type === 'area-chart'){
      return <AiOutlineAreaChart className={iconsClass}/>
   }
   if(type === 'bar-chart'){
      return <AiOutlineBarChart className={iconsClass} />
   }
   if(type === 'pie-chart'){
      return <AiOutlinePieChart className={iconsClass} />
   }
   if(type === 'table'){
      return <AiOutlineTable className={iconsClass} />
   }
   if(type === 'info-circle'){
      return <AiOutlineInfoCircle className={iconsClass} />
   }
   if(type === 'caret-down'){
      return <AiFillCaretDown className={iconsClass} />
   }
   if(type === 'menu'){
      return <AiOutlineMenu className={iconsClass + ' cursor-pointer'} />
   }
   else{
      return <AiOutlineLineChart className={iconsClass}/>
   }

   // <BsPlusCircleFill className={"block bg-[#6F76D9] rounded-[50%] w-[20px] h-[20px] z-2"}/>
};

export default ChartIcon;
