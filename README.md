# 🐾 No Dog Left Behind [![License](https://img.shields.io/badge/license-none-lightgrey)](LICENSE)

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
- **Context API** - Built-in tool that is provided by React to manage global app state effectively
- **Fetch API** – Built-in tool to fetch data from external API endpoints
- **Fetch Rewards API** – For authentication and breed data
- **UUID** - Third-party utility that provides a random id that can be used for objects or other various components
- **CSS Modules / Styled Components** – Modular and scoped styling
- **Bootstrap** - Third-party library that offers pre-made components that can be used inside web applications
- **React-Bootstrap** - Third-party library that offers pre-made React components that can be utilized in React applications
- **React-Swipeable** - Third-party library that enables a user to swipe toast notifications away when on a mobile device
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

## Usage

- Login or create an account to save your favorite breeds.
- Browse breeds by scrolling or use the search bar for quick filtering.
- Tap on a breed to view more details and add to your favorites.
- Access your saved favorites anytime from the Favorites page.

## Demo

Check out the live app here: [No Dog Left Behind Demo](https://no-dog-left-behind.onrender.com)

### Screenshots

![Home Page](./public/assets/screenshots/homepage.png)
![Breed Explorer](./public/assets/screenshots/breed-explorer.png)
![Favorites](./public/assets/screenshots/favorites.png)

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
  /.gitignore             # File that lists certain files that should not be backed-up to the Github repo
  /.prettierignore        # File that lists certain file extensions that should not be formatted by the Prettier linter
  /.prettierrcjson        # File that lists certain configuration settings for the Prettier linter extension
  /eslint.config.js       # File that lists certain configuration settings for the ESLint linter
  /index.html             # HTML file that displays root container that renders main App component
  /package.json           # JSON file that contains information about the application repo, and what dependencies are used
  /vite.config.js         # Config file when using VITE to generate the scaffold for a React application
```

## Known Issues

- Some dog breed images may load slowly on slower internet connections due to reliance on external API resources.
- Currently, the app supports login for existing Fetch Rewards accounts only; user registration and password reset flows are not implemented.
- Favorites are stored locally in the browser and do not persist across devices or sessions.
- Accessibility improvements, such as enhanced keyboard navigation and screen reader support, are planned but not yet fully implemented.

---

## Future Improvements

- Implement user registration and password recovery functionality to support a wider user base.
- Add advanced breed filters (e.g., size, temperament, energy level) to improve user search experience.
- Integrate backend persistence for user favorites and settings to allow cross-device access.
- Enhance accessibility compliance to meet WCAG guidelines, improving usability for all users.
- Add automated testing to improve code quality and reliability.
- Optimize image loading with lazy loading techniques and caching strategies.

---

## 🔌 API Reference

All data for dogs and locations is served through the [Fetch Rewards Take-Home Service API](https://frontend-take-home-service.fetch.com).

**Base URL:**
`https://frontend-take-home-service.fetch.com`

---

### 🔐 Authentication

To access protected endpoints, you must first log in.

---

### `POST /auth/login`

Logs in the user and issues an `HttpOnly` cookie for authentication.

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

Response:
200 OK

The response includes a fetch-access-token cookie (HttpOnly, 1-hour expiration) which is automatically included in subsequent requests when credentials: 'include' is set.

### `POST /auth/logout`

Logs the user out and invalidates the session cookie.

Response:
200 OK

## 🐶 Dog Endpoints

Returns a list of all avilable dog breeds.

Response Example:

```bash

interface Dog {
id: string
img: string
name: string
age: number
zip_code: string
breed: string
}

interface Location {
zip_code: string
latitude: number
longitude: number
city: string
state: string
county: string
}

interface Coordinates {
lat: number
lon: number
}

```

```bash
["Labrador", "Golden Retriever", "Pug", ...]
```

### `GET /dogs/search`

Search for dogs with filtering and pagination options.

#### Query Parameters (optional)

- breeds: array of breed names
- zipCodes: array of ZIP codes
- ageMin / ageMax: numberic values
- sort: breed, name, or age, with direction (asc or desc)
- size: number of results (default: 25)
- from: pagination cursor

Response Example:

```json

{
  "resultIds": ["dog1", "dog2"],
  "total": 143,
  "next": "",
  "prev": ""
}

```

#### `POST /dogs`

Request Body:
Fetch detailed dog info for a list of up to 100 dog IDs.

Response Body

```bash

`["dog1", "dog2", "dog3"]`

```

Response:

```bash

`Dog[]`

```

#### `POST /dogs/match`

Request a matched dog from a list of dog IDs.

Request Body

```bash

`["dog1", "dog2", "dog3"]`

```

Response

```json

    {
      "match": "dog2"
    }
    
```

## 📍Location Endpoints

### `POST /locations`

Returns location info for up to 100 ZIP codes.

Request Body

```bash

`["60601", "90210"]`

```

Response

```bash

`Location[]`

```

#### `POST /locations/search`

Search ZIP codes using city, state, or geographic bounding box.

Request Body (any combination)

```json

  {
  "city": "Chicago",
  "states": ["IL"],
  "geoBoundingBox": {
    "top": 42.0,
    "left": -88.0,
    "bottom": 41.0,
    "right": -87.0
  },
  "size": 10
  }

```

Response

````json

  {
  "results": [[]],
  "total": "134"
  }

  
## 📦Data Models

```ts
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

interface Coordinates {
  lat: number;
  lon: number;
}

```

## ⚙️Usage Notes

```ts
fetch(url, {
  method: 'GET' | 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' }) // example payload
});

```

## Testing

This project currently does not include automated tests. Manual testing was conducted on multiple browsers and devices to verify core functionality and responsive design.

## Contact

Created by Zachary Baca
[GitHub](https://github.com/zacharybaca) | [LinkedIn](https://www.linkedin.com/in/zacharyjordanbaca) | [Portfolio](https://www.zachary-baca.dev)

## License

This project is part of a technical interview assignment and is not intended for production use or commercial distribution.

Built with ❤️ for dogs and clean code.
