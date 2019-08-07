import axios from 'axios';
import { config } from '../config';

export default {

    /** 
     * @param {json}
     * user signup
     */
    Signup: (obj) => {
        return axios.post(config.baseApiUrl + "api/signup", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** 
     * @param {json}
     * user login
     */
    Login: (obj) => {
        return axios.post(config.baseApiUrl + "api/login", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** 
      * @param {json}
      * forgot password
      */
    ForgotPassword: (obj) => {
        return axios.post(config.baseApiUrl + "api/resetPassword", obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    },

    /** 
      * @param {json}
      * update password
      */
    UpdatePasswordUser: (obj) => {
        const Token = localStorage.getItem('token');
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

    /** 
       * @param {json}
       * reset password
       */
    ResetPassword: (obj, hash) => {
        return axios.post(config.baseApiUrl + "api/email-verify/" + hash, obj)
            .then(response => {
                return response;
            }).catch({ status: 500, message: 'Internal Server Error' });
    }
}