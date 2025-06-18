# 🐾 No Dog Left Behind

## _“Bringing dogs from shelters to sofas.”_

## Overview

**No Dog Left Behind** is a responsive, user-friendly front-end application built to connect adoptable dogs in shelters with people looking to provide them a forever home. Created as part of the Fetch Rewards Front-End Developer Interview, this app leverages real-time API data to let users browse, search, and save dog breeds available for adoption.

## Features

- 🔐 **User Authentication** – Secure login/logout using Fetch’s API auth endpoints
- 🐶 **Breed Explorer** – Browse a wide range of dog breeds with images and metadata
- 🔎 **Search & Filter** – Find specific breeds with instant filtering and dynamic search
- ❤️ **Favorites** – Save breeds you're interested in adopting for easy access later
- 📱 **Responsive UI** – Clean, modern interface that works across all screen sizes
- ⚡ **Optimized Performance** – Fast, lightweight, and highly accessible

## Tech Stack

- **React** – Component-based UI
- **React Router** – Client-side routing
- **Axios** – API requests
- **Fetch Rewards API** – For authentication and breed data
- **CSS Modules / Styled Components** – Modular and scoped styling
- **Vite / Webpack** – Lightning-fast development server and bundler

## Getting Started

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/no-dog-left-behind.git
cd no-dog-left-behind

# Install dependencies
npm install

# Run the development server
npm run dev
```

## Project Structure

```bash
/public
  /assets                 # Images used in application
  /favicons               # Device specific sized favicons
/src
  /components             # Reusable UI elements
    /Dashboard            # Main page that displays dog objects
    /ErrorNotification    # Component that displays custom errors
    /Footer               # Component that displays helpful info about the application
    /HeroSection          # Component that is the main "center-piece" when the application loads
    /Login                # Component where a user can login to access their favorite dogs to adopt
    /Navbar               # Component that provides navigational links to get around the application
    /PageNotFound         # Component that displays when a user hits an endpoint that doesn't exist
    /SuccessNotification  # Component that displays custom success messages
    /SwipeableToast       # Component that includes the ability to be swiped away when on a mobile device
  /contexts               # App-wide state
    /Auth                 # Global state for authentication
    /DogSearch            # Global state for dogs retrieved from API
    /MenuOptions          # Global state for accessible menu options depending on your account type
    /Notifications        # Global state for notifications used within the application
    /AppProvider.jsx      # File that wraps all context files around main application component
  /hooks                  # Custom hooks to interact with API
    /useAuth.js           # Custom hook used for authentication
    /useDogSearch.js      # Custom hook used to retrieve state from API
    /useMenuOptions.js    # Custom hook used to retrieve state for different menu options
    /useNotification.js   # Custom hook used to retrieve state pertaining to Notifications used within the application
  /App.css                # Styles file for main application component
  /App.jsx                # Main component file that renders everything
  /colors.css             # Styles file for custom color theme
  /index.css              # Styles file for global styling across application
  /main.jsx               # Main application file that starts rendering the main component
  /index.html             # HTML file that displays root container that renders main App component
  /package.json           # JSON file that contains information about the application repo, and what dependencies are used
  /vite.config.js         # Config file when using VITE to generate the scaffold for a React application
```

## License

This project is part of a technical interview assignment and is not intended for production use or commercial distribution.

Built with ❤️ for dogs and clean code.
