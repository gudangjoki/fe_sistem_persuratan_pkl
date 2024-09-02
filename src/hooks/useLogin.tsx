// useLogin.js
import axios from 'axios';
import Cookies from 'js-cookie';

const saveTokenToCookie = (access_token, refresh_token) => {
    Cookies.set('access_token', access_token, { expires: 7 });
    Cookies.set('refresh_token', refresh_token, { expires: 7 });
};

const useLogin = () => {
    const handleLogin = async () => {
        const body = {
            // isi data
            email: "",
            password: ""
        };
        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        try {
            const response = await axios.post('http://localhost:8000/api/login', body, options);
            const { access_token, refresh_token } = response.data;
            saveTokenToCookie(access_token, refresh_token);

            

            // const optionsSelfData = {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${access_token}`
            //     }
            // };

            // const user_response = await axios.get('http://localhost:8000/api/me', optionsSelfData);
            // console.log(user_response.data);

            // setRole(user_response.data);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return handleLogin;
};

export default useLogin;
