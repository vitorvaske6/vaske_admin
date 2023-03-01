import hexToRgba from 'hex-to-rgba';
import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';

const lightTheme = (currentColor) => {
  return ({
    subHeader: {
      style: {
        backgroundColor: "none",
        padding: 10,
      }
    },
    table: {
      style: {
        backgroundColor: "none",
      }
    },
    headRow: {
      style: {
        border: 'none',
        backgroundColor: 'none',
        color: '#FFF'
      },
    },
    headCells: {
      style: {
        color: '#202124',
        fontSize: '14px',
        backgroundColor: 'none'
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: hexToRgba(currentColor, '0.2'),
        backgroundOpacity: 0.1,
        borderBottomColor: '#FFFFFF',
        //borderRadius: '25px',
        outline: '1px solid #FFFFFF',
        color: '#black'
      },
      style: {
        color: '#242424',
        backgroundColor: "none"
      }
    },
    pagination: {
      style: {
        border: 'none',
        backgroundColor: 'none'
      },
    },
  })

};

const darkTheme = (currentColor) => {
  return (
    {
      subHeader: {
        style: {
          backgroundColor: "none",
          padding: 10,
        }
      },
      table: {
        style: {
          backgroundColor: "none",
        }
      },
      headRow: {
        style: {
          border: 'none',
          backgroundColor: 'none',
          color: '#FFF'
        },
      },
      headCells: {
        style: {
          color: '#fff',//'#202124',
          fontSize: '14px',
          backgroundColor: 'none'
        },
      },
      rows: {
        highlightOnHoverStyle: {
          backgroundColor: hexToRgba(currentColor, '1'),
          backgroundOpacity: 0.1,
          borderBottomColor: '#FFFFFF',
          borderRadius: '25px',
          outline: '1px solid #FFFFFF',
          color: '#fff'
        },
        style: {
          color: '#fff',
          backgroundColor: "none"
        }
      },
      pagination: {
        style: {
          border: 'none',
          backgroundColor: 'none'
        },
      },
    }
  )
};

export const DatatableTheme = () => {
  const { currentColor } = useStateContext()
  
  return (
    {
      default: lightTheme(currentColor),
      light: lightTheme(currentColor),
      dark: darkTheme(currentColor),
    }
  )

}

export default DatatableTheme