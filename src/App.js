import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useTheme, useMediaQuery } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Typography } from "@material-ui/core"
import Signup from './Screens/Signup/Signup';

import { connect } from "react-redux";
import { setUser, getAllUsers, getAllHotels,stateChanged } from './Redux';

import { auth } from './firebase';
import Layout from './Layout/Layout';

const customTheme = createTheme({
  typography: {
    fontFamily: ["Nunito-Regular", "sans-serif"].join(","),
    fontSize: 12,
  },
  overrides: {
    MuiButton: {
      root: {
        height: 40,
      },
    },
  },
});

function App(props) {

  const { setUser, getAllUsers, getAllHotels,stateChanged } = props;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user)
      if (user) {
        stateChanged(user.uid)
        getAllUsers();
      }
    })
    getAllHotels();

    return unsubscribe
  }, [])

  return (
    <ThemeProvider theme={customTheme} >
      <Layout />
    </ThemeProvider>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.user.data,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  getAllUsers: () => dispatch(getAllUsers()),
  getAllHotels: () => dispatch(getAllHotels()),
  stateChanged : (uid) => dispatch(stateChanged(uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);