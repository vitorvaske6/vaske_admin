import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { Button, EmbedReport, Header, Loading } from '../components'
import { useStateContext } from '../contexts/ContextProvider';
import { models, Report, Embed, service, Page } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import axios from 'axios';
import { useRef } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { BsFillGearFill, BsFillGrid1X2Fill, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaPencilAlt } from 'react-icons/fa';
import useCollapse from 'react-collapsed';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import env from 'react-dotenv';
import { nanoid } from 'nanoid'
import { BiShowAlt } from 'react-icons/bi';
import { AiOutlineFilter, AiOutlineReload } from 'react-icons/ai';

const LoadReportFilters = ({ report, currentColor, showFilters, loadingFilters }) => {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [isRefresh, setIsRefresh] = useState(false)
    const pFilterClassName = 'border-1 rounded-xl border-gray-200 px-2 w-auto'
    const [hasValidFilters, setHasValidFilters] = useState(false)
    const [reportFilters, setReportFilters] = useState([])

    console.log(reportFilters)

    useEffect(() => {
        console.log("effect")
        if(reportFilters !== undefined){
            console.log("reportFilters !== undefined", reportFilters)
            let res = false
            reportFilters.map((item, index) => {
                if(item.filter.filters.length > 0){
                    console.log("if(item.filter.filters.length > 0){ ", item.filter.filters.length )
                    res = true
                }
                //console.log("item.filter.filters.length(): ", item.filter.filters)
                
            })
            console.log("res*------", res)

            if(res === true){
                console.log(" VALID FILTERS ")
                setHasValidFilters(true)
            }
            
            console.log("return item.filter.filters.length() > 0", res)
        }

        forceUpdate()
      
        
      }, [isRefresh])

      async function pageFilters() {
        //console.log("page filters -----------")
        // Retrieve the page collection and get the visuals for the active page.
        //try {
        const pages = await report.getPages();

        // Retrieve the active page.
        let pageWithSlicer = pages.filter(function (page) {
            return page.isActive;
        })[0];

        const visuals = await pageWithSlicer.getVisuals();

        // Retrieve the target visual.
        let slicers = visuals.filter(function (visual) {
            return visual.type === "slicer";
        });

        //console.log("slicers", slicers)

        let filterStates = []
        slicers.map(async (slicer, index) => {
            // Get the slicer state
            filterStates.push({ slicer: slicer, filter: await slicer.getSlicerState() });
        })

        setReportFilters( filterStates )
        //LoadReportFilters.forceUpdate()
        //setShowReportFilters(prev => true)
            //return filterStates
            //console.log(filterStates)
        //}
        // catch (errors) {
        //     console.log(errors);
        //     return undefined
        // }
    }

    // if(!showFilters){
    //     return (<></>
    //         // <button onClick={forceUpdate}>Force re-render</button>
    //     )
        
    // }

    function handleRefresh() {
        console.log("timeout 1")
        pageFilters()
        setIsRefresh(true)
        setTimeout(() => {
            console.log("timeout 2")
            setIsRefresh(false)
            forceUpdate()
        }, 2000);
    }


    if (reportFilters === undefined || !hasValidFilters ) {
        return (
            <>
                {!isRefresh ? (
                    <div className='flex h-8 w-full gap-2 bg-white pb-4 cursor-pointer' onClick={handleRefresh}>
                        <div className='h-6'>
                            <svg aria-hidden="true" className={`w-full h-full text-gray-200 dark:text-gray-600  `} viewBox="0 0 100 101" fill={currentColor} xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        <p>Nenhum filtro para exibir</p>
                    </div>
                ) : (
                    <div className='flex h-8 w-full gap-2 bg-white pb-4'>
                        <div className='h-6'>
                            <svg aria-hidden="true" className={`w-full h-full text-gray-200 animate-spin dark:text-gray-600`} viewBox="0 0 100 101" fill={currentColor} xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        <p>Carregando filtros, por favor aguarde</p>
                    </div>
                )
                }
            </>
            // <button onClick={forceUpdate}>Force re-render</button>
        )
    }

    // if(loadingFilters){
    //     return (
    //         <div className='flex h-8 w-full gap-2 bg-white pb-4'>
    //             <div className='h-6'>
    //                 <svg aria-hidden="true" className={`w-full h-full text-gray-200 animate-spin dark:text-gray-600`} viewBox="0 0 100 101" fill={currentColor} xmlns="http://www.w3.org/2000/svg">
    //                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
    //                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    //                 </svg>
    //             </div>
    //             <p>Carregando filtros, por favor aguarde</p>
    //         </div>
    //     )
        
    // }

    return (
                    <>
                {!isRefresh ? (
                    <div className='flex h-8 w-full gap-2 bg-white pb-4 cursor-pointer' onClick={handleRefresh}>
                        <div className='h-6'>
                            <svg aria-hidden="true" className={`w-full h-full text-gray-200 dark:text-gray-600  `} viewBox="0 0 100 101" fill={currentColor} xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        <p>Recarregar filtros</p>
                    </div>
                ) : (
                    <div className='flex h-8 w-full gap-2 bg-white pb-4'>
                        <div className='h-6'>
                            <svg aria-hidden="true" className={`w-full h-full text-gray-200 animate-spin dark:text-gray-600`} viewBox="0 0 100 101" fill={currentColor} xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        <p>Carregando filtros, por favor aguarde</p>
                    </div>
                )
                }
           
        <div className={`mb-2 flex flex-wrap gap-2 `} >
            {reportFilters.map((item, index) => (
                <>
                    {item.filter.filters.length > 0 ? (
                        <>

                            <span key={`reportFilter-${reportFilters?.slicer?.name} `} className={'border-1 w-auto rounded-2xl gap-2 p-2 flex flex-wrap'}>
                                <p className='border-b-1 w-full'>{item.slicer.title}</p>
                                {item.filter.filters[0]?.values && (
                                    <>
                                        {item.filter.filters[0].values.map((filt, index) => (
                                            <p className={pFilterClassName}>{filt}</p>
                                        ))}
                                    </>
                                )}
                                {item.filter.filters[0]?.hierarchyData && (
                                    <>
                                        {item.filter.filters[0].hierarchyData.map((filt, index) => (
                                            <>
                                                <p className={pFilterClassName}>{`${filt.value}`}</p>
                                                {filt?.children && (
                                                    <>
                                                        {filt?.children.map((filtChild1, indexChild1) => (
                                                            <>
                                                                <p className={pFilterClassName}>{`${filtChild1.value}`}</p>
                                                                {filtChild1?.children && (
                                                                    <>
                                                                        {filtChild1?.children.map((filtChild2, indexChild2) => (
                                                                            <>
                                                                                <p className={pFilterClassName}>{`${filtChild2.value}`}</p>
                                                                                {filtChild2?.children && (
                                                                                    <>
                                                                                        {filtChild2?.children.map((filtChild3, indexChild3) => (
                                                                                            <p className={pFilterClassName}>{filtChild3.value}</p>
                                                                                        ))}
                                                                                    </>
                                                                                )}
                                                                            </>
                                                                        ))}
                                                                    </>
                                                                )}
                                                            </>
                                                        ))}
                                                    </>
                                                )}
                                            </>
                                        ))}
                                    </>
                                )}
                            </span>
                        </>
                    ) : (<></>)
                    }
                </>
            ))}
        </div>
        </>
    );
}



