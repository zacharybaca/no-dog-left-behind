import './loading-application.css';
import Lottie from 'lottie-react';
import pawsAnimation from '../../../assets/paws-animation.json';

const LoadingApplication = () => {

    return (
        <div id="loading-container">
            <div id="loading-image-container">
                <Lottie animationData={pawsAnimation} loop={true} />
            </div>

            <div id="text-loading-container">
                <h1>No Dog Left Behind</h1>
                <p>because they're family....</p>
            </div>
        </div>
    )
};

export default LoadingApplication;
