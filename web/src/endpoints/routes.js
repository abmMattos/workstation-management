const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default {
    RESERVATION: {
        DELETE_RESERVATION: "https://workstation-management.onrender.com/reservation/delete",
        MAKE_RESERVATION: "https://workstation-management.onrender.com/reservation/reserveStation",
        GET_ALL_RESERVATIONS: "https://workstation-management.onrender.com/reservation/",
        GET_BY_USER_ID: "https://workstation-management.onrender.com/reservation/findReservationByUserId",
        GET_RESERVATIONS: "https://workstation-management.onrender.com/reservation/findReservedByDate"
    },

    STATION: {
        CREATE_STATION: `${BASE_URL}/station/create`,
        UPDATE_STATION: `${BASE_URL}/station/update`,
        GET_ALL_STATIONS: `${BASE_URL}/station/`,
        GET_FIND_UNIQUE: `${BASE_URL}/station/findunique`,
        DELETE_STATION: `${BASE_URL}/station/delete`,
        BLOCK_STATION: `${BASE_URL}/station/block`,
    },

    HARDWARE: {
        CREATE_HARDWARE: `${BASE_URL}/hardware/create`,
        UPDATE_HARDWARE: `${BASE_URL}/hardware/update`,
        GET_ALL_HARDWARES: `${BASE_URL}/hardware/`,
        GET_FIND_UNIQUE: `${BASE_URL}/hardware/findunique`,
        DELETE_HARDWARE: `${BASE_URL}/hardware/delete`,
    },

    USER: {
        CREATE_USER: `${BASE_URL}/user/create`,
        UPDATE_USER: `${BASE_URL}/user/update`,
        LOGIN: `${BASE_URL}/user/login`,
        GET_ALL_USERS: `${BASE_URL}/user`,
        GET_FIND_UNIQUE: `${BASE_URL}/user/findunique`,
        DELETE_USER: '${BASE_URL}/user/delete',
    },

    ADMIN: {
        LOGIN: `${BASE_URL}/admin/login`,
    }
}