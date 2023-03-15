import { Button, ColorPicker, Datatable, DropdownList, Loading, TextInput } from '..';
import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider';
import axios from 'axios';
import { checkDrop } from '../../data/dummy'
import { AiFillCaretDown, AiOutlineAreaChart, AiOutlineArrowDown, AiOutlineBarChart, AiOutlineBars, AiOutlineClose, AiOutlineLineChart, AiOutlinePieChart, AiOutlineUnorderedList } from 'react-icons/ai';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { nanoid } from 'nanoid';
import { palette } from '../../data/dummy'

const UserInputDefault = {
    login: "",
    password: "",
    comparePassword: "",
    email: "",
    picture: "",
    stayLoggedIn: false
}

const ProfileInputDefault = {
    _id: "",
    name: "",
    surname: "",
    active: true,
    profileFunction: "",
    profileGroups: [""],
    profileType: "",
    profileReports: [""],
    profileUsers: [""]
}

const EditLabel = ({ label, handleLabelsNewName }) => {
    const [labelInput, setLabelInput] = useState({ name: '' })

    const handleInput = (key, data) => {
        //console.log('change ', key, data)
        setLabelInput(prevInput => ({ ...prevInput, name: `${data}` }))
        //handleLabelsNewName(`${key}`, `${data}`)
    }

    return (
        <input
            id={`input-${label.key}`}
            value={label?.name}
            type={"text"}
            placeholder={''}
            className={` placeholder:italic placeholder:text-slate-400 block bg-white w-40 border border-slate-300 rounded-md py-2 pr-9 pl-3 disabled:opacity-75 focus:outline-none text-sm focus:border-sky-500 focus:ring-sky-500 focus:ring-1 shadow-sm`}
            onChange={(e) => handleInput(label.key, e.target.value)}
        />
    )
}


const PieBuilder = ({ data, handleNewChart }) => {
    const [labelsColor, setLabelsColor] = useState([])
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [mouseOver, setMouseOver] = useState('')
    const [mouseOverColor, setMouseOverColor] = useState('#888')
    const [showLabels, setShowLabels] = useState('')

    useEffect(() => {
        handleLabelsColor();
    }, [])

    const handleLabelsColor = () => {

        data.labels.map((label, index) => {
            const object = labelsColor.find(object => {
                return object.name === label;
            });

            if (object === undefined) {
                setLabelsColor(currLabelsColor => [...currLabelsColor, { key: nanoid(), name: label, color: palette[index][0] }])
            }
        })

    }


    const handleLabelsNewColor = (key, color) => {
        //console.log(key, color)
        let index = 0
        const item = labelsColor.find(object => {
            index += 1
            return object.key === key;
        });

        //console.log(item)

        let updatedLabels = labelsColor


        updatedLabels[index] = {
            ...item,
            color: color
        }


        //console.log("updatedLabels", updatedLabels, index, labelsColor[index])

        setLabelsColor(updatedLabels)


    }

    const handleLabelsNewName = (key, name) => {

        setLabelsColor(prevInput => ([...prevInput, { key: key, name: name }]))

        // let index = 0
        // const item = labelsColor.find(object => {
        //     index += 1
        //     return object.key === key;
        // }); 

        // let updatedLabels = labelsColor
        // updatedLabels[index] = {
        //     ...item,
        //     name: name
        // }

        // setLabelsColor(updatedLabels)
    }

    //console.log(labelsColor)

    const handleMouseOverPicker = (key, color) => {
        //console.log(key, color)
        setMouseOver(key)
        setIsMouseOver(true)
        setMouseOverColor(color)
    }

    const handleMouseOutPicker = () => {
        //console.log()
        setMouseOver('')
        setIsMouseOver(false)
        setMouseOverColor('')
    }

    const handleShowLabels = () => {
        if (showLabels === 'hidden') {
            setShowLabels('')
        } else {
            setShowLabels('hidden')
        }
    }

    
    const handleNewPieChart = () => {
        let type = 'pie'
        let _data = data

        let dataBackgroundColor = []
        let dataLabels = []

        labelsColor.map((label, index) => {
            dataBackgroundColor.push(label.color)
            dataLabels.push(label.name)
        })

        _data.datasets[0].backgroundColor = dataBackgroundColor
        _data.datasets[0].borderColor = "#eee"
        _data.labels = dataLabels


        //console.log("_data, labelsColor", data, labelsColor, _data)
        let borderOptions = { border: '2px solid #888', borderRadius: '25px' }
        let background = '#EEE'
        let size = { width: '360px', height: '360px' }

        
        handleNewChart(type, _data, borderOptions, background, size)
        //'pie', data, { border: '2px solid #888', borderRadius: '25px' }, '#EEE', { width: '360px', height: '360px' }
    }

    return (
        <>

            <div className=''>

                <span className='flex flex-wrap place-items-center cursor-pointer' onClick={handleShowLabels}><p className={`text-md mb-2 `} > Legendas </p> <AiFillCaretDown className='mb-1 ml-2' /></span>

                <div className={`relative flex-wrap gap-2 ${showLabels}`}>
                    {labelsColor.map((label, index) => (
                        // <TextInput name={label} placeHolder='Identificador único' type='text' tooltip='inválido' customFunc={(e) => handleInput('_id', e.target.value)} />
                        <>
                            <div className='flex flex-wrap gap-1'  >
                                {/* <EditLabel label={label} handleLabelsNewName={handleLabelsNewName} /> */}
                                <p className='text-sm mx-4'>{label.name}</p>
                                <ColorPicker pickedColorKey={label.key} pickedColor={label.color} handleLabelsNewColor={handleLabelsNewColor} />
                            </div>

                        </>

                    ))}
                    {/* {isMouseOver && (<ColorPallete pickedColorKey={mouseOver} pickedColor={mouseOverColor} handleLabelsNewColor={handleLabelsNewColor} />)} */}

                </div>
                <div className='mt-4 grid place-items-center'>
                            <button type="submit" onClick={handleNewPieChart} className="block w-[60%] h-11 bg-sky-500 rounded-xl text-white font-extrabold">Inserir Gráfico de Pizza</button>
                        </div>
            </div>
            {/* <TextInput name='Nome' value={profileInput?.name} placeHolder='Insira o seu nome' type='text' tooltip='inválido' customFunc={(e) => handleInput('name', e.target.value)} />
            <TextInput name='Sobrenome' value={profileInput?.surname} placeHolder='Insira o seu sobrenome' type='text' tooltip='inválido' customFunc={(e) => handleInput('surname', e.target.value)} />
            <DropdownList input={'active'} preSelected={profileInput?.active} placeholder='Selecione...' name={'Está ativo'} multi={false} valueField={'value'} options={checkDrop} labelField={'title'} searchBy={'title'} customFunc={handleDdInput} />
            <DropdownList input={'profileType'} preSelected={profileInput?.profileType._id} placeholder='Selecione...' name={'Tipo de Perfil'} multi={false} valueField={'_id'} options={ddProfileTypesParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} /> */}
        </>
    )
}

