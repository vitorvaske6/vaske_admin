import React, { createContext, useContext, useState, useEffect } from 'react';
import env from "react-dotenv";
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import axios from 'axios';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
    dashboardsMenu: false,
    pages: false,
    appsMenu: false,
    navMenu: false,
}
const UserLoginInfoSchema = {
    _id: String,
    login: String,
    email: String,
    picutre: String,
    createdAt: Date,
    updatedAt: Date,
    __v: Number,
    session: String,
    iat: Number,
    exp: Number,
}

const profileInfoSchema = {
    _id: String,
    name: String,
    surname: String,
    active: Boolean,
    profileFunction: String,
    profileGroups: [String],
    profileType: String,
    profileReports: [String],
    profileUsers: [String],
    createdBy: String,
    createdAt: Date,
    updatedAt: Date,
    __v: Number
}

const profileCompanyInfoSchema = {
    _id: String,
    cnpjCpf: String,
    corporateName: String,
    fantasyName: String,
    active: Boolean,
    companyDepartments: [String],
    companyType: String,
    companyGroup: String,
    companyProfiles: [String],
    createdBy: String,
    createdAt: Date,
    updatedAt: Date,
    __v: Number,
}

const CookiesSchema = {
    accessToken: String,
    refreshToken: String
}



export const ContextProvider = ({ children, env }) => {
    const [cookies, setCookie] = useState({ CookiesSchema });
    const [userLoginInfo, setUserLoginInfo] = useState({ UserLoginInfoSchema });
    const [profileInfo, setProfileInfo] = useState({ profileInfoSchema });
    const [profileCompanyInfo, setProfileCompanyInfo] = useState({ profileCompanyInfoSchema })
    const [employeesData, setEmployeesData] = useState()
    const [reportsData, setReportsData] = useState()
    const [companiesData, setCompaniesData] = useState()
    const [employeesLoaded, setEmployeesLoaded] = useState(false)
    const [isNavmenu, setIsNavmenu] = useState(true);
    const [isSidemenu, setIsSidemenu] = useState(true);
    const [isActiveSide, setIsActiveSide] = useState(false);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [mouseOver, setMouseOver] = useState('');
    const [navData, setNavData] = useState();
    const [isSideMenuActive, setIsSideMenuActive] = useState(false);
    const [sideMenuKeyActive, setSideMenuKeyActive] = useState(undefined);
    const [heightFit, setHeightFit] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [stayLoggedIn, setStayLoggedIn] = useState(true);
    const [selectedReport, setSelectedReport] = useState();
    const [appData, setAppData] = useState();
    const [userReports, setUserReports] = useState();
    const [ddProfilesParams, setDdProfilesParams] = useState();
    const [ddProfileTypesParams, setDdProfileTypesParams] = useState();
    const [ddCompanyGroupsParams, setDdCompanyGroupsParams] = useState();
    const [ddCompanyTypesParams, setDdCompanyTypesParams] = useState();
    const [ddCompanyDepartmentsParams, setDdCompanyDepartmentsParams] = useState();
    const [ddProfileFunctionsParams, setDdProfileFunctionsParams] = useState();
    const [ddProfileGroupsParams, setDdProfileGroupsParams] = useState();
    const ServerEndpoint = process.env.REACT_APP_SERVER_ENDPOINT

    useEffect(() => {

        if (!appData) {
            handleAppData()
        }

        if (!handleStayLoggedIn()) {
            setIsLoggedIn(false)
        }
        
    }, [cookies, isLoggedIn, appData])

    const clearStates = () => {
        setCookie({ CookiesSchema });
        setUserLoginInfo({ UserLoginInfoSchema });
        setProfileInfo({ profileInfoSchema });
        setProfileCompanyInfo({ profileCompanyInfoSchema })
        setEmployeesData()
        setReportsData()
        setCompaniesData()
        setEmployeesLoaded(false)
        setIsNavmenu(true);
        setIsSidemenu(true);
        setIsActiveSide(false);
        setIsClicked(initialState);
        setScreenSize(undefined);
        setThemeSettings(false);
        setIsMouseOver(false);
        setMouseOver('');
        setNavData();
        setIsSideMenuActive(false);
        setSideMenuKeyActive(undefined);
        setHeightFit();
        setIsOpen(false);
        setSelectedReport();
        setAppData();
        setUserReports();
        setDdProfilesParams();
        setDdProfileTypesParams();
        setDdCompanyGroupsParams();
        setDdCompanyTypesParams();
        setDdCompanyDepartmentsParams();
        setDdProfileFunctionsParams();
        setDdProfileGroupsParams();
    }

    const handleAppData = async () => {
        try {
            await axios.get(
                `${process.env.REACT_APP_SERVER_ENDPOINT}/api/appUser`, {
                withCredentials: true,
            }
            ).then(res => [setAppData(res.data.appInfo), setUserReports(res.data.userAppInfo.reports), handleNavInfo(res.data.userAppInfo.navigation, res.data.userAppInfo.reports, res.data.appInfo.navigation), handleDropdowns(res.data.appInfo)])
            return true
        } catch (e) {
            //console.log(e)
            return false
        }
    }

    const verifyPermissions = (isReport, linkName, linkGroup) => {
        let res = []
        if (!isReport) {
            res = navData.pagesInfo.filter((item, index) => {
                return linkName === item.name
            })
        }
        else {
            res = userReports.filter((item, index) => {
                return linkName === item.name
            })
        }

        if(res.length === 0){
            return false
        }
        return true

    }

    const handleDropdowns = (appData) => {

        let arrDdProfiles = []
        let arrDdProfileTypes = []
        let arrDdProfileGroups = []
        let arrDdProfileFunctions = []
        let arrDdCompanyGroups = []
        let arrDdCompanyTypes = []
        let arrDdCompanyDepartments = []

        appData.profiles.profiles.map((profile, index) => {
            let current = {
                _id: profile._id,
                value: profile._id,
                name: `${profile.name} ${profile.surname}`,
                selected: false,
            }
            arrDdProfiles.push(current)
        })
        setDdProfilesParams(arrDdProfiles)

        appData.profiles.types.map((profileType, index) => {
            let current = {
                _id: profileType._id,
                value: profileType._id,
                name: `${profileType.name}`,
                selected: false,
            }
            arrDdProfileTypes.push(current)
        })
        setDdProfileTypesParams(arrDdProfileTypes)

        appData.profiles.functions.map((_function, index) => {
            let current = {
                _id: _function._id,
                value: _function._id,
                name: `${_function.name}`,
                selected: false,
            }
            arrDdProfileFunctions.push(current)
        })
        setDdProfileFunctionsParams(arrDdProfileFunctions)

        appData.profiles.groups.map((_group, index) => {
            let current = {
                _id: _group._id,
                value: _group._id,
                name: `${_group.name}`,
                selected: false,
            }
            arrDdProfileGroups.push(current)
        })
        setDdProfileGroupsParams(arrDdProfileGroups)
        //

        appData.companies.groups.map((_group, index) => {
            let current = {
                _id: _group._id,
                value: _group._id,
                name: `${_group.name}`,
                selected: false,
            }
            arrDdCompanyGroups.push(current)
        })
        setDdCompanyGroupsParams(arrDdCompanyGroups)

        appData.companies.types.map((_type, index) => {
            let current = {
                _id: _type._id,
                value: _type._id,
                name: `${_type.name}`,
                selected: false,
            }
            arrDdCompanyTypes.push(current)
        })
        setDdCompanyTypesParams(arrDdCompanyTypes)

        appData.companies.departments.map((_department, index) => {
            let current = {
                _id: _department._id,
                value: _department._id,
                name: `${_department.name}`,
                selected: false,
            }
            arrDdCompanyDepartments.push(current)
        })
        setDdCompanyDepartmentsParams(arrDdCompanyDepartments)
        
        //console.log("arrDdProfiles, arrDdProfileTypes, arrDdProfileFunctions", arrDdProfiles, arrDdProfileTypes, arrDdProfileFunctions)

    }

    const handleStayLoggedIn = async () => {
        try {
            await axios.get(
                `${process.env.REACT_APP_SERVER_ENDPOINT}/api/users/me`, {
                withCredentials: true,
            }
            ).then(res => [setIsLoggedIn(true), handleUserLoginInfo(res.data)])
            return true
        } catch (e) {
            //console.log(e)
            setIsLoggedIn(false)
            return false
        }

        
    }

    const handleMouseOver = (n) => {
        setMouseOver(n);
    }

    const handleIsMouseOver = () => {
        setIsMouseOver(true);
    }

    const handleMouseOut = () => {
        setIsMouseOver(false);
        setMouseOver(null);
    }

    const handleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
        //setThemeSettings(false);
    }

    const setColor = (color) => {
        setCurrentColor(color);        
        localStorage.setItem('themeColorMode', color);
    }

    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true });
    }

    const handleUserLoginInfo = (data) => {

        setUserLoginInfo({ 
            _id: data.userInfo._id,
            login: data.userInfo.login,
            email: data.userInfo.email,
            createdAt: data.userInfo.createdAt,
            picture: data.userInfo.picture,
            updatedAt: data.userInfo.updatedAt,
            __v: data.userInfo.__v,
            session: data.userInfo.session,
            iat: data.userInfo.iat,
            exp: data.userInfo.exp,
        });

        setProfileInfo({
            _id: data.profileInfo._id,
            name: data.profileInfo.name,
            surname: data.profileInfo.surname,
            active: data.profileInfo.active,
            profileFunction: data.profileInfo.profileFunction,
            profileGroups: data.profileInfo.profileGroups,
            profileType: data.profileInfo.profileType,
            profileReports: data.profileInfo.profileReports,
            profileUsers: data.profileInfo.profileUsers,
            createdBy: data.profileInfo.createdBy,
            createdAt: data.profileInfo.createdAt,
            updatedAt: data.profileInfo.updatedAt,
            __v: data.profileInfo.__v
        })

        setProfileCompanyInfo({
            _id: data.profileCompanyInfo._id,
            cnpjCpf: data.profileCompanyInfo.cnpjCpf,
            corporateName: data.profileCompanyInfo.corporateName,
            fantasyName: data.profileCompanyInfo.fantasyName,
            active: data.profileCompanyInfo.active,
            companyDepartments: data.profileCompanyInfo.companyDepartments,
            companyType: data.profileCompanyInfo.companyType,
            companyGroup: data.profileCompanyInfo.companyGroup,
            companyProfiles: data.profileCompanyInfo.companyProfiles,
            createdBy: data.profileCompanyInfo.createdBy,
            createdAt: data.profileCompanyInfo.createdAt,
            updatedAt: data.profileCompanyInfo.updatedAt,
            __v: data.profileCompanyInfo.__v,
        })
        
    }

    const handleProfileDetailsObject = (_id, defaultRes, property, propertySublevel) => {
        let dataToFilter = appData[property]

        if(propertySublevel){
            dataToFilter = dataToFilter[propertySublevel]
        }
        var res = dataToFilter.filter(function (item) {
            return item._id === _id;
        });

        if(res[0] === undefined){
            return defaultRes
        }

        return res[0]
    }

    const handleCompanyDetailsObject = (_id, defaultRes, property, propertySublevel) => {
        let dataToFilter = appData[property]

        if(propertySublevel){
            dataToFilter = dataToFilter[propertySublevel]
        }

        var res = dataToFilter.filter(function (item) {
            return item._id === _id;
        });

        if(res[0] === undefined){
            return defaultRes
        }

        return res[0]
    }

    const handleNavInfo = (navDataApi, reportsDataApi, allNavDataApi) => {
        let _groups = []
        let _links = []
        let _reports = []

        navDataApi.menusInfo.map((item, index) => {
            item.groups.map((group, ind) =>{
                let groupFilter = allNavDataApi.menuGroupsInfo.filter(function (groupInfo) {
                    return group === groupInfo._id
                })[0];
                if(groupFilter !== undefined){
                    _groups.push({...groupFilter})
                }
            })

            item.groups = _groups
            _groups = []

            item.groups.map((group, ind) =>{
                if(item.title === 'Reports' && group?.links !== undefined){
                    group.links.map((link, ind) => {
                        let reportFilter = reportsDataApi.filter(function (reportInfo) {
                            return link === reportInfo._id
                        })[0];

                        if(reportFilter !== undefined){
                            _reports.push({ ...reportFilter, page: "Reports" })
                        }
                    })

                    group.links = _reports
                }
                else {
                    if (group?.links !== undefined) {
                        group.links.map((link, ind) => {

                            let linkFilter = navDataApi.pagesInfo.filter(function (linkInfo) {
                                return link === linkInfo._id
                            })[0];

                            if(linkFilter !== undefined){
                                _links.push({ ...linkFilter })
                            }
                        })

                        group.links = _links
                    }
                }
                _links = []
                _reports = []
            })
            
            
            
        })

        setNavData(navDataApi)
    }

    
    function normalizeObjectToId(object) {
        if(object === undefined){
            return object
        }
        if (Array.isArray(object)) {
            let result = []
            object.map((item, index) => {
                let keys = Object.keys(item)

                if (keys.length > 0) {
                    result.push(`${item._id}`)
                } else {
                    result.push(`${item}`)
                }
            })
            return result
        } else {            
            if (typeof object === "object" ) {
                return `${object._id}`
            } else {
                return `${object}`
            }
        }
    }
    
    const handleUserDetailsObject = (_id, defaultRes, property, propertySublevel) => {
        //console.log(_id, defaultRes, property, propertySublevel)
        let dataToFilter = appData[property]

        if(propertySublevel){
            dataToFilter = dataToFilter[propertySublevel]
        }

        //console.log(dataToFilter)

        var res = dataToFilter.filter(function (item) {
            return item._id === _id;
        });

        //console.log("res",res)

        if(res[0] === undefined){
            return defaultRes
        }

        return res[0]
    }

    return (
        <StateContext.Provider
            value={{
                ServerEndpoint, appData, setAppData, navData, clearStates, verifyPermissions, normalizeObjectToId,
                userReports,
                handleProfileDetailsObject, handleUserDetailsObject, handleCompanyDetailsObject,
                ddProfileFunctionsParams, ddProfilesParams, ddProfileTypesParams, ddCompanyTypesParams, ddCompanyGroupsParams, ddCompanyDepartmentsParams, ddProfileGroupsParams,
                employeesLoaded, setEmployeesLoaded,
                employeesData, setEmployeesData, reportsData, setReportsData, companiesData, setCompaniesData,
                handleUserLoginInfo, userLoginInfo, profileInfo, profileCompanyInfo,
                setCookie, cookies,
                isNavmenu, setIsNavmenu,
                isSidemenu, setIsSidemenu,
                isActiveSide, setIsActiveSide,
                isClicked, setIsClicked,
                handleClick,
                screenSize, setScreenSize,
                currentColor, setColor, setCurrentMode,
                currentMode, setMode, setCurrentColor,
                themeSettings, setThemeSettings,
                handleMouseOut, handleIsMouseOver, handleMouseOver, isMouseOver, mouseOver,
                sideMenuKeyActive, setSideMenuKeyActive, isSideMenuActive, setIsSideMenuActive,
                heightFit, setHeightFit,
                isLoggedIn, setIsLoggedIn,
                isOpen, setIsOpen, handleIsOpen,
                stayLoggedIn,
                selectedReport, setSelectedReport,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);