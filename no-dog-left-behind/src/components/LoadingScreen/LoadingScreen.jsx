import './loading-screen.css'


/* This component is used for when fetching dogs from the API */
const LoadingScreen = () => {
  return (
    <div id="loader">
      <div id="gif-container">
        <img src="/assets/loader.gif" alt="loading gif" />
      </div>

      <div id="loading-text-container">
        <img src="/assets/loading-text-image.png" id="loading-text-image" alt="loading text" />
      </div>
    </div>
  )
};

export default LoadingScreen
