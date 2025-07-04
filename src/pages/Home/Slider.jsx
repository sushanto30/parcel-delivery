import React from 'react';
// import Swiper from 'swiper';
import 'swiper/css';
// import { SwiperSlide } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
 import 'swiper/css/pagination';
 

const Slider = () => {
    return (
        <Swiper>
            <SwiperSlide> <img src="./../../../src/assets/banner/banner1.png" alt="" /></SwiperSlide>
            <SwiperSlide> <img src="./../../../src/assets/banner/banner2.png" alt="" /></SwiperSlide>
            <SwiperSlide> <img src="./../../../src/assets/banner/banner3.png" alt="" /></SwiperSlide>
        </Swiper>
    );
};

export default Slider;