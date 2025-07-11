import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {

    const { user } = useContext(AuthContext)

    // console.log(user)

    if (!user) {
        return 'loaddd..'
    }
    else {
        axiosSecure.interceptors.request.use(config => {

            config.headers.authorization = `Bearer ${user?.accessToken}`

            return config
        },
            error => {
                return Promise.reject(error)
            }
        )
    }


    return axiosSecure
};

export default useAxiosSecure;