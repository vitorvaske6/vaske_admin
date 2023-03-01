import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Header, Loading, Datatable, Button, Search, Pie, Stacked } from '../components'

import LongMenu from '../components/material-ui/LongMenu'
import { AiOutlineMobile } from 'react-icons/ai';
import { stackedChartData } from '../data/dummy';
import arrayUnique from '../utils/arrayUnique';


const DatatableEmpty = props => (
    <div className='grid grid-cols-1 grid-rows-2 place-items-center bg-white rounded-sm w-full p-4'>
        <Header category={props.headerMessage} />
        <Button customClassName={'h-[40px]'} size={'text-[12px]'} color="white" padding={'p-1'} bgColor={props.currentColor} text="Novo Relatório" borderRadius="5px" width="w-[120px]" />
    </div>
);

const C4m = () => {
    const [c4mData, setC4mData] = useState([])
    const [errorMessage, setErrorMessage] = useState()
    const [filterText, setFilterText] = useState('');
    const [skip, setSkip] = useState(0)
    const [total, setTotal] = useState(0)
    const [devicesData, setdevicesData] = useState([
        {
            icon: <AiOutlineMobile />,
            amount: '39,354',
            percentage: '-4%',
            title: 'Dispositivos',
            iconColor: '#03C9D7',
            iconBg: '#E5FAFB',
            pcColor: 'red-600',
        }
    ])
    const [devicesPieData, setDevicesPieData] = useState()
    const [devicesPieData2, setDevicesPieData2] = useState()
    const [stackedCustomSeries, setStackedCustomSeries] = useState([])



    useEffect(() => {
        loadC4mHandler();
        pieDataHandler();
        pieDataHandler2();
        //stackedDataHandler();
    }, [c4mData])

    const c4mDataHandler = (data) => {
        //setC4mData(arrayUnique(c4mData.concat(data)))
        //let array1 = ['a','b','c']
        //let array2 = ['c','c','d','e'];

        var concat = c4mData.concat(data.filter((item) => c4mData.indexOf(item.imei) < 0))
        setC4mData(concat)
        
        console.log("c4mData.length, total", c4mData.length, total)
        // if(c4mData.length < total){
        //     loadC4mHandler(c4mData.length)
        // }
        //console.log(c4mData)
        pieDataHandler()
    }

    //devices?status=1&$top=50&$skip={NovaPaginas}&$inlinecount=allpages&$expand=Group,DataUsage,BatteryMonitorSettings,DataUsageMonitorSettings,LocationMonitorSettings,MemoryMonitorSettings,LocationHistoryMonitorSettings,ApplicationUsageStatisticsMonitorSettings,LastBatteryData,LastLocation,LastMemoryData,SamsungPolicySettings,ApplicationSettings,RemoteAssistances,SimCards
    //C4M_URL_C4MAPP = "statistics/devices/{idDevice}/applications?startDate={DataInicialBuscar}&endDate={DataFinalBuscar}"
    const loadC4mHandler = async () => {
        const payload = {
            function: "C4MAUTH",
            url: `https://api.cloud4mobile.com.br/devices?status=1&$top=50&$skip=${skip}&$inlinecount=allpages&$expand=Group,DataUsage,BatteryMonitorSettings,DataUsageMonitorSettings,LocationMonitorSettings,MemoryMonitorSettings,LocationHistoryMonitorSettings,ApplicationUsageStatisticsMonitorSettings,LastBatteryData,LastLocation,LastMemoryData,SamsungPolicySettings,ApplicationSettings,RemoteAssistances,SimCards`,
            method: "GET",
            consumerKey: process.env.REACT_APP_C4M_CUNSOMER_KEY,
            consumerSecret: process.env.REACT_APP_C4M_CUNSOMER_SECRET
        };

        try {

            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_ENDPOINT}/api/c4m/auth`,
                payload,
                { withCredentials: true }
            )///.then(res => [console.log(res.data), itemC4mHandler(payload, res.data), status = res.status])

            let status = res.status

            if (skip <= total && status === 200) { //total
                itemC4mHandler(payload, res.data).then(res => {
                    if(res === 200){
                        loadC4mHandler();
                    }
                })
            }
            console.log(`while (${skip} <= ${total} && ${status} === 200)`)

        } catch (e) {
            //console.log(e)
            setErrorMessage(e.message);
        }

    }

    const handleDetailedAction = (option, item) => {
        console.log(option, item)

    }

    const handleAction = (data, option) => {
        console.log(data, option)

    }

    const itemC4mHandler = async (params, authRes) => {
        const payload = JSON.stringify({
            "consumerKey": params["consumerKey"],
            "nonce": `"${authRes["nonce"]}"`,
            "timestamp": `"${authRes["timestamp"]}"`,
            "version": "1.0",
            "signature": "",

        });

        try {
            await axios.get(
                `${params['url']}`, {
                headers: { "Authorization": `Bearer ${authRes['token']}` },
                data: payload,
            }
            ).then(res => { //[console.log(res.headers,res.data), c4mDataHandler(res.data), setSkip(skip+50), setTotal(res.headers['x-total-count'])])
                c4mDataHandler(res.data);
                setSkip(skip + 50);
                setTotal(res.headers['x-total-count']);
                return 200;
            })
            
        } catch (e) {
            console.log(e)
            setErrorMessage(e.message);
            return 0;
        }
    }

    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    const handleStatus = (row) => {

        switch (row) {
            case 1:
                return 'Habilitado'
            case 2:
                return 'Desabilitado'
            case 3:
                return 'Ativos'
            case 4:
                return 'Inativos'
            default:
                return 'Desconhecido'
        }

    }

    const columns = [
        {
            name: 'IMEI',
            selector: row => row.deviceInformation.imei,
            sortable: true,
        },
        {
            name: 'Nome',
            selector: row => row.alias,
            sortable: true,
        },
        {
            name: 'Bateria',
            selector: row => row.lastBatteryData ? row.lastBatteryData.level + '%' : '-',
            sortable: true,
        },
        {
            name: 'CHIP',
            selector: row => row.deviceInformation.simCards.length > 0 ? row.deviceInformation.simCards[0].carrier + ' / ' + row.deviceInformation.simCards[0].lineNumber + ' // ' + row.deviceInformation.simCards[0].serialNumber : '-',
            sortable: true,
        },
        {
            name: 'Memória Disponível',
            selector: row => row.lastMemoryData ? 'Interno: ' + formatBytes(row.lastMemoryData.availableInternalStorage) + ' Externo: ' + formatBytes(row.lastMemoryData.availableExternalStorage) : '-',
            sortable: true,
        },
        {
            name: 'Última Comunicação',
            selector: row => new Date(row.lastCommunication).toLocaleString("pt-BR"),
            sortable: true,
        },
        {
            name: 'Grupo',
            selector: row => row.group.fullName,
            sortable: true,
        },
        {
            name: 'Fabricante',
            selector: row => row.deviceInformation.manufacturer,
            sortable: true,
        },
        {
            name: <LongMenu size="small" options={['Novo']} handleAction={handleAction} />,
            cell: row => <LongMenu size="small" row={row} options={['Editar', 'Excluir']} handleAction={handleAction} />,
            allowOverflow: true,
            button: true,
            width: '56px',
        },
    ];


    const detailedColumns = [
        {
            field: "Bateria",
            itemName: "lastBatteryData",
            data: "lastBatteryData",
            columns: [
                {
                    name: 'Level',
                    selector: row => row.level,
                    sortable: true,
                },
                {
                    name: <LongMenu size="small" options={['Novo']} handleAction={handleAction} />,
                    cell: row => <LongMenu size="small" row={row} options={detailedOptions} handleAction={handleAction} />,
                    allowOverflow: true,
                    button: true,
                    width: '56px',
                },
            ],
        },
    ]

    const detailedOptions = ['Editar', 'Excluir']


    if (c4mData === undefined) {
        console.log(c4mData)
        return <Loading />
    }

    const pieDataHandler = () => {

        var inactive = c4mData.filter(function (item) {
            var d_1 = new Date();
            d_1.setDate(d_1.getDate() - 45);

            return new Date(item.lastCommunication) < d_1;
        });

        var low = c4mData.filter(function (item) {
            var d_1 = new Date();
            d_1.setDate(d_1.getDate() - 6);

            var d_2 = new Date();
            d_2.setDate(d_2.getDate() - 45);

            return new Date(item.lastCommunication) <= d_1 && new Date(item.lastCommunication) >= d_2;
        });

        var moderate = c4mData.filter(function (item) {
            var d_1 = new Date();
            d_1.setDate(d_1.getDate() - 2);

            var d_2 = new Date();
            d_2.setDate(d_2.getDate() - 5);

            return new Date(item.lastCommunication) <= d_1 && new Date(item.lastCommunication) >= d_2;
        });

        var conected = c4mData.filter(function (item) {
            var d_1 = new Date();
            d_1.setDate(d_1.getDate() - 1);

            return new Date(item.lastCommunication) >= d_1;
        });

        setDevicesPieData([
            { x: 'Conectado', y: conected.length + 0, text: `${Number((conected.length / c4mData.length) * 100).toFixed(2)}%` },
            { x: 'Uso Moderado', y: moderate.length + 0, text: `${Number((moderate.length / c4mData.length) * 100).toFixed(2)}%` },
            { x: 'Baixo Uso', y: low.length + 0, text: `${Number((low.length / c4mData.length) * 100).toFixed(2)}%` },
            { x: 'Inativo', y: inactive.length + 0, text: `${Number((inactive.length / c4mData.length) * 100).toFixed(2)}%` },
        ])
    }

    const stackedDataHandler = () => {

        var conected = filteredData.filter(function (item) {
            var d_1 = new Date();
            d_1.setDate(d_1.getDate() - 1);

            return new Date(item.lastCommunication) >= d_1;
        });

        var veryLow = conected.filter(function (item) {
            return item.lastBatteryData?.level <= 25;
        });
        var low = conected.filter(function (item) {
            return item.lastBatteryData?.level > 25 && item.lastBatteryData.level <= 50;
        });
        var moderate = conected.filter(function (item) {
            return item.lastBatteryData?.level > 50 && item.lastBatteryData.level <= 75;
        });
        var high = conected.filter(function (item) {
            return item.lastBatteryData?.level > 75;
        });

        const stackedChartData = [
            [
                { x: new Date().toLocaleDateString(), y: ((high.length / conected.length) * 100) },
            ],
            [
                { x: new Date().toLocaleDateString(), y: ((moderate.length / conected.length) * 100) },
            ],
            [
                { x: new Date().toLocaleDateString(), y: ((low.length / conected.length) * 100) },
            ],
            [
                { x: new Date().toLocaleDateString(), y: ((veryLow.length / conected.length) * 100) },
            ],
        ];

        setStackedCustomSeries([
            {
                dataSource: stackedChartData[0],
                xName: 'x',
                yName: 'y',
                name: 'Alto',
                type: 'StackingColumn',
                background: 'green',

            },
            {
                dataSource: stackedChartData[1],
                xName: 'x',
                yName: 'y',
                name: 'Médio',
                type: 'StackingColumn',
                background: 'blue',

            },
            {
                dataSource: stackedChartData[2],
                xName: 'x',
                yName: 'y',
                name: 'Baixo',
                type: 'StackingColumn',
                background: 'yellow',

            },
            {
                dataSource: stackedChartData[3],
                xName: 'x',
                yName: 'y',
                name: 'Muito Baixo',
                type: 'StackingColumn',
                background: 'red',

            },

        ]);

        // console.log(stackedChartData, stackedCustomSeries, stackedCustomSeries.length)

        //setDevicesPieData([
        //    { x: 'Conectado'    , y: conected.length+0, text: `${((conected.length/filteredData.length)*100)+0}%` },
        //    { x: 'Uso Moderado' , y: moderate.length+0, text: `${((moderate.length/filteredData.length)*100)+0}%` },
        //    { x: 'Baixo Uso'    , y: low.length+0, text: `${((low.length/filteredData.length)*100)+0}%` },
        //    { x: 'Inativo'      , y: inactive.length+0, text: `${((inactive.length/filteredData.length)*100)+0}%` },
        //])
    }


    const pieDataHandler2 = () => {

        var conected = filteredData.filter(function (item) {
            var d_1 = new Date();
            d_1.setDate(d_1.getDate() - 1);

            return new Date(item.lastCommunication) >= d_1;
        });

        var veryLow = conected.filter(function (item) {
            return item.lastBatteryData?.level <= 25;
        });
        var low = conected.filter(function (item) {
            return item.lastBatteryData?.level > 25 && item.lastBatteryData.level <= 50;
        });
        var moderate = conected.filter(function (item) {
            return item.lastBatteryData?.level > 50 && item.lastBatteryData.level <= 75;
        });
        var high = conected.filter(function (item) {
            return item.lastBatteryData?.level > 75;
        });

        setDevicesPieData2([
            { x: 'Alto', y: high.length, text: `${Number(((high.length / conected.length) * 100).toFixed(2))}%` },
            { x: 'Moderado', y: moderate.length, text: `${Number(((moderate.length / conected.length) * 100).toFixed(2))}%` },
            { x: 'Baixo', y: low.length, text: `${Number(((low.length / conected.length) * 100).toFixed(2))}%` },
            { x: 'Muito Baixo', y: veryLow.length, text: `${Number(((veryLow.length / conected.length) * 100).toFixed(2))}%` },
        ])

        //setDevicesPieData([
        //    { x: 'Conectado'    , y: conected.length+0, text: `${((conected.length/filteredData.length)*100)+0}%` },
        //    { x: 'Uso Moderado' , y: moderate.length+0, text: `${((moderate.length/filteredData.length)*100)+0}%` },
        //    { x: 'Baixo Uso'    , y: low.length+0, text: `${((low.length/filteredData.length)*100)+0}%` },
        //    { x: 'Inativo'      , y: inactive.length+0, text: `${((inactive.length/filteredData.length)*100)+0}%` },
        //])
    }

    const filteredData = c4mData.filter(item => `${item.deviceInformation.imei}` && `${item.deviceInformation.imei}`.toLowerCase().includes(filterText.toLowerCase()))

    return (
        // <div className='gap-2 flex flex-wrap'>
        //     <div className='border-1 w-full border-gray-300 rounded-xl  '>
        //         <div className='p-2 w-full '>
        //             <div className='pt-2 border-1 rounded-md p-2'>
        //                 <div className={`mb-2 dark:bg-main-dark-bg `}>
        //                     <p className='dark:text-gray-200 text-gray-400'>
        //                         Dispositivos
        //                     </p>
        //                 </div>
        //                 <p>Quantidade: {c4mData.length}</p>
        //             </div>
        //         </div>
        //         <div className='p-2 w-full '>
        //             <div className='pt-2 border-1 rounded-md p-2'>
        //                 <div className={`mb-2 dark:bg-main-dark-bg `}>
        //                     <p className='dark:text-gray-200 text-gray-400'>
        //                         Dispositivos
        //                     </p>
        //                 </div>
        //                 <p>Quantidade: {c4mData.length}</p>
        //             </div>
        //         </div>
        //     </div>
        //     {c4mData.map((device, index) => (
        //         <div className='border-1 w-auto border-gray-300 rounded-xl  '>
        //             <div className='p-2 w-full '>
        //                 <div className={`mb-4 w-full dark:bg-main-dark-bg `}>
        //                     <p className='dark:text-gray-200 text-gray-400'>
        //                         {device.alias}
        //                     </p>
        //                     <p className='text-md font-extrabold tracking-tight text-slate-900 dark:text-gray-400'>
        //                         {device.deviceInformation.imei}
        //                     </p>
        //                 </div>
        //                 <div className='pt-2 border-1 rounded-md p-2'>
        //                     <div className={`mb-2 dark:bg-main-dark-bg `}>
        //                         <p className='dark:text-gray-200 text-gray-400'>
        //                             Bateria
        //                         </p>
        //                     </div>
        //                     <p>Data: {new Date(device.lastBatteryData.receivedDate).toLocaleString("pt-BR")}</p>
        //                     <p>Nível: {device.lastBatteryData.level}%</p>
        //                 </div>
        //                 <br />
        //                 <div className='pt-2 border-1 rounded-md p-2'>
        //                     <div className={`mb-2 dark:bg-main-dark-bg `}>
        //                         <p className='dark:text-gray-200 text-gray-400'>
        //                             CHIP
        //                         </p>
        //                     </div>
        //                     {device.deviceInformation.simCards.length > 0 ? (
        //                         <>
        //                             {device.deviceInformation.simCards.map((chip, chipIndex) => (
        //                                 <>
        //                                     <p>Operadora: {chip.carrier}</p>
        //                                     <p>Número: {chip.lineNumber}</p>
        //                                     <p>ICCID: {chip.serialNumber}</p>
        //                                 </>
        //                             ))}
        //                         </>
        //                     ) : (<p>Nenhum informação de CHIP encontrado.</p>)}
        //                 </div>
        //                 <br />
        //                 <div className='pt-2 border-1 rounded-md p-2'>
        //                     <div className={`mb-2 dark:bg-main-dark-bg `}>
        //                         <p className='dark:text-gray-200 text-gray-400'>
        //                             Memória
        //                         </p>
        //                     </div>
        //                     {device.lastMemoryData ? (
        //                         <>
        //                             <p>Data: {new Date(device.lastMemoryData?.receivedDate).toLocaleString("pt-BR")}</p>
        //                             <p>Disponível: {formatBytes(device.lastMemoryData?.availableInternalStorage)}</p>
        //                         </>
        //                     ) : (<p>Nenhuma informação de memória encontrada.</p>)}

        //                 </div>
        //             </div>
        //         </div>
        //     ))}
        // </div>
        <div className='m-2 md:m-2 p-2 md:p-2 '>
            {/* {showCrud && (<EmployeesCRUD showModal={showCrud} closeModal={setShowCrud} data={crudData} />)} */}
            <Header category={'Integrações'} title={'C4M'} />
            <div className='dark:bg-[#2c303a] rounded-xl pb-4'>
                <div className='border-1 border-gray-300 p-2 rounded-xl mb-6 w-60'>
                    <div className={`mb-2 dark:bg-main-dark-bg `}>
                        <p className='dark:text-gray-200 text-gray-400'>
                            Dispositivos
                        </p>
                    </div>
                    <p>Quantidade: {c4mData.length}</p>
                </div>
                <div className="w-full flex gap-6">

                    <div className="w-full border-1 border-gray-300 p-2 rounded-xl">
                        <p className='text-center'>Status de Última Conexão</p>
                        <Pie id="pie-chart" data={devicesPieData} legendVisiblity={true} height="260px" width={"768"} />

                    </div>
                    <div className="w-full border-1 border-gray-300 p-2 rounded-xl">
                        <p className='text-center'>Performance de Bateria</p>
                        <Pie id="pie-chart2" data={devicesPieData2} legendVisiblity={true} height="260px" width={"768"} />
                    </div>
                    {/* <div className="w-full border-1 border-gray-300 p-2 rounded-xl">
                        <p className='text-center'>Performance de Bateria</p>
                        {stackedCustomSeries.length > 0 ? (
                        <Stacked id="bar-chart" data={stackedCustomSeries} height="260px" width={"768"} />
                        ) : (<></>)}
                    </div> */}
                </div>
                <Datatable
                    key={`datatable-1`}
                    category='Cadastros'
                    title='Funcionários'
                    idKey='_id'
                    data={filteredData}
                    //detailedColumns={detailedColumns}
                    columns={columns}
                    //filterField={['deviceInformation.imei']}
                    filterText={filterText}
                    enableSubHeader={true}
                    setFilterText={setFilterText}
                    NoDataComponent={DatatableEmpty}
                    handleDetailedAction={handleDetailedAction}
                //filterModel={item => `${item.name} ${item.surname}` && `${item.name} ${item.surname}`.toLowerCase().includes(filterText.toLowerCase())}
                />

            </div>
            {/* {props.columnDirective === 'employee' && itemInfoOpen && itemInfo !== undefined && (<EmployeeInfo employeesInfo={itemInfo} showModalProp={true} setEmployeesInfoOpen={setItemInfoOpen} setEmployeesInfo={setItemInfo} />)} */}

        </div>

    )
}

export default C4m

