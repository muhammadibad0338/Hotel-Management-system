import React, { useState } from 'react'
import {
    Grid,
    OutlinedInput,
    Box,
    Divider,
    Typography,
    CircularProgress,
    NativeSelect,
    InputBase,
    withStyles,
    Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { connect } from "react-redux";
import { userLogin } from '../../Redux';

import Swal from "sweetalert2";

const styles = makeStyles((theme) => ({
    redBanner: {
        width: "100%",
        height: "auto",
        maxHeight: "105px"
    },
    signupBg: {
        backgroundColor: "#F7F7F7",
        minHeight: "100vh"
    },
    logo: {
        width: "auto",
        maxHeight: "60px"
    },
    alignCenter: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    inputField: {
        backgroundColor: "#FFFFFF",
        border: "none !important",
        outline: "none !important",
        borderRadius: "5px",
        height: "35px",
        width: "350px",
        // margin:"5px 10px",
        // "&:hover": {
        //     "& $notchedOutline": {
        //         border: "none",
        //     },
        // },
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
        },
    },
    widthSetter: {
        width: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    inputLabel: {
        color: "black",
        textTransform: "uppercase",
        fontWeight: "bold",
        alignSelf: "flex-start",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "5%",
            marginRight: "5%",
        },
    },
    signupBtn: {
        width: "100%",
        backgroundColor: "#FF0000",
        color: "white",
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
        },
        "&:hover": {
            backgroundColor: "#FF0000",
            color: "white",
        },
    }
}));

const Login = (props) => {
    const classes = styles();
    let navigate = useNavigate();
    const { userLogin, currentUser } = props;

    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        userLogin(email, password).then(res => {
            if (res !== null) {
                localStorage.setItem('uid', `${res?.user?.uid}`)
                navigate('/')
            }
            console.log(res, "responses Login")
        })
    }


    if (currentUser != null) {
        return <Navigate to={-1} />
    }
    return (
        <>
            <Grid container className={classes.signupBg} >

                {/* <Grid xs={12}   >
                    <Box className={classes.alignCenter} sx={{ paddingY: 2 }} >
                        <img className={classes.logo} src={logo} />
                        <Typography variant="h4" style={{ color: "#FF0000", marginTop: "20px", textTransform: "uppercase", fontWeight: "bold" }} >
                            Dollar $tore !
                        </Typography>
                        <Typography variant="h6" style={{ fontWeight: "bold", letterSpacing: "2px", marginTop: "5px" }} >
                            Signup to Dollar$tore
                        </Typography>
                    </Box>
                </Grid> */}
                <Grid item xs={12} className={classes.alignCenter} >
                    <form className={classes.widthSetter} >
                        <Box my={3} className={classes.widthSetter}  >
                            <Typography className={classes.inputLabel} >Email Address </Typography>
                            <OutlinedInput type="email" required fullWidth className={classes.inputField} value={email} onChange={(e) => setemail(e.target.value)} placeholder="mibad0338@gmail.com" />
                        </Box>
                        <Box my={3} className={classes.widthSetter}  >
                            <Typography className={classes.inputLabel} >Password </Typography>
                            <OutlinedInput type="password" required fullWidth className={classes.inputField} value={password} onChange={(e) => setpassword(e.target.value)} placeholder="*************" />
                        </Box>
                        <Box my={3} className={classes.widthSetter} >
                            <Button type="submit" className={classes.signupBtn} onClick={(e) => handleLogin(e)} >Login</Button>
                        </Box>
                    </form>
                    <Typography style={{ fontWeight: "bold" }} >Don't Have an Account</Typography>
                    <Typography style={{ fontWeight: "bold", color: "#FF0000", margin: "10px 0px" }} >
                        <Link style={{ color: "#FF0000", textDecoration: "none" }} to="/signup" >
                            Signup
                        </Link>
                    </Typography>
                </Grid>

            </Grid>
        </>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.user.data,
});

const mapDispatchToProps = (dispatch) => ({
    userLogin: (email, password) => dispatch(userLogin(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);