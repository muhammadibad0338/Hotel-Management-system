import React from 'react'
import { Container, Grid, Typography, Button, Divider } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux";
import { useLocation, useNavigate } from 'react-router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
}));

const Details = (props) => {
    const classes = styles();
    let navigate = useNavigate();
    const { currentUser } = props;

    const goBack = () => {
        navigate(-1)
    }

    return (
        <Container >
            <Grid container >
                <Grid item xs={12} style={{ marginTop: '20px' }} >
                    <Typography variant="h3" style={{ color: "red", marginBottom: '10px' }} >Hotel Management System</Typography>
                    <Button className={classes.backBtn} variant='contained' onClick={goBack} > <ArrowBackIcon fontSize="large" /> </Button>
                </Grid>
                {currentUser?.hotelBooked?.length != 0 ? <Grid item xs={12}>
                    <Divider style={{ marginTop: '10px' }} />
                    <Typography variant="h5" style={{ color: "red", margin: '10px 0px' }} > Booking At</Typography>
                    {
                        currentUser?.hotelBooked?.map((val, i) => {
                            return (
                                <Typography>{i + 1}-- <span style={{ margin: '0px 8px', fontWeight: "bold" }} > {val} </span> Hotel</Typography>
                            )
                        })
                    }
                </Grid> :
                    <Grid item xs={12} >
                        <Typography variant="h5" style={{ color: "red", margin: '10px 0px' }} >NO Booking Yet</Typography>
                    </Grid>
                }
                <Grid item xs={12} >
                    <Divider style={{ marginTop: '30px' }} />
                    <Typography variant="h5" style={{ color: "red", margin: '10px 0px' }} >Personal Details</Typography>
                    {currentUser?.name && <Typography style={{margin:'5px 0px'}} > <span style={{  fontWeight: "bold" }} >User Name : </span> {currentUser?.name} </Typography>}
                    {currentUser?.email && <Typography style={{margin:'5px 0px'}} > <span style={{  fontWeight: "bold" }} >Email : </span> {currentUser?.email} </Typography>}
                    {currentUser?.contactNo && <Typography style={{margin:'5px 0px'}} > <span style={{  fontWeight: "bold" }} >Contact Number : </span> {currentUser?.contactNo} </Typography>}
                    {currentUser?.address && <Typography style={{margin:'5px 0px'}} > <span style={{  fontWeight: "bold" }} >Address : </span> {currentUser?.address} </Typography>}
                </Grid>
            </Grid>
        </Container>
    )
}


const mapStateToProps = (store) => ({
    currentUser: store.user.data,
    hotels: store.user.allHotels
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);