import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from '../../schema/user.schema';
import { createUser, findAllUser } from "../../service/user.service";
import { findAllProfile, findProfile } from "../../service/profile/profile.service";
import logger from "../../utils/logger";
import { findAllProfileFunction, findProfileFunction } from "../../service/profile/profileFunction.service";
import { findAllProfileGroup, findProfileGroup } from "../../service/profile/profileGroup.service";
import { ObjectId } from "mongodb";
import { findAllProfileType, findProfileType } from "../../service/profile/profileType.service";
import { findAllCompany, findCompany } from "../../service/company/company.service";
import { findAllCompanyDepartment, findCompanyDepartment } from "../../service/company/companyDepartment.service";
import { findAllCompanyType, findCompanyType } from "../../service/company/companyType.service";
import { findAllReport, findReport } from "../../service/report/report.service";
import { findAllMenu, findMenu } from "../../service/app/menu.service";
import { findAllMenuGroups, findMenuGroups } from "../../service/app/menuGroups.service";
import { findAllPage, findPage } from "../../service/app/page.service";
import { CompanyDepartmentInput, CompanyDepartmentDocument } from '../../models/company/companyDepartment.model';

export async function getAppInfoForMasterHandler(
    req: Request,
    res: Response
) {
    if (!res.locals.user) {
        return res.status(404).send("User not found")
    }

    const companiesInfo = await findAllCompany({})
    const departmentInfo = await findAllCompanyDepartment({})
    const companyTypesInfo = await findAllCompanyType({})

    const companies = {
        companies: companiesInfo,
        types: companyTypesInfo,
        departments: departmentInfo,
        groups: [{_id: '63181e3dab909ab677617772', name: "Nenhum"}]
    }


    const profilesInfo = await findAllProfile({})
    const profileTypesInfo = await findAllProfileType({})
    const profileFunctionsInfo = await findAllProfileFunction({})
    const profileGroupsInfo = await findAllProfileGroup({})
    
    const usersInfo = await findAllUser({})

    const profiles = {
        profiles: profilesInfo,
        types: profileTypesInfo,
        functions: profileFunctionsInfo,
        groups: profileGroupsInfo
    }


    const reportsInfo = await findAllReport({})

    const menusInfo = await findAllMenu({})
    const pagesInfo = await findAllPage({})
    const menuGroupsInfo = await findAllMenuGroups({})

    const navInfo = {
        menusInfo: menusInfo,
        menuGroupsInfo: menuGroupsInfo,
        pagesInfo: pagesInfo
    }

    const appInfo = {
        profiles: profiles,
        companies: companies,
        users: usersInfo,
        reports: reportsInfo,
        navigation: navInfo
    }

    return res.send({ appInfo });

}

export async function getMenusInfoHandler(
    req: Request,
    res: Response
) {
    if (!res.locals.user) {
        return res.status(404).send("User not found")
    }

    const menusInfo = await findAllMenu({})
    const pagesInfo = await findAllPage({})
    const menuGroupsInfo = await findAllMenuGroups({})

    const navInfo = {
        menusInfo: menusInfo,
        menuGroupsInfo: menuGroupsInfo,
        pagesInfo: pagesInfo
    }

    return res.send( navInfo );

}

