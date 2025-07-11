import './page-not-found.css'
import Lottie from 'lottie-react'
import sadDogAnimation from '../../../assets/sad-dog.json'

const PageNotFound = () => {
  return (
    <div id="page-not-found-container">
      <h1>404: This Page Took Off With a Leash!</h1>
      <Lottie animationData={sadDogAnimation} loop={true} />
      <p>
        The page you're looking for might've fetched the wrong ball. But hey -- there's still hope.
      </p>
    </div>
  )
}

export default PageNotFound
