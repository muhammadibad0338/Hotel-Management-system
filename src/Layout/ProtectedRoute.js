import React, { useState } from "react";
import { Route, } from "react-router-dom";
import Login from '../Screens/Login/Login';


export const ProtectedRoute = ({ component: Component, currentUser, ...rest }) => {
    // console.log(currentUser,"user")
// currentUser && Object.keys(currentUser).length !=0

    if (localStorage.getItem('uid') ) {
        return (
            <Component {...rest} />
        )
    }
    else {
        return <Login />
    }

}