export async function getAppInfoForUserHandler(
    req: Request,
    res: Response
) {
    if(!res.locals.user) {
        return res.status(404).send("User not found")
    }  

    let userInfo

    if(res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user._doc
    }
        
    if (!res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user
    }

    const profileFind = { profileUsers: { $all: [`${userInfo._id}`] }}
    const profile = await findProfile(profileFind)

    if (!profile){
        return res.status(404).send("Profile not found")
    }

    const profileCompanyInfoFind = {"_idProfile": profile._id}
    const profileCompanyInfo = await findCompany(profileCompanyInfoFind)

    if(!profileCompanyInfo){
        return res.status(404).send("Profile company not found")
    }

    let profileReportsInfo = []

    for(var i = 0; i <= profile.profileReports.length - 1; i++){

        const profileReportsFind = {_id: `${profile.profileReports[i]}`}

        if(profileReportsFind){
            const reportsInfo = await findReport(profileReportsFind)

            if(!reportsInfo){
                console.log(profileReportsFind)
                return res.status(404).send("Report not found")
            }

            profileReportsInfo[i] = reportsInfo
        }
    }

    
    let profileAppMenusInfo = []

    for(var i = 0; i <= profile.profileAppMenus.length - 1; i++){

        const profileAppMenusFind = {_id: `${profile.profileAppMenus[i]}`}

        if(profileAppMenusFind){
            const appMenusInfo = await findMenu(profileAppMenusFind)

            if(!appMenusInfo){
                return res.status(404).send("Menu not found")
            }

            profileAppMenusInfo[i] = appMenusInfo
        }
    }
    
    let profileAppPagesInfo = []

    for(var i = 0; i <= profile.profileAppPages.length - 1; i++){

        const profileAppPagesFind = {_id: `${profile.profileAppPages[i]}`}

        if(profileAppPagesFind){
            const appPagesInfo = await findPage(profileAppPagesFind)

            if(!appPagesInfo){
                return res.status(404).send("Page not found")
            }

            profileAppPagesInfo[i] = appPagesInfo
        }
    }
    

    let profileMenuGroupsInfo = []

    for (var i = 0; i <= profileAppMenusInfo.length - 1; i++) {
        //console.log(profileAppMenusInfo[i])
        for (var i2 = 0; i2 <= profileAppMenusInfo[i].groups.length - 1; i2++) {

            const profileMenuGroupsFind = { _id: `${profileAppMenusInfo[i].groups[i2]}` }

            if (profileMenuGroupsFind) {
                const menuGroupsInfo = await findMenuGroups(profileMenuGroupsFind)

                if (!menuGroupsInfo) {
                    return res.status(404).send("Menu group not found")
                }

                profileMenuGroupsInfo[i] = menuGroupsInfo
            }
        }
    }

    const navInfo = {
        menusInfo: profileAppMenusInfo,
        pagesInfo: profileAppPagesInfo,
        menuGroupsInfo: profileMenuGroupsInfo
    }
    
    /* APP INFO  */

    const appcompaniesInfo = await findAllCompany({})
    const appdepartmentInfo = await findAllCompanyDepartment({})
    const appcompanyTypesInfo = await findAllCompanyType({})

    const appcompanies = {
        companies: appcompaniesInfo,
        types: appcompanyTypesInfo,
        departments: appdepartmentInfo,
        groups: [{_id: '63181e3dab909ab677617772', name: "Nenhum"}]
    }


    const appprofilesInfo = await findAllProfile({})
    const appprofileTypesInfo = await findAllProfileType({})
    const appprofileFunctionsInfo = await findAllProfileFunction({})
    const appprofileGroupsInfo = await findAllProfileGroup({})
    
    const appusersInfo = await findAllUser({})

    const appprofiles = {
        profiles: appprofilesInfo,
        types: appprofileTypesInfo,
        functions: appprofileFunctionsInfo,
        groups: appprofileGroupsInfo
    }


    const appreportsInfo = await findAllReport({})

    const appmenusInfo = await findAllMenu({})
    const apppagesInfo = await findAllPage({})
    const appmenuGroupsInfo = await findAllMenuGroups({})

    const appnavInfo = {
        menusInfo: appmenusInfo,
        menuGroupsInfo: appmenuGroupsInfo,
        pagesInfo: apppagesInfo
    }

    const appInfo = {
        profiles: appprofiles,
        companies: appcompanies,
        users: appusersInfo,
        reports: appreportsInfo,
        navigation: appnavInfo
    }


    const userAppInfo = {
        reports: profileReportsInfo,
        navigation: navInfo
    }

    return res.send({ appInfo, userAppInfo });

}