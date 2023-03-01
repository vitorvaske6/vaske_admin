import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, customClassName, padding }) => {
  const { setIsClicked, initialState } = useStateContext();

  return (
    <button
      type="button"
      onClick={() => setIsClicked(!initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` ${size} ${padding} ${width} hover:drop-shadow-xl hover:bg-${bgHoverColor} ${customClassName}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
