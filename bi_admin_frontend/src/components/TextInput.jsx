import React, { useState, useRef, useEffect } from 'react'

import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiFillEye, AiFillEyeInvisible, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const TextInput = (props) => {
    const [isError, setIsError] = useState(false);
    const [invalidInputs, setInvalidInputs] = useState([`tooltip-Login`])
    const [tipMessage, setTipMessage] = useState();
    const [showIcon, setShowIcon] = useState(props?.showIcon !== undefined ? props.showIcon : true)
    const refTooltip = useRef();

    const handleError = () => {
        if (isError && invalidInputs.map((input) => input === `tooltip-${props.name}`)) {
            refTooltip.current.open();
            setTipMessage(`${props.name} ${props.tooltip} !`);
        } else {
            refTooltip.current.close();
            setTipMessage(`Insira seu ${props.name}`);
        }
    }

    useEffect(() => {
        handleError()
    }, []);

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };


    return (
        <TooltipComponent key={`tooltip-${props.name}`} ref={refTooltip} opensOn='custom' content={`${isError ? (tipMessage) : props.placeHolder}`} position="BottomCenter" className='relative flex mt-4'>
            <label className={`mx-2 w-full relative block pb-1`} >
                <span className="text-lg sm:text-[12px]">{props.name}</span>
                <input
                    id={props.name}
                    value={props?.value}
                    type={props.type === 'password' ? passwordShown ? "text" : "password" : props.type}
                    placeholder={props.placeHolder}
                    disabled={props?.disabled}
                    className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border-b-1 border-slate-300 py-2 pr-9 pl-3 disabled:opacity-75 focus:outline-none text-sm  ${isError ? ('border-rose-600 ring-rose-600 ring-1 shadow-md drop-shadow shadow-[rgba(225, 29, 72, 0.5)]') : ('focus:border-sky-500 focus:ring-sky-500 focus:ring-1 shadow-sm')}`}
                    onChange={props.customFunc}
                />
                {showIcon ? (
                <span className="absolute inset-y-0 right-0 flex items-center px-2 pt-6">
                    {isError ?
                        <AiOutlineClose size={25} className="text-rose-600" />
                        :
                        props.type === 'password' ?
                            passwordShown ?
                                <AiFillEye onClick={togglePasswordVisiblity} size={25} className="text-gray-400 cursor-pointer" />
                                :
                                <AiFillEyeInvisible onClick={togglePasswordVisiblity} size={25} className="text-gray-400 cursor-pointer" />
                            :
                            <AiOutlineCheck size={25} className="text-gray-400" />
                    }
                </span>
                ): (<></>)}
            </label>
        </TooltipComponent>
    )
}

export default TextInput