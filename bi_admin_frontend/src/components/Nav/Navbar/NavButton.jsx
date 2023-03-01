

import React from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const NavButton = (props) => (
    <TooltipComponent content={props.title} position="BottomCenter">
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        type="button"
        onClick={() => props.customFunc()}
        style={{ color: props.color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: props.dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
        {props.icon}
      </button>
    </TooltipComponent>
  );

export default NavButton;