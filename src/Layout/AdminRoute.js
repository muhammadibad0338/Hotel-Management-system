import React, { useState } from "react";
import { Route, } from "react-router-dom";
import Login from '../Screens/Login/Login';
import Dahboard from "../Screens/Dahboard/Dahboard";


export const AdminRoute = ({ component: Component,currentUser, ...rest }) => {
    // console.log(currentUser,"user")
// currentUser && Object.keys(currentUser).length !=0

    if (localStorage.getItem('uid') ) {
        if(localStorage.getItem('uid')=='grxJsr7Ep6TbwD0VDjfJPBGVBmd2' || currentUser?.isAdmin )
        {
            return (
                <Component {...rest} />
            )
        }
        else{
            return <Dahboard/>
        }
    }
    else {
        return <Login />
    }

}
