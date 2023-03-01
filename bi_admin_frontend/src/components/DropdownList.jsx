import React, { useState, useRef, useEffect } from 'react'

import styled from 'styled-components';
import { useStateContext } from '../contexts/ContextProvider';
import Select from "react-dropdown-select";

const DropdownList = (props) => {
    const { currentColor } = useStateContext();
    const [multiPreSelectedValues, setMultiPreSelectedValues] = useState([])
    const [ddState, setDdState] = useState({
        multi: props.multi,
        disabled: props.disabled !== undefined ? props.disabled : false,
        loading: false,
        contentRenderer: false,
        dropdownRenderer: true,
        inputRenderer: false,
        itemRenderer: false,
        optionRenderer: false,
        noDataRenderer: true,
        selectValues: [],
        searchBy: props.searchBy,
        clearable: false,
        searchable: true,
        create: false,
        separator: true,
        forceOpen: false,
        handle: true,
        addPlaceholder: `${props.placeholder}`,
        labelField: props.labelField,
        valueField: props.valueField,
        color: currentColor,
        keepSelectedInList: true,
        closeOnSelect: false,
        dropdownPosition: "auto",
        direction: "ltr",
        dropdownHeight: "300px",
        style:{backgroundColor: '#fff', borderTop: 0, borderLeft: 0, borderRight: 0, borderBotton: '1px #eee', opacity: props.disabled ? 0.75 : 1 }
    })

    useEffect(() => {
        setDdState({
            multi: props.multi,
            disabled: props.disabled !== undefined ? props.disabled : false,
            loading: false,
            contentRenderer: false,
            dropdownRenderer: true,
            inputRenderer: false,
            itemRenderer: false,
            optionRenderer: false,
            noDataRenderer: true,
            selectValues: [],
            searchBy: props.searchBy,
            clearable: false,
            searchable: true,
            create: false,
            separator: true,
            forceOpen: false,
            handle: true,
            addPlaceholder: `${props.placeholder}`,
            labelField: props.labelField,
            valueField: props.valueField,
            color: currentColor,
            keepSelectedInList: true,
            closeOnSelect: false,
            dropdownPosition: "auto",
            direction: "ltr",
            dropdownHeight: "300px",
            style: { backgroundColor: '#fff', borderTop: 0, borderLeft: 0, borderRight: 0, borderBotton: '1px #eee', opacity: props.disabled ? 0.75 : 1 }
        })

    }, [props])

    useEffect(() => {

        if (props?.preSelected && !props.multi) {
            setValues([props.options.find(opt => opt?.[`${props.valueField}`] === props.preSelected)])
        } else if (props?.preSelected && props.multi) {
            setMultiPreSelectedValues(props.preSelected)
        }
        else {
            setValues([])
        }
        
        //console.log("props.preSelected", props.preSelected)

    }, [])
    

    const [selectedValues, setSelectedValues] = useState()

    const setValues = selectValues => setSelectedValues({ selectValues });

    const handleValues = (values) => {
        //console.log('handleValues', values)
        setValues(values)
        props.customFunc(props.input, values, ddState.multi, props.valueField)
    }

    const noDataRenderer = () => {
        return (
            <p style={{ textAlign: "center" }}>
                Nenhuma opção encontrada!
            </p>
        );
    };

    const valueExistInSelected = () => {
        return false
    }


    // // var res = dataToFilter.filter(function (item) {
    // //     return item._id === _id;
    // // });
    // console.log("teste", teste)
    // console.log('selectedValues, multiPreSelectedValues', selectedValues, multiPreSelectedValues)
    // console.log('props', props)

    return (
        <div className='relative flex mt-4'>
            <label className={`mx-2 w-full relative block pb-1`} >
                <span className="text-lg sm:text-[12px]">{props.name}</span>
                <Select
                    style={ddState.style}
                    className='bg-white text-sm border-b-4'
                    placeholder={ `${props.placeholder}`}
                    color={ddState.color}
                    disabled={ddState.disabled}
                    loading={ddState.loading}
                    searchBy={ddState.searchBy}
                    separator={ddState.separator}
                    clearable={ddState.clearable}
                    searchable={ddState.searchable}
                    create={ddState.create}
                    keepOpen={ddState.forceOpen}
                    dropdownHandle={ddState.handle}
                    dropdownHeight={ddState.dropdownHeight}
                    direction={ddState.direction}
                    multi={ddState.multi}
                    values={props.preSelected !== undefined && !props.multi ? [props.options.find(opt => opt?.[`${props.valueField}`] === props.preSelected)]  : multiPreSelectedValues !== undefined  ? multiPreSelectedValues : [] }
                    //values={[props.options.find(opt => opt.username === "Delphine")]}
                    labelField={ddState.labelField}
                    valueField={ddState.valueField}
                    options={props.options}
                    dropdownGap={5}
                    keepSelectedInList={ddState.keepSelectedInList}
                    onDropdownOpen={() => undefined}
                    onDropdownClose={() => undefined}
                    onClearAll={() => undefined}
                    onSelectAll={() => undefined}
                    onChange={values => handleValues(values)}
                    noDataLabel="No matches found"
                    closeOnSelect={ddState.closeOnSelect}
                    noDataRenderer={
                        ddState.noDataRenderer
                            ? () => noDataRenderer()
                            : undefined
                    }
                    dropdownPosition={ddState.dropdownPosition}
                // optionRenderer={
                //   ddState.optionRenderer
                //     ? (option, props, state, methods) =>
                //         optionRenderer(option, props, state, methods)
                //     : undefined
                // }
                // contentRenderer={
                //   ddState.contentRenderer
                //     ? (innerProps, innerState) =>
                //         contentRenderer(innerProps, innerState)
                //     : undefined
                // }
                // dropdownRenderer={
                //   ddState.dropdownRenderer
                //     ? (innerProps, innerState, innerMethods) =>
                //         dropdownRenderer(
                //           innerProps,
                //           innerState,
                //           innerMethods
                //         )
                //     : undefined
                // }
                />
            </label>
        </div>
    )
}


