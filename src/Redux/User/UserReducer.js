import {
    SET_CURRENT_USER,
    SET_LOADING,
    SET_ERROR,
    SET_LOGOUT,
    GET_ALL_USERS,
    GET_ALL_HOTELS
} from "./UserTypes";


const initialState = {
    data: {},
    loading: false,
    logged: false,
    error: null,
    allUsers: {},
    allHotels: [],
    currentUser:{}
};


const userReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                data: payload,
                logged: true,
                loading: false,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: payload    ,
                error: null,
            };
        case SET_ERROR:
            return {
                ...state,
                error: payload,
            };
        case SET_LOGOUT:
            return {
                ...state,
                data: {},
                logged: false,
                loading: false,
            };
        case GET_ALL_USERS:
            return{
                ...state,
                allUsers: payload
            }
        case GET_ALL_HOTELS:
            return{
                ...state,
                allHotels:payload
            }
        default:
            return state;
    }
}


export default userReducer;