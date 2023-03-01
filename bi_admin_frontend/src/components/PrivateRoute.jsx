import React from 'react'
import { Navigate, Route } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider'
import { Ecommerce } from '../pages';
import Footer from './Footer';
import { Navbar } from './Nav/Navbar/Navbar';


const PrivateRoute = ({child, isReport, linkName, linkGroup, permissionRequired}) => {
    // Add your own authentication on the below line.
    const { isLoggedIn, verifyPermissions, selectedReport } = useStateContext();
    
    if(!isLoggedIn){
        return <Navigate to="/login" />
    }

    if(isReport){
        if(!verifyPermissions(isReport, selectedReport?.name, linkGroup) && permissionRequired){
            return <Navigate to="/noAccess" />
        }
        else{
            return child
        }
    }
    else{
        if(!verifyPermissions(isReport, linkName, linkGroup) && permissionRequired){
            return <Navigate to="/noAccess" />
        }
        else{
            return child
        }
    }
    
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    //return isLoggedIn ? child : <Navigate to="/login" />;
}

export default PrivateRoute