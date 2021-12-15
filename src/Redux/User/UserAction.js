import {
    SET_CURRENT_USER,
    SET_LOADING,
    SET_ERROR,
    SET_LOGOUT,
    GET_ALL_USERS,
    GET_ALL_HOTELS,
    ADD_USER,
    EDIT_HOTELS
} from "./UserTypes";
import Swal from "sweetalert2";

import { auth, db } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore"


export const setUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
};

export const setallUser = (users) => {
    return {
        type: GET_ALL_USERS,
        payload: users,
    };
};

export const setallHotels = (hotels) => {
    return {
        type: GET_ALL_HOTELS,
        payload: hotels,
    };
};


export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: loading
    };
};

export const setErrors = (errors) => {
    return {
        type: SET_ERROR,
        payload: errors,
    };
};


export const setLogout = () => {
    return {
        type: SET_LOGOUT,
    };
};

export const stateChanged = (uid) => async (dispatch) => {
    try {
        // auth.onAuthStateChanged(user => {
        //     dispatch(setUser(user))
        // })
        await db.collection("users").where("uid", "==", uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    dispatch(setUser({ uid: doc.id, ...doc.data() }))
                    console.log(doc.id, " => ", doc.data(), "stateChanges res");
                });
            })
    }
    catch (err) {
        Swal.fire({
            customClass: {
                container: "my-swal",
            },
            icon: "error",
            title: "Hotel Management System",
            titleText: "Something Went Wrong"
            // titleText: `${err?.response?.data?.message}`,
        });
        dispatch(setErrors(err));

    }
}


export const userSignup = (email, password) => async (dispatch) => {
    try {
        await dispatch(setLoading(true))
        let res = auth.createUserWithEmailAndPassword(email, password)
        console.log(res, "sign up Redux res")
        return res

        // console.log(email,password)
    }
    catch (err) {
        dispatch(setLoading(true))
        Swal.fire({
            customClass: {
                container: "my-swal",
            },
            icon: "error",
            title: "Hotel Management System",
            titleText: `${err?.message}`
            // titleText: `${err?.response?.data?.message}`,
        });
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err)

    }

}


export const userLogin = (email, password) => async (dispatch) => {
    try {
        await dispatch(setLoading(true))
        return auth.signInWithEmailAndPassword(email, password)

        // return res

        // console.log(email,password)
    }
    catch (err) {
        dispatch(setLoading(true))
        Swal.fire({
            customClass: {
                container: "my-swal",
            },
            icon: "error",
            title: "Hotel Management System",
            titleText: `${err?.message}`
            // titleText: `${err?.response?.data?.message}`,
        });
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err)

    }

}


export const userLogout = () => async (dispatch) => {
    try {
        await dispatch(setLogout(true))
        return auth.signOut()

        // return res

        // console.log(email,password)
    }
    catch (err) {
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err)

    }

}


export const getAllUsers = () => async (dispatch) => {
    try {
        await dispatch(setLoading(true))
        let arr = [];

        await db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = {
                    id: doc.id,
                    data: doc.data()
                }
                arr.push(data)
                // console.log(doc.id, " => ", doc.data());s
            });
            dispatch(setallUser(arr))
        })

    }
    catch (err) {
        dispatch(setLoading(true))
        // Swal.fire({
        //     customClass: {
        //         container: "my-swal",
        //     },
        //     icon: "error",
        //     title: "Hotel Management System",
        //     titleText: `${err?.message}`
        //     // titleText: `${err?.response?.data?.message}`,
        // });
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err, "all users")

    }

}


export const getAllHotels = () => async (dispatch) => {
    try {
        await dispatch(setLoading(true))
        let arr = [];

        await db.collection("hotels").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = {
                    id: doc.id,
                    data: doc.data()
                }
                arr.push(data)
                // console.log(doc.id, " => ", doc.data());
            });
            dispatch(setallHotels(arr))
        })

    }
    catch (err) {
        dispatch(setLoading(true))
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err, "all users")

    }

}



export const setCurrentUser = (email, name, isAdmin, uid) => async (dispatch) => {
    try {
        await dispatch(setLoading(true))
        await db.collection("users").doc(uid).set(
            {
                email,
                name,
                isAdmin,
                hotelBooked: [],
                uid
            }
        ).then((res) => {
            dispatch(getAllUsers())
        })
        // console.log(uid,"res uid setCurrentUser")
    }
    catch (err) {
        dispatch(setLoading(true))
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err, "current User set")

    }

}

export const bookedUserHotel = (hotelBooked, uid, name, contactNo, address, creditCardNumber, cardCode, bankName) => async (dispatch) => {
    try {
        await dispatch(setLoading(true))
        await db.collection("users").doc(uid).update(
            {
                hotelBooked,
                uid,
                name,
                contactNo,
                address,
                creditCardNumber,
                cardCode,
                bankName
            }
        ).then((res) => {
            dispatch(getAllUsers())
            dispatch(stateChanged(uid))
            Swal.fire({
                customClass: {
                    container: "my-swal",
                },
                icon: "success",
                title: "Hotel Management System",
                titleText: `Hotel Booked`
                // titleText: `${err?.response?.data?.message}`,
            });
        })
        // console.log(uid,"res uid setCurrentUser")
    }
    catch (err) {
        dispatch(setLoading(true))
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err, "current User set")
        Swal.fire({
            customClass: {
                container: "my-swal",
            },
            icon: "error",
            title: "Hotel Management System",
            titleText: `Something Went Wrong`
            // titleText: `${err?.response?.data?.message}`,
        });

    }

}


export const EditHotel = ({ uid, hotelName, image, noOfRooms, perDayPrice, details }) => async (dispatch) => {
    try {
        await dispatch(setLoading(true))
        await db.collection("hotels").doc(uid).update(
            {
                uid,
                details,
                hotelName,
                image,
                noOfRooms,
                perDayPrice,
            }
        ).then((res) => {
            dispatch(getAllUsers())
            dispatch(stateChanged(uid))
            dispatch(getAllHotels())
            Swal.fire({
                customClass: {
                    container: "my-swal",
                },
                icon: "success",
                title: "Hotel Management System",
                titleText: `Changes Saved`
                // titleText: `${err?.response?.data?.message}`,
            });
        })
        // console.log(uid,"res uid setCurrentUser")
    }
    catch (err) {
        dispatch(setLoading(true))
        dispatch(setErrors(err));
        dispatch(setLoading(false))
        console.log(err, "EditHotel")
        Swal.fire({
            customClass: {
                container: "my-swal",
            },
            icon: "error",
            title: "Hotel Management System",
            titleText: `Something Went Wrong`
            // titleText: `${err?.response?.data?.message}`,
        });

    }

}
