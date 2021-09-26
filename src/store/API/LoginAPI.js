import { axiosInstance } from "./index";
import axios from 'axios'
import {
    API_URL,
    GET_LOGIN
} from './urlConsts'

// const handlerEnabled = false;

const url = endpoint => `${API_URL}${endpoint}`;

const login = async ({ mail, password }) => {
    return await axiosInstance.post(`${url(GET_LOGIN)}`, {
        mail: mail,
        pawd: password
    })
}

const logOut = async () => {
    return await axiosInstance.delete(`${url(GET_LOGIN)}`)
}

// const login = async ({ mail, password }) => {
//     const formData = new FormData();
//     formData.append('mail', JSON.stringify(mail));
//     formData.append('pawd', JSON.stringify(password));

//     return await axios.post('https://ayu.luciascipher.com/api/v1/auth', formData, {
//         headers: {
//             Authorization: sessionStorage.getItem('token'),
//             "Content-Type": "application/json",
//         }
//     });
// }

// const login = async ({ mail, password }) => {
//     const access_token = sessionStorage.getItem('token');
//     const data = await fetch("https://ayu.luciascipher.com/api/v1/auth/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: access_token,
//             "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//             mail: mail,
//             pawd: password
//         }),
//     });

//     const jsonData = await data.json();
//     console.log(jsonData);
// };


export default {
    login,
    logOut
};
