import React from "react";
import axios  from "axios";
import {getCookie} from "../redux/authReducer";

const instanceHDservice = axios.create({
    baseURL: "http://localhost:4000/api/",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS"
    }
});

const serialize = obj => {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};


export const HDserviceAPI = {
    findAddress(address) {
        return instanceHDservice
            .get(`geo/find_address/?address=${address}&token=${getCookie('token')}`)
            .then(response => {
                return response.data
            });
    },
    getAddressParams(dataOrigin, dataDestination) {
        return instanceHDservice
            .get(`geo/address/?o=${dataOrigin}&d=${dataDestination}&token=${getCookie('token')}`)
            .then(response => {
                return response
            });
    },
    getMeetings(userId) {
        return instanceHDservice.get(`crm/meetings/?userId=${userId}&token=${getCookie('token')}`);
    },
    getDateSchedule(users, dates) {
        return instanceHDservice
            .post(`crm/schedule`, {
                users,
                dates,
                token: getCookie('token')
            })
            .then(response => {
                return response.data;
            });
    },
    getReserves() {
        return instanceHDservice.get(`crm/reserve/?token=${getCookie('token')}`);
    },
    createReserve(employee, date, time) {
        const data = {
            employee,
            date,
            time,
            name: 'admin',
            token: getCookie('token')
        };
        return instanceHDservice
            .post(`crm/reserve`, data)
            .then(response => {
                return response;
            });
    },
    getStaff() {
        return instanceHDservice
            .post(`crm/getstaff`, {
                list: 'all',
                token: getCookie('token')
            })
            .then(response => {
                return response.data;
            });
    },
};

//old
export const AuthAPI = {
    authMe(token) {
        return instanceHDservice
            .post(`auth/authme`, {token})
            .then(response => {
                return response.data;
            });
    },
    login(email, password) {
        return instanceHDservice
            .post(`auth/login`, {email, password})
            .then(response => {
                return response.data;
            });
    },
    logout() {
        return instanceHDservice.delete(`auth/login/`).then(response => {
            return response.data;
        });
    }
};
