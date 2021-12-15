import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";

import Login from '../Screens/Login/Login'
import Signup from '../Screens/Signup/Signup'
import Dashboard from "../Screens/Dahboard/Dahboard"
import Details from '../Screens/Details/Details';
import Admin from '../Screens/AdminDashboard/Admin';
import PageNotFound from '../Screens/NotFound/PageNotFound';

import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';
import { connect } from "react-redux";

const routesArr = [
    {
        path: '/details',
        Component: Details
    }
]

const Layout = (props) => {
    const { currentUser } = props;
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<AdminRoute component={Admin} currentUser={currentUser} />} />
            {routesArr.map((route) => {
                return (
                    <Route
                        key={route.path}
                        //exact={route.exact}
                        path={route.path}
                        element={<ProtectedRoute component={route.Component} currentUser={currentUser} />}
                    //render={(props) => <route.component {...props} />}
                    />
                );
            })}
        </Routes>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.user.data,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
