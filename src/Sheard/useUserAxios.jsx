import axios from 'axios';
import React from 'react';


const userAxios = axios.create({
    baseURL: 'http://localhost:5000'
})

const useUserAxios = () => {
    return userAxios
};

export default useUserAxios;