import React from 'react';
import Contents from './Contents/Contents';
import FeatureForm from './FeatureForm/FeatureForm';


const Hero = ({features, loggedInUser, getComments, getVotes, sortFeaturesByAlphabetically }) => {
    return (
        <div className='container my-5'>
            <div className="row">
                <FeatureForm loggedInUser={loggedInUser}/>
                <Contents  features={features} loggedInUser={loggedInUser} getComments={getComments} getVotes={getVotes} sortFeaturesByAlphabetically={sortFeaturesByAlphabetically}/>
            </div>
        </div>
    );
};

export default Hero;