import React from 'react';
import Slider from './slider';
import WorkSection from './WorkSection/WorkSection';
import Services from './Servies/Services';

const Home = () => {
    return (
        <div className='mt-10 container mx-auto'>
            <Slider></Slider>
            <WorkSection></WorkSection>
            <Services></Services>
            <h1>home</h1>
        </div>
    );
};

export default Home;