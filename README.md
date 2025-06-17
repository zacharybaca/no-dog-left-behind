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
  /assets       # Images used in application
  /favicons     # Device specific sized favicons
/src
  /components   # Reusable UI elements
    /Footer
    /HeroSection
    /Login
    /Navbar
    /PageNotFound
  /contexts     # App-wide state
  /hooks        # Custom hooks to interact with API
  /App.css      # Styles file for main application component
  /App.jsx      # Main component file that renders everything
  /colors.css   # Styles file for custom color theme
  /index.css    # Styles file for global styling across application
  /main.jsx     # Main application file that starts rendering the main component
  /index.html   # HTML file that displays root container that renders main App component
```

## License

This project is part of a technical interview assignment and is not intended for production use or commercial distribution.

Built with ❤️ for dogs and clean code.
