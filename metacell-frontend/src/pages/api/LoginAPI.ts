import axios from 'axios';
import { setupUserInformation } from 'state/reducers/userInformationSlice';

const LoginAPI = async (
    REACT_APP_BACKEND_URI: string,
    userEmail: string,
    userPassword: string,
    navigate: any,
    dispatch: any
) => {
    let itemBody = {
        "userEmail": userEmail,
        "password": userPassword
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    try {
        let response = await axios.post(REACT_APP_BACKEND_URI + '/user/auth/login/', itemBody, config);
        let data = await response.data;
        localStorage.setItem('token', data.access);
        localStorage.setItem('userinfo', JSON.stringify({data: data}));
        console.log("LoginAPI -> data", data)
        let userinfo = {
            token: data.access,
            userinfo: data
        }
        dispatch(setupUserInformation(userinfo))

        navigate('/books')
    } catch (err) {
        console.log("LoginAPI  -> ", err);
    }
}


export default LoginAPI;