const Reports = () => {
    const { ServerEndpoint, selectedReport, setSelectedReport, profileCompanyInfo, cookies, currentColor, appData } = useStateContext();
    const [headerOptions, setHeaderOptions] = useState("hidden")
    const filterText = profileCompanyInfo.companyGroup !== undefined ? `IdEmpresaGrupo eq '13'` : `IdEmpresa eq '${profileCompanyInfo._id}'`
    const [report, setReport] = useState(undefined);
    //const [displayMessage, setMessage] = useState(`The report is bootstrapped. Click the Embed Report button to set the access token`);
    const [loadedReport, setLoadedReport] = useState("")
    const [bookmarksReport, setBookmarksReport] = useState()
    const [reportConfig, setReportConfig] = useState({
        type: 'report',
        reportId: undefined,
        embedUrl: undefined,
        tokenType: models.TokenType.Embed,
        accessToken: undefined,
        permissions: models.Permissions.All,
        filters: [{
            $schema: "http://powerbi.com/product/schema#advanced",
            target: {
                table: "dim vwEquipamento",
                column: "IdEmpresaGrupo"
            },
            operator: "eq",
            values: [2]
        }],
        settings: {
            panes: {
                filters: {
                    expanded: false,
                    visible: false
                }
            },
            personalBookmarksEnabled: true,
            background: 0,
        }
    });
    const [authoringPage, setAuthoringPage] = useState(false)
    const [headerOptionsCss, setHeaderOptionsCss] = useState('flex w-45 cursor-pointer p-2 rounded-s hover:bg-opacity-5 ')
    const [simpleViewCss, setSimpleViewCss] = useState('flex w-45 cursor-pointer p-2 rounded-s hover:bg-opacity-5 hover:bg-gray-400')
    const [dashboardViewCss, setDashboardViewCss] = useState('hidden flex w-45 cursor-pointer p-2 rounded-s hover:bg-opacity-5 hover:bg-gray-400')
    const [embedContainerCss, setEmbedContainerCss] = useState(' h-[80vh] w-full')
    const [reportPages, setReportPages] = useState([])
    const [searchTerm] = useState(["name"]);
    const [q, setQ] = useState("");
    const [loadingChange, setLoadingChange] = useState(false)
    const [reportFilters, setReportFilters] = useState()
    const [loadFilters, setLoadFilters] = useState(false)
    const [loadFiltersKey, setLoadFiltersKey] = useState(nanoid())
    const [hideFilters, setHideFilters] = useState('hidden')
    const [mouseOverFilters, setMouseOverFilters] = useState(false)
    const [showReportFilters, setShowReportFilters] = useState(false)
    const [isLoadingFilters, setIsLoadingFilters] = useState(false)

    useEffect(() => {
        if (selectedReport !== undefined) {
            //console.log("selectedReport: ", selectedReport)
            if (selectedReport._id !== loadedReport && report !== undefined) {
                setLoadingChange(true)
                setBookmarksReport([]);
            }

            getToken(selectedReport);
        } else if (window.location.href.includes("/Reports")) {
            let urlName = window.location.href.split("/")
            urlName = decodeURIComponent(urlName[urlName.length - 1])

            if (appData !== undefined) {
                let reportFilter = appData.reports.filter(function (reportInfo) {
                    return reportInfo.name === urlName
                })[0];
                setSelectedReport(reportFilter)
                getToken(reportFilter);
            }
        }
    }, [selectedReport])

    useEffect(() => {

        if(reportFilters !== undefined){
            setIsLoadingFilters(false)
        }
    
    }, [reportFilters])
    

    const handleFilters = () => {
        //pageFilters()

        // if (hideFilters === 'hidden') {
        //     setHideFilters('')
        // }
        // else {
        //     setHideFilters('hidden')
        // }

        // setLoadFilters(!loadFilters)
        setLoadFiltersKey(nanoid())
        //handleFilters2()
    }

    const getToken = async (report) => {

        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_ENDPOINT}/api/getembedinfo`,
            data: {
                "clientId": process.env.REACT_APP_clientId,
                "workspace": report.workspace,
                "reportId": report.reportId,
                "pbiUsername": process.env.REACT_APP_pbiUsername,
                "pbiPassword": process.env.REACT_APP_pbiPassword
            },
            withCredentials: true
        };

        console.log("--------------------------", config)

        const res = await axios(config);

        setReportConfig({
            ...reportConfig,
            reportId: res.data.embedUrl[0].reportId,
            embedUrl: res.data.embedUrl[0].embedUrl,
            accessToken: res.data.accessToken
        });
        setLoadedReport(res.data.embedUrl[0].reportId);
        setLoadingChange(false)

        //loadBookmark();
    }

    const saveBookmark = () => {

    }

    const pagesMenuHandler = async () => {

        // Retrieve the page that contain the visual. For the sample report it will be the active page
        // let page = pages.filter(function (page) {
        //     return page.isActive
        // })[0];
    }


    const simpleView = async (type) => {
        //console.log(type)
        setSimpleViewCss(simpleViewCss + " hidden")
        setDashboardViewCss(dashboardViewCss.replace("hidden", ""))
        // Retrieve the page collection and get the visuals for the active page.
        try {
            const pages = await report.getPages();
            // Retrieve the page that contain the visual. For the sample report it will be the active page
            let page = pages.filter(function (page) {
                return page.isActive
            })[0];

            const visuals = await page.getVisuals();
            // console.log(
            //     visuals.map(function (visual) {
            //         return {
            //             name: visual.name,
            //             type: visual.type,
            //             title: visual.title,
            //             layout: visual.layout
            //         };
            //     }));

            let default_width = (window.innerWidth / type.column) - 5
            let default_height = (360) - 5
            let default_x = default_width + 5
            let default_y = default_height + 5
            // Define default visual layout: visible in 400x300.
            let defaultLayout = {
                width: default_width,
                height: default_height,
                displayState: {
                    mode: 1
                }
            };

            let visualsLayout
            let visual_x = 0;
            let visual_y = 0;
            let count = 0;
            let last_y = 0;
            let lineCount = 1;
            // MAP SLICERS FIRST
            // visuals.map((visual, index) => {
            //     if(visual.type === 'slicer' ){
            //         visualsLayout = {
            //             ...visualsLayout,
            //             [visual.name]: {
            //                 x: visual_x,
            //                 y: visual_y,
            //                 displayState: {
            //                     mode: 0
            //                 }
            //             },
            //         }
            //         count += 1
            //         visual_x += default_x
            //         if(count === 3){
            //             visual_x = 0
            //             visual_y += default_y
            //             count = 0
            //         }
            //         last_x = visual_x;
            //         last_y = visual_y;
            //     }
            // })
            // console.log("slicers", visualsLayout)
            // visual_x = 0
            // visual_y += default_y
            // count = 0
            // // MAP CARDS SECOND
            // visuals.map((visual, index) => {
            //     if (visual.type === 'slicer') {
            //         visualsLayout = {
            //             ...visualsLayout,
            //             [visual.name]: {
            //                 x: visual_x,
            //                 y: visual_y,
            //                 displayState: {
            //                     mode: 0
            //                 }
            //             },
            //         }
            //         count += 1
            //         visual_x += default_x
            //         if (count === 2) {
            //             visual_x = 0
            //             visual_y += default_y
            //             count = 0
            //             lineCount += 1
            //         }
            //         last_x = visual_x;
            //         last_y = visual_y;
            //     }
            // })
            // // console.log("cards", visualsLayout)
            // visual_x = 0
            // visual_y += default_y
            // count = 0
            // visuals.map((visual, index) => {
            //     if (visual.type === 'card') {
            //         visualsLayout = {
            //             ...visualsLayout,
            //             [visual.name]: {
            //                 x: visual_x,
            //                 y: visual_y,
            //                 displayState: {
            //                     mode: 0
            //                 }
            //             },
            //         }
            //         count += 1
            //         visual_x += default_x
            //         if (count === 2) {
            //             visual_x = 0
            //             visual_y += default_y
            //             count = 0
            //             lineCount += 1
            //         }
            //         last_x = visual_x;
            //         last_y = visual_y;
            //     }
            // })
            // // console.log("cards", visualsLayout)
            // visual_x = 0
            // visual_y += default_y
            // count = 0
            // maps everything else but shapes and textboxes
            visuals.map((visual, index) => {
                if (visual.type !== 'image' && visual.type !== 'actionButton' && visual.type !== 'shape' && visual.type !== 'basicShape' && visual.type !== 'textbox' && visual.type !== 'slicer' && visual.type !== 'card') {

                    if (count === 3 && type.lineType === "fullWidth") {
                        visualsLayout = {
                            ...visualsLayout,
                            [visual.name]: {
                                x: visual_x,
                                y: visual_y,
                                width: default_x * type.column,
                                displayState: {
                                    mode: 0
                                }
                            },
                        }
                    } else {
                        visualsLayout = {
                            ...visualsLayout,
                            [visual.name]: {
                                x: visual_x,
                                y: visual_y,
                                displayState: {
                                    mode: 0
                                }
                            },
                        }
                    }

                    count += 1
                    visual_x += default_x
                    if (count === type.column) {
                        visual_x = 0
                        visual_y += default_y
                        count = 0
                        lineCount += 1
                    }
                    last_y = visual_y;
                }
            })
            console.log(visualsLayout)
            // Page layout: two visible visuals in fixed position.
            let pageLayout = {
                defaultLayout: defaultLayout,
                visualsLayout: visualsLayout,
            };
            //console.log(pageLayout)

            // Define page size as custom size: 1000x580.
            let pageSize = {
                type: 4,
                width: (default_x * type.column),
                height: lineCount * default_y
            };

            console.log(pageSize, lineCount, default_y)

            let settings = {
                layoutType: 1,
                customLayout: {
                    displayOption: 1,
                    pageSize: pageSize,
                    pagesLayout: {
                        [page.name]: pageLayout
                    }
                },
                DisplayOption: "FitToPage",
                panes: {
                    filters: {
                        visible: false
                    },
                    pageNavigation: {
                        visible: true
                    }
                }
            }
            await report.updateSettings(settings);
            // console.log("Custom layout applied, to remove custom layout, reload the report using 'Reload' API.");
            // console.log(defaultLayout,  pageLayout, settings)//pageSize,
        }
        catch (errors) {
            console.log(errors);
        }
    }


    // const loadBookmark = async () => {
    //     console.log(report, bookmarksReport)
    //     // Retrieve the bookmark collection and loop through to print the
    //     // bookmarks' name and display name.

    //     try {
    //         let _bookmarks = []
    //         const bookmarks = await report.bookmarksManager.getBookmarks();
    //         bookmarks.forEach(function (bookmark) {
    //             _bookmarks.indexOf({id:bookmark.name, name: bookmark.displayName}) === -1 && _bookmarks.push({id:bookmark.name, name: bookmark.displayName});
    //         });
    //         setBookmarksReport(_bookmarks);
    //        //go = true;
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }


    //     console.log(report, bookmarksReport)

    // }

    // const  createReport = async () =>{
    //     report.switchMode("edit");

    //     try {
    //         const pageName = "Authoring page";
    //         if (!authoringPage) {
    //             // Adds a new page for the authoring APIs
    //             setAuthoringPage(await report.addPage(pageName));
    //             console.log("A new page for the authoring APIs was created, next step would be to use the 'Create a visual' API");
    //         }
    //         else{
    //             console.log(pageName + " already exists.")
    //             await authoringPage.setActive();
    //         }

    //     } catch (errors) {
    //         console.log(errors);
    //     }

    //     if (!authoringPage) {
    //         console.log("Authoring page is undefined. Please run 'Create an authoring page' first.");
    //     } else {
    //         // Creating new visual
    //         // For more information about report authoring, see https://go.microsoft.com/fwlink/?linkid=2153366
    //         try {
    //             await authoringPage.setActive();
    //             const response = await authoringPage.createVisual('clusteredColumnChart');
    //             console.log(response)
    //             let lastCreatedVisual = response.visual;

    //             console.log(lastCreatedVisual)

    //             // Defining data fields
    //             const CdEquipamento = { column: 'CdEquipamento', table: 'dim vwEquipamento', schema: 'http://powerbi.com/product/schema#column' };
    //             const mediaConsumo = { measure: 'Até 1 dia', table: 'c4m vwIndicadorConexao', schema: 'http://powerbi.com/product/schema#measure' };
    //             const mediaTotalVolume = { measure: 'Acima de 45', table: 'c4m vwIndicadorConexao', schema: 'http://powerbi.com/product/schema#measure' };

    //             // Adding visual data fields
    //             lastCreatedVisual.addDataField('Category', CdEquipamento);
    //             lastCreatedVisual.addDataField('Y', mediaConsumo);
    //             lastCreatedVisual.addDataField('Y', mediaTotalVolume);


    //         }
    //         catch (errors) {
    //             console.log(errors);
    //         }
    //     }

    //     try {
    //         const pages = await report.getPages();
    //         let log = "Report pages:";
    //         pages.forEach(function (page) {
    //             log += "\n" + page.name + " - " + page.displayName;
    //         });
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

    // const openHeaderOptionsHandler = () =>{
    //     console.log(headerOptions)
    //     if(headerOptions.includes("hidden")){
    //         setHeaderOptions(headerOptions.replace("hidden", ""))
    //     }
    //     else {
    //         setHeaderOptions("hidden" + headerOptions)
    //     }
    // }

    const reloadReport = () => {
        setSimpleViewCss(simpleViewCss.replace("hidden", ""));
        setDashboardViewCss(dashboardViewCss + " hidden");
        report.reload();
    }

    const [currentReportMode, setCurrentReportMode] = useState("view")

    const switchMode = async () => {
        if (currentReportMode === 'view') {
            report.switchMode("edit");
            setCurrentReportMode("edit")
        }
        else {
            report.switchMode("view");
            setCurrentReportMode("view")
            //reloadReport()
        }
    }

    // function saveReport() {
    //     var saveAsParameters = {
    //         name: "<name_of_new_report>"
    //     };
    //     this.report.saveAs(saveAsParameters);
    // }

    // const pagesLoadHandler = async () =>{
    //     try {

    //         let _pages = []
    //         const pages = await report.getPages();
    //         pages.forEach(function (page) {
    //             _pages.indexOf(page.name) === -1 && _pages.push(page.displayName);
    //         });

    //         setBookmarksReport(_pages);
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }

    // }
    // const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ defaultExpanded: true });

    // function search(items) {
    //     return items.filter((item) => {
    //       return searchTerm.some((newItem) => {
    //         return (
    //           item[newItem]
    //             .toString()
    //             .toLowerCase()
    //             .indexOf(q.toLowerCase()) > -1
    //         );
    //       });
    //     });
    //   }

    function openFiltersTab() {
        //pageFilters()
        setShowReportFilters(prev => !prev)
    }

    if (selectedReport === undefined || loadingChange) {
        return (
            <div className='m-2 p-2 h-[80vh] bg-white rounded-sm dark:bg-main-dark-bg'>
                <Loading />
            </div>
        )
    }

    // const handleHierarchyFilter = (hierarchies) => {
    //     let result = []
    //     console.log('handleHierarchyFilter')

    //     hierarchies.map((hierarchy, index) => {
    //         if(hierarchy?.children){
    //             result.push(handleHierarchyChildren(hierarchy.children))
    //         }
    //         else{
    //             result.push(hierarchy.value)
    //         }

    //     })

    //     console.log(result)

    // }

    // const handleHierarchyChildren = (prevChildren, hierarchyChildren) => {
    //     let childrenResult = []

    //     hierarchyChildren.map((child, index) => {
    //         let comma = hierarchyChildren.length === index ? '' : ', '
    //         childrenResult.push(`${child.value}`)
    //     })

    //     childrenResult = `${prevChildren.toString()} ${hierarchyChildren.toString()}`
    //     if(hierarchyChildren?.children){
    //         handleHierarchyChildren(childrenResult, hierarchyChildren.children)
    //     }

    //     return childrenResult
    // }

    const pFilterClassName = 'border-1 rounded-xl border-gray-200 px-2 w-auto'

    return (
        <div className='m-2 p-2 bg-white rounded-sm dark:bg-main-dark-bg'>
            <Header category='Relatórios' title={selectedReport.menuTitle} />
            <div className='flex mb-2'>
                {/* <div className={headerOptionsCss} onClick={openHeaderOptionsHandler}>
                    <span className='flex pr-2'>
                        <BsFillGearFill className='mt-1' />
                        <p className='ml-4'> Opções</p>
                        <IoMdArrowDropdown className='w-6 h-6 ml-6' />
                    </span>
                </div> */}
                <div className={simpleViewCss} onClick={() => simpleView({lineType: 'fullWidth', column: 2, slicersColumn: 6})}>
                    <button className='flex ml-2 w-auto'>
                        <BsFillGrid3X3GapFill className='mt-1 mr-2' />Visualização Simples</button>
                </div>
                <div className={dashboardViewCss} onClick={reloadReport}>
                    <button className='flex ml-2'>
                        <BsFillGrid1X2Fill className='mt-1 mr-2' />Visualização de Dashboard</button>
                </div>
                <div className={`flex w-45 cursor-pointer p-2 rounded-s hover:bg-opacity-5 hover:bg-gray-400`} onClick={switchMode}>
                    <button className='flex ml-2'>
                        <FaPencilAlt className='mt-1 mr-2' />Modo Livre</button>
                </div>
                <div className={`flex w-45 cursor-pointer p-2 rounded-s hover:bg-opacity-5 hover:bg-gray-400`} onClick={openFiltersTab}>
                    <button className='flex ml-2'>
                        <AiOutlineFilter className='mt-1 mr-2' />Exibir Filtros <span className='mt-1 ml-1'>{showReportFilters ? (<FiChevronUp />) : (<FiChevronDown />)}</span> </button>
                </div>
                {/* <button className='flex ml-2' onClick={pageFilters}><BsFillGrid1X2Fill className='mt-1 mr-2' />View Filters</button> */}
                {/* <div className={dashboardViewCss} onClick={simpleView}>
                    <button className='flex ml-2'>
                        <BsFillGrid1X2Fill className='mt-1 mr-2' />Change Grid</button>
                </div> */}
            </div>
            <div className={showReportFilters ? '' : 'hidden'}>
            <LoadReportFilters id={'loadFiltersKey'} report={report} currentColor={currentColor} showFilters={showReportFilters} isLoadingFilters={isLoadingFilters} /> 

            </div>            
          

            {/* <div className='w-52' key="reportBookmarks" >
                <div className="grid gap-1 grid-cols-2 grid-rows-1" {...getToggleProps()}>
                    <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase" >
                        Bookmarks
                    </p>
                    <p className="text-gray-400 dark:text-gray-400 m-3 mt-5 uppercase" >
                        {isExpanded ? (<FiChevronUp />) : (<FiChevronDown />)}
                    </p>
                </div>

                <div className="border-b-1">
                    {
                        bookmarksReport.map((bookmark, index) => (
                            <div key={`page-${bookmark.name}-${bookmark.displayName}-${index}`} className="mt-2 mr-4" {...getCollapseProps()}>
                                <div key={`div-${bookmark.name}-${bookmark.displayName}-${index}`}>
                                    <button
                                        key={`button-${bookmark.name}-${bookmark.displayName}-${index}`}
                                        onClick={() => []}
                                        // style={{
                                        //     backgroundColor: `${isSideMenuActive & sideMenuKeyActive === `${props.item.title}-${link.name}-${index}` ? currentColor : ''}`,
                                        // }}
                                        className={`flex items-center p-2 rounded-lg text-md `}>
                                        {bookmark.name}
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div> */}

            <PowerBIEmbed
                id="embedContainer"
                embedConfig={reportConfig}
                cssClassName={embedContainerCss}
                getEmbeddedComponent={async (embedObject) => {
                    setReport(embedObject);
                }}
                eventHandlers={
                    new Map([
                        ['loaded', async function () { }],
                        ['rendered', function () { }],
                        ['visualRendered', function () { }],
                        ['error', function (event) { }],
                        ['saved', function (event) {
                            //var newReportId = event.detail.reportObjectId;
                            console.log("Report saved", event);
                            report.save();
                        }]
                    ])
                }

            />
        </div>
    )
}

export default Reports

