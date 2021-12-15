import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TablePagination,
    Box,
    CircularProgress,
    Typography,
    Chip
} from "@material-ui/core";
import { connect } from "react-redux";

const styles = makeStyles((theme) => ({
    dashboard: {
        backgroundColor: "#FFFFFF",
        margin: "10px 0px",
        borderRadius: "10px",
        boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 500
    },
    Deletebtn: {
        width: "auto",
        backgroundColor: "#DC3545",
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
          backgroundColor: "#DC3545",
          color: "#fff",
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
    rootTable: {
        width: "100%",
        margin: "30px 0px",
        borderRadius: "8px",
      },
      tableContainer: {
        fontFamily: "inherit",
      },
      tableRow: {
        "&:hover": {
          color: "#09926E",
          backgroundColor: "#f5f5f5",
        },
      },
      tableCell: {
        fontFamily: "inherit",
        backgroundColor: "#0095FF",
        color: "#ffff",
        textAlign: "left",
        fontWeight: "bold",
        textTransform: "upperCase",
      },
      tableCellBody: {
        textAlign: "left",
      },
}));

const HotelTable = (props) => {
    const classes = styles();
    const {hotels,hideDialogHandler,setHotelDetails} = props;
    const [selectedHotel, setSelectedHotel] = useState({
        hotelName:'',
        image:'',
        details:'',
        noOfRooms:0,
        perDayPrice:0
    })

    const editHotelDetails = (id,data) =>{
        // console.log(id,data,"hotel data")
        let obj = {
            uid:id,
            hotelName: data?.hotelName,
            image: data?.image,
            details: data?.details,
            noOfRooms: data?.noOfRooms,
            perDayPrice: data?.perDayPrice
        }
        setHotelDetails(obj)
        hideDialogHandler();
    }


    return (
        <>
      {hotels.length == 0 ? <div className={classes.loadingContainer}>
        <CircularProgress style={{ color: "#0095FF" }} />
      </div>
        : hotels?.length > 0 ?
          <Box m={2}>
            <Paper elevation={0} className={classes.rootTable}>
              <TableContainer className={classes.tableContainer}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableCell}>Image</TableCell>
                      <TableCell className={classes.tableCell}>Hotel Name</TableCell>
                      <TableCell className={classes.tableCell}>Details</TableCell>
                      <TableCell className={classes.tableCell}>No of Rooms</TableCell>
                      <TableCell className={classes.tableCell}>Per Day Price</TableCell>
                      <TableCell className={classes.tableCell}>Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hotels?.map((row, id) => (
                      <TableRow key={id} className={classes.tableRow}>
                        <TableCell
                          className={classes.tableCellBody}
                          style={{ width: "20%" }}
                        >
                          <img style={{ width: 80, height: 60 }} src={row?.data?.image} alt="" />
                        </TableCell>
                        <TableCell
                          className={classes.tableCellBody}
                          style={{ width: "20%", }}
                        >
                          {row?.data?.hotelName}
                        </TableCell>
                        <TableCell
                          className={classes.tableCellBody}
                          style={{ width: "100%", }}
                        >
                          {row?.data?.details}
                        </TableCell>
                        <TableCell
                          className={classes.tableCellBody}
                          style={{ width: "50%" }}
                        >
                          <Typography style={{ fontWeight: 'bold' }}>
                          {row?.data?.noOfRooms}
                          </Typography>

                        </TableCell>
                        
                        <TableCell
                          className={classes.tableCellBody}
                          style={{ width: "50%" }}
                        >
                          {row?.data?.perDayPrice}
                        </TableCell>
                        <TableCell className={classes.tableCellBody}>
                          <Button
                            className={classes.btn}
                            onClick={() => editHotelDetails(row.id,row?.data)}
                            // onClick={() => editHotelDetails(row.id,row?.data?.image,row?.data?.hotelName,row?.data?.details,row?.data?.noOfRooms,row?.data?.perDayPrice)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
          :
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1>No data found</h1>
          </Box>
      }
    </>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.user.data,
    hotels: store.user.allHotels
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HotelTable);