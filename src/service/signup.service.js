import axios from 'axios';
import { config } from '../config';

export default {
    /** User Signup */
    Signup: (obj) => {
        console.log("obj:", obj)
        return axios.post(config.baseApiUrl + "api/signup", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** User Login */
    Login: (obj) => {
        console.log("obj==", obj);
        return axios.post(config.baseApiUrl + "api/login", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** Forgot Password */
    ForgotPassword: (obj) => {
        return axios.post(config.baseApiUrl + "api/resetPassword", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** Update Password */
    UpdatePasswordUser: (obj) => {
        const Token = localStorage.getItem('token');
        console.log("token==", Token);
        console.log("data======", obj);
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'JWT fefege...',
            'token': Token
        }
        return axios.post(config.baseApiUrl + "api/updatePassword", obj, { headers: headers })
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** Reset Password */
    ResetPassword: (obj, hash) => {
        console.log("hash===", obj, hash);
        return axios.post(config.baseApiUrl + "api/email-verify/" + hash, obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    }
}