const NewChartModal = (props) => {
    const { currentColor, ddProfileFunctionsParams, ddProfilesParams, ddProfileTypesParams } = useStateContext()
    const [showModal, setShowModal] = useState(props.showModalProp);
    const [profileInput, setProfileInput] = useState()
    const [loginError, setLoginError] = useState(null);
    const [selectedChart, setSelectedChart] = useState('')
    const [filterText, setFilterText] = useState('');
    const [showDataframe, setShowDataframe] = useState('hidden')
    useEffect(() => {
        handleLoad();
    }, [])


    const handleSubmit = () => {
        onSubmit(profileInput);
    }

    async function onSubmit(values) {
        try {
            await axios.put(
                `${process.env.REACT_APP_SERVER_ENDPOINT}/api/sessions`,
                values,
                { withCredentials: true }
            ).then(res => [])//console.log(res)])

        } catch (e) {
            setLoginError(e.message);
        }
    }

    const handleInput = (field, data) => {
        setProfileInput(prevInput => ({ ...prevInput, [`${field}`]: `${data}` }))
    }

    const handleDdInput = (field, data, multi, valueField) => {
        //console.log('field, data, multi, valueField', field, data, multi, valueField)
        if (multi) {
            setProfileInput(prevInput => ({ ...prevInput, [`${field}`]: { ...data }[valueField] }))
        }
        else {
            setProfileInput(prevInput => ({ ...prevInput, [`${field}`]: { ...data }[0][valueField] }))
        }
    }

    const handleLoad = () => {
        if (props.data?._id !== undefined) {
            setProfileInput(props.data)
        }
        else {
            setProfileInput(ProfileInputDefault)
        }
    }

    if (profileInput === undefined) {
        return <Loading />
    }


    const handleSelectedChart = (chart) => {
        if (chart === selectedChart) {
            setSelectedChart('Novo Gráfico')
        }
        else {
            setSelectedChart(chart)
        }
    }

    //console.log('profileInput', { profileInput, ddProfileTypesParams })
    const dataChart = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    const data = [
        { label: 'Red', value: 12 },
        { label: 'Blue', value: 19 },
        { label: 'Yellow', value: 3 },
        { label: 'Green', value: 5 },
        { label: 'Purple', value: 2 },
        { label: 'Orange', value: 3 },
    ]

    const loadDataChartHandler = (data) => {
        let result = {
            labels: [],
            datasets: [
                {
                    label: 'Valores',
                    data: [],
                    backgroundColor: [''],
                    borderColor: [''],
                    borderWidth: 1,
                },
            ],
        };

        let index = 0

        data.map((item, index) => {
            result.labels.push(item.label)
            result.datasets[0].data.push(item.value)
        })
    }


    const columns = [
        {
            name: 'Rótulos',
            selector: row => row.label,
            sortable: true,
        },
        {
            name: 'Dados',
            selector: row => row.value,
            sortable: true,
        }
    ];

    const handleShowDataframe = () => {
        if (showDataframe === 'hidden') {
            setShowDataframe('')
        } else {
            setShowDataframe('hidden')
        }

    }


    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-7xl">
                    <div className=" bg-gray-50 dark:text-gray-200 dark:bg-secondary-dark-bg  lg:w-[768px] md:w-[580px] sm:w-400  h-auto rounded-xl p-4 pt-9 m-3 pb-4">
                        <span className='flex flex-wrap place-items-center cursor-pointer' onClick={handleShowDataframe}><p className={`text-md mb-2 `} > Dados </p> <AiFillCaretDown className='mb-1 ml-2' /></span>
                        <div className={`relative flex-wrap gap-2 ${showDataframe}`}>
                            <Datatable
                                key={`datatable-1`}
                                category='Dados'
                                title=''
                                idKey='_id'
                                data={data}
                                columns={columns}
                                filterField={['labels']}
                                filterText={filterText}
                                enableSubHeader={false}
                                setFilterText={setFilterText}
                            />
                        </div>
                        <div className='grid grid-cols-[95%_5%]'>
                            <p className='ml-4'> Novo Gráfico </p>
                            <AiOutlineClose className='pb-2 w-6 h-8 text-gray-600 cursor-pointer' onClick={() => props.closeModal()} />
                        </div>
                        <hr className='border-1' />
                        <div className='mx-2 flex flex-wrap p-2 gap-1'>
                            <button
                                type="button"
                                onClick={() => handleSelectedChart('pie')}
                                style={{ borderRadius: '5%' }}
                                className={` text-4xl hover:text-gray-500 hover:bg-light-gray bg-inherit ${selectedChart === 'pie' ? 'text-gray-500' : 'text-gray-300 bg-light-gray'}`}
                            >
                                <AiOutlinePieChart />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSelectedChart('line')}
                                style={{ borderRadius: '5%' }}
                                className={` text-4xl hover:text-gray-500 hover:bg-light-gray bg-inherit ${selectedChart === 'line' ? 'text-gray-500' : 'text-gray-300 bg-light-gray'}`}
                            >
                                <AiOutlineLineChart />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSelectedChart('bar')}
                                style={{ borderRadius: '5%' }}
                                className={` text-4xl hover:text-gray-500 hover:bg-light-gray bg-inherit ${selectedChart === 'bar' ? 'text-gray-500' : 'text-gray-300 bg-light-gray'}`}
                            >
                                <AiOutlineBarChart />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSelectedChart('area')}
                                style={{ borderRadius: '5%' }}
                                className={` text-4xl hover:text-gray-500 hover:bg-light-gray bg-inherit ${selectedChart === 'area' ? 'text-gray-500' : 'text-gray-300 bg-light-gray'}`}
                            >
                                <AiOutlineAreaChart />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSelectedChart('card')}
                                style={{ borderRadius: '5%' }}
                                className={` text-4xl hover:text-gray-500 hover:bg-light-gray bg-inherit ${selectedChart === 'card' ? 'text-gray-500' : 'text-gray-300 bg-light-gray'}`}
                            >
                                <AiOutlineUnorderedList />
                            </button>
                        </div>
                        <PieBuilder data={dataChart} handleNewChart={props.handleNewChart} />
                        {/* <TextInput name='ID' disabled={true} value={profileInput?._id} placeHolder='Identificador único' type='text' tooltip='inválido' customFunc={(e) => handleInput('_id', e.target.value)} />
                        <TextInput name='Nome' value={profileInput?.name} placeHolder='Insira o seu nome' type='text' tooltip='inválido' customFunc={(e) => handleInput('name', e.target.value)} />
                        <TextInput name='Sobrenome' value={profileInput?.surname} placeHolder='Insira o seu sobrenome' type='text' tooltip='inválido' customFunc={(e) => handleInput('surname', e.target.value)} />
                        <DropdownList input={'active'} preSelected={profileInput?.active} placeholder='Selecione...' name={'Está ativo'} multi={false} valueField={'value'} options={checkDrop} labelField={'title'} searchBy={'title'} customFunc={handleDdInput} />
                        <DropdownList input={'profileType'} preSelected={profileInput?.profileType._id} placeholder='Selecione...' name={'Tipo de Perfil'} multi={false} valueField={'_id'} options={ddProfileTypesParams} labelField={'name'} searchBy={'name'} customFunc={handleDdInput} /> */}

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" ></div>

        </>

    );
}


export default NewChartModal;
