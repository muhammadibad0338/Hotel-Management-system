import React, { useState } from 'react'
import { Typography, Grid, Box, Container, Divider, OutlinedInput, Radio, FormControlLabel, Button,Avatar, IconButton } from '@material-ui/core'
import { deepOrange, deepPurple } from '@mui/material/colors';
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { userLogout, bookedUserHotel } from '../../Redux';
import { makeStyles } from "@material-ui/core/styles";
import ScreenDialog from '../../Component/Dialog';
import { useNavigate } from 'react-router';

const styles = makeStyles((theme) => ({
  checkoutHead: {
    color: '#FF0000'
  },
  bookedtHead: {
    color: '#FF0000',
    textAlign: 'center'
  },
  firstDivider: {
    marginBottom: '20px',
  },
  placeOrderBtn: {
    backgroundColor: '#FF0000',
    color: 'white',
    padding: '20px',
    marginTop: '20px',
    "&:hover": {
      color: 'white',
      backgroundColor: '#FF0000',
    },
  },
}));

const Dahboard = (props) => {
  const classes = styles();
  const navigate = useNavigate();

  const { userLogout, hotels, currentUser, bookedUserHotel } = props;
  const [dialogOpen, setDialogOpen] = useState(false)
  const [credentials, setCredentials] = useState({
    name: currentUser?.name || '',
    contactNo: '',
    address: '',
    creditCardNumber: '',
    cardCode: '',
    bankName: ''
  })
  const [formNumber, setformNumber] = useState(0)
  const [hotelName, setHotelName] = useState('')

  const hideDialogHandler = () => {
    setDialogOpen(!dialogOpen)
    if (dialogOpen) {
      setformNumber(0)
      setHotelName('')
    }
  }

  const BookNow = (e) => {
    e.preventDefault();
    let hotelBooked = [...currentUser.hotelBooked, hotelName]
    bookedUserHotel(
      hotelBooked,
      currentUser?.uid,
      credentials?.name,
      credentials?.contactNo,
      credentials?.address,
      credentials?.creditCardNumber,
      credentials?.cardCode,
      credentials?.bankName)
      hideDialogHandler();
    console.log(hotelBooked, "hotelNAme")
  }

  const bookWithoutAuth = () =>{
    Swal.fire({
      customClass: {
          container: "my-swal",
      },
      icon: "error",
      title: "Hotel Management System",
      titleText: `Login First`
      // titleText: `${err?.response?.data?.message}`,
  });
  }

  const getFirstAlphabet = (value) =>{
    let arr =  Array.from(`${value}`)
    return arr[0]
  }



  return (
    <>
      <Grid container  >
        <Grid item xs={12}  >
          <div style={{ display: 'flex',flexWrap:'wrap' ,marginTop: '20px',padding:'0px 20px' }} >
            <Typography variant="h3" style={{ color: "red" }} >Hotel Management System</Typography>
            { currentUser ? <Button style={{ backgroundColor: "black", color: 'white',marginLeft:'auto' }} onClick={() => {
              userLogout()
              localStorage.removeItem('uid')
            }} >Logout</Button> : <Button onClick={() => navigate('/login')} style={{ backgroundColor: "black", color: 'white',marginLeft:'auto' }} >Login </Button>}
            {currentUser?.isAdmin && <Button onClick={() => navigate('/admin')} variant='contained' style={{marginLeft:'5px'}} >Go to Admin Panel</Button> }
            { currentUser && <IconButton onClick={() => navigate('/details')} style={{marginTop:'-10px'}} > <Avatar  sx={{ bgcolor: deepPurple[500] }}>{getFirstAlphabet(currentUser?.name)}</Avatar></IconButton> }
          </div>
        </Grid>
      </Grid>
      {hotels.length == 0 ? <Typography>Loading...</Typography> : <Container>
        <Grid container style={{ marginTop: '40px' }} spacing={4}  >
          {hotels?.map((val, i) => {
            return (
              <Grid key={val?.id} item xs={12} sm={6} md={4} >
                <Box p={2} style={{ boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)' }} >
                  <img style={{ width: '100%' }} src={val?.data?.image} />
                  <Typography style={{ margin: '10px 0px' }} variant="h6" >Hotel Name : {val?.data?.hotelName}</Typography>
                  <Typography style={{ margin: '10px 0px' }} variant="h6" >No of Rooms : {val?.data?.noOfRooms}</Typography>
                  <Typography style={{ margin: '10px 0px' }} variant="h6" >Per Day Price : {val?.data?.perDayPrice}</Typography>
                  {currentUser ? <>{ currentUser?.hotelBooked?.indexOf(val?.data?.hotelName) == -1 ? <Button onClick={() => {
                    setDialogOpen(true)
                    setHotelName(val?.data?.hotelName)
                  }} variant="outlined" >Book</Button> : <Typography style={{textAlign:'center',color:'red',marginBottom:'18px'}} >You Have Already Booked </Typography>}
                  </> : <Button onClick={bookWithoutAuth} variant="outlined" >Book </Button> }
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Container>
      }
      <ScreenDialog openDialog={dialogOpen} maxWidth="sm" fullWidth={true} scrollType="body" hideDialogHandler={hideDialogHandler}>
        <Box pt={4} px={4} >
          {/* <Typography className={classes.checkoutHead} variant="h3" >Book now</Typography> */}
          {(formNumber == 0 || formNumber == 1) && <Typography className={classes.checkoutHead} variant="h3" >Book now</Typography>}
          {formNumber == 2 && <Typography className={classes.bookedtHead} variant="h3" >Hotel Booked</Typography>}
        </Box>
        <Box pb={4} px={4} >
          {formNumber == 0 && <form>
            <Box mt={2}>
              <Typography style={{ color: "gray" }} >Name *</Typography>
              <OutlinedInput value={credentials.name} onChange={(e) =>
                setCredentials({ ...credentials, name: e.target.value })
              } required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="Your Name" fullWidth
              />
            </Box>
            <Box my={2}>
              <Typography style={{ color: "gray" }} >Contact No *</Typography>
              <OutlinedInput value={credentials.contactNo} onChange={(e) =>
                setCredentials({ ...credentials, contactNo: e.target.value })
              } required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="03152193909" fullWidth
              />
            </Box>
            <Box my={2}>
              <Typography style={{ color: "gray" }} >Address *</Typography>
              <OutlinedInput value={credentials.address} onChange={(e) =>
                setCredentials({ ...credentials, address: e.target.value })
              } required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="Karachi.." fullWidth
              />
            </Box>
            {/* <FormControlLabel value="cod" checked={true} value={true} control={<Radio />} label="Cash on CheckIn" /> */}
            {/* <Typography style={{ marginTop: '20px', textAlign: 'end' }} > Total Ammount : <span style={{ color: '#FF0000' }} > adad </span> </Typography> */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
              <Button type="submit" className={classes.placeOrderBtn} onClick={() => setformNumber(1)}  >Next </Button>
            </div>
          </form>}
          {formNumber == 1 && <form>
            <Box mt={2}>
              <Typography style={{ color: "gray" }} >Bank Name *</Typography>
              <OutlinedInput value={credentials.bankName} onChange={(e) =>
                setCredentials({ ...credentials, bankName: e.target.value })
              } required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="Your Bank Name" fullWidth
              />
            </Box>
            <Box my={2}>
              <Typography style={{ color: "gray" }} >Card Code *</Typography>
              <OutlinedInput value={credentials.cardCode} onChange={(e) =>
                setCredentials({ ...credentials, cardCode: e.target.value })
              } required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="99999999999" fullWidth
              />
            </Box>
            <Box my={2}>
              <Typography style={{ color: "gray" }} >Credit Card Number *</Typography>
              <OutlinedInput required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="9999999999." fullWidth
              />
            </Box>
            <FormControlLabel value="cod" checked={true} value={true} control={<Radio />} label="Cash on CheckIn" />
            {/* <Typography style={{ marginTop: '20px', textAlign: 'end' }} > Total Ammount : <span style={{ color: '#FF0000' }} > adad </span> </Typography> */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
              <Button type="submit" className={classes.placeOrderBtn} onClick={(e) => BookNow(e)}  >Book Now </Button>
            </div>
          </form>}
        </Box>
        {formNumber != 2 && <Divider className={classes.firstDivider} />}
      </ScreenDialog>
    </>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.user.data,
  hotels: store.user.allHotels
});

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogout()),
  bookedUserHotel: (hotelBooked, uid, name, contactNo, address, creditCardNumber, cardCode, bankName) => dispatch(bookedUserHotel(hotelBooked, uid, name, contactNo, address, creditCardNumber, cardCode, bankName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dahboard);
