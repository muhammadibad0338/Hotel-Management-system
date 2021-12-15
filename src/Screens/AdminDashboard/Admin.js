import React, { useState } from 'react'
import { Container, Grid, Typography, Button, Divider, Box, OutlinedInput, Radio, FormControlLabel, } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux";
import { useLocation, useNavigate } from 'react-router';
import ScreenDialog from '../../Component/Dialog';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HotelTable from './HotelTable';

import { EditHotel } from '../../Redux';

const styles = makeStyles((theme) => ({
    backBtn: {
        backgroundColor: 'white',
        color: '#FF0000',
        width: '50px',
        height: '60px',
        borderRadius: '50%',
        "&:hover": {
            backgroundColor: 'white',
            color: '#FF0000',
        }
    },
    dashboard: {
        backgroundColor: "#FFFFFF",
        margin: "10px 0px",
        borderRadius: "10px",
        boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
    },
    firstDivider: {
        marginBottom: '20px',
    },
    twoFieldCntnr:{
        display:'flex',
        justifyContent:'space-between',
        [theme.breakpoints.down("xs")]: {
            flexDirection:'column'
        },
    },
    twoFieldAlign:{
        width:'40%',
        [theme.breakpoints.down("xs")]: {
            width:'100%',
        },
    },
    btn: {
        width: "auto",
        backgroundColor: "#0095FF",
        color: "#fff",
        fontWeight: "bold",
        textTransform: "capitalize",
        textDecoration: "none",
        boxShadow:
          "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        borderRadius: 5,
        cursor: "pointer",
        padding: "10px 20px",
        "&:hover": {
          backgroundColor: "#0095FF",
          color: "#fff",
        },
    },
}));

const Admin = (props) => {
    const classes = styles();
    const {EditHotel} = props;
    let navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState(false)
    const [HotelDetails, setHotelDetails] = useState({
        hotelName: '',
        image: '',
        details: '',
        noOfRooms: 0,
        perDayPrice: 0
    })

    const goBack = () => {
        navigate(-1)
    }

    const hideDialogHandler = () => {
        setDialogOpen(!dialogOpen)
        if (dialogOpen) {
            setHotelDetails({
                hotelName: '',
                image: '',
                details: '',
                noOfRooms: 0,
                perDayPrice: 0
            })
        }
    }

    const chnagesConfirm = (e) =>{
        e.preventDefault();
        // console.log(HotelDetails," parent hotelDetails")
        EditHotel(HotelDetails)
        hideDialogHandler();
    }

    return (
        <>
            <Container >
                <Grid container >
                    <Grid item xs={12} style={{ marginTop: '20px' }} >
                        <Typography variant="h3" style={{ color: "red", marginBottom: '10px' }} >Hotel Management System</Typography>
                        <Button className={classes.backBtn} variant='contained' onClick={goBack} > <ArrowBackIcon fontSize="large" /> </Button>
                        <Typography variant="h4" style={{ marginBottom: '10px', textAlign: 'center' }} >Admin Panel</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.dashboard} >
                        <Box px={2} >
                            <Typography style={{ marginTop: "10px" }} variant="h5">
                                Hotel Details
                            </Typography>
                        </Box>
                        <HotelTable hideDialogHandler={hideDialogHandler} setHotelDetails={(data) => setHotelDetails({ ...data })} />
                    </Grid>
                </Grid>
            </Container>
            <ScreenDialog openDialog={dialogOpen} maxWidth="sm" fullWidth={true} scrollType="body" hideDialogHandler={hideDialogHandler}>
                <Box pt={4} px={4} mb={1} >
                    <Typography className={classes.checkoutHead} variant="h5" >Edit Hotel Details</Typography>
                </Box>
                <Divider className={classes.firstDivider} />
                <Box pb={4} px={4} >
                    <form>
                        <Box mt={2}>
                            <Typography style={{ color: "gray" }} >photo address *</Typography>
                            <OutlinedInput value={HotelDetails.image} disabled style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="image address" fullWidth
                            />
                        </Box>
                        <Box my={2}>
                            <Typography style={{ color: "gray" }} >Name *</Typography>
                            <OutlinedInput  value={HotelDetails.hotelName} disabled required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="Karachi.." fullWidth
                            />
                        </Box>
                        <Box my={2}>
                            <Typography style={{ color: "gray" }} >Details *</Typography>
                            <OutlinedInput  value={HotelDetails.details} onChange={(e) => setHotelDetails({...HotelDetails,details:e.target.value})} required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="Karachi.." fullWidth
                            />
                        </Box>
                        <div className={classes.twoFieldCntnr} >
                        <Box my={2} className={classes.twoFieldAlign} >
                            <Typography style={{ color: "gray" }} >No Of Rooms *</Typography>
                            <OutlinedInput value={HotelDetails.noOfRooms} onChange={(e) => setHotelDetails({...HotelDetails,noOfRooms:e.target.value})} required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="Karachi.." fullWidth
                            />
                        </Box>
                        <Box my={2} className={classes.twoFieldAlign} >
                            <Typography style={{ color: "gray" }} >Per Day Price *</Typography>
                            <OutlinedInput value={HotelDetails.perDayPrice} onChange={(e) => setHotelDetails({...HotelDetails,perDayPrice:e.target.value})} required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="Karachi.." fullWidth
                            />
                        </Box>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                            <Button type="submit" className={classes.btn} onClick={chnagesConfirm} >Confirm Changes</Button>
                        </div>
                    </form>
                </Box>
                {/* <Button onClick={() => console.log(HotelDetails, "parent hotel details")} >  Check hotek</Button> */}
            </ScreenDialog>
        </>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.user.data,
    hotels: store.user.allHotels
});

const mapDispatchToProps = (dispatch) => ({
    EditHotel: (uid, hotelName, image, noOfRooms, perDayPrice, details) => dispatch(EditHotel(uid, hotelName, image, noOfRooms, perDayPrice, details))
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);