const StyledSelect = styled(Select)`
${({ dropdownRenderer }) =>
        dropdownRenderer &&
        `
      .react-dropdown-select-dropdown {
          overflow: initial;
      }
  `}
`;

const SearchAndToggle = styled.div`
display: flex;
flex-direction: column;

input {
margin: 10px 10px 0;
line-height: 30px;
padding: 0 20px;
border-bottom: 1px solid #ccc;
border-radius: 3px;
:focus {
  outline: none;
  borderBottom: 1px solid ${({ color }) => color};
}
}
`;

const Items = styled.div`
overflow: auto;
min-height: 10px;
max-height: 200px;
`;

const Item = styled.div`
display: flex;
margin: 10px;
align-items: baseline;
cursor: pointer;
border-bottom: 1px dotted transparent;

:hover {
border-bottom: 1px dotted #ccc;
}

${({ disabled }) =>
        disabled
            ? `
  opacity: 0.1;
  pointer-events: none;
  cursor: not-allowed;
`
            : ""}
`;

const ItemLabel = styled.div`
margin: 5px 10px;
`;

const Buttons = styled.div`
display: flex;
justify-content: space-between;

& div {
margin: 10px 0 0 10px;
font-weight: 600;
}
`;

const Button = styled.button`
background: none;
border: 1px solid #555;
color: #555;
border-radius: 3px;
margin: 10px 10px 0;
padding: 3px 5px;
font-size: 10px;
text-transform: uppercase;
cursor: pointer;
outline: none;

&.clear {
color: tomato;
border: 1px solid tomato;
}

:hover {
border: 1px solid deepskyblue;
color: deepskyblue;
}
`;

const StyledHtmlSelect = styled.select`
padding: 0;
margin: 0 0 0 10px;
height: 23px !important;
color: #0071dc;
background: #fff;
border: 1px solid #0071dc;
`;

const StyledInput = styled.input`
margin: 0 0 0 10px;
height: 23px !important;
color: #0071dc;
background: #fff;
border: 1px solid #0071dc;
border-radius: 3px;
padding: 13px 10px;
width: 70px;
`;

export default DropdownList