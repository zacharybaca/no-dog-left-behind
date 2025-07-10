import './loading-application.css';
import Lottie from 'lottie-react';
import pawsAnimation from '../../../assets/paws-animation.json';
import { useState, useEffect } from 'react';

const LoadingApplication = ({ isLoaded }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (isLoaded) {
            setFadeOut(true);
        };
    }, [isLoaded]);

    return (
        <div className={`loading-container ${fadeOut ? 'fade-out' : ''}`}>
            <div className="loading-image-container">
                <Lottie animationData={pawsAnimation} loop={true} />
            </div>

            <div className="text-loading-container">
                <h1>No Dog Left Behind</h1>
                <p>because they're family....</p>
            </div>
        </div>
    )
};

export default LoadingApplication;
