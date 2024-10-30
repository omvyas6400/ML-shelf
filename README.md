# ML Model Management - Frontend

This project is the frontend for the ML Model Management service, built with React. It connects to the backend API (implemented in Spring Boot) to allow users to manage machine learning models, including creating, viewing, and updating models. The frontend also handles user authentication and authorization, displaying relevant information based on user roles.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contact](#contact)

## Getting Started

### Prerequisites

- **Node.js** and **npm** (or **yarn**) installed
- Ensure that the backend API is running, and update the API base URL in the frontend configuration if needed.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ml-model-management-frontend.git
   cd ml-model-management-frontend
   
2. **Install dependencies:**

```bash
npm install
# or
yarn install
```
Start the development server:

```bash
npm start
# or
yarn start
```
The application will run on http://localhost:3000.

### Project Structure
```plaintext
src
├── api.js                 # API calls to the backend
├── App.css                # Global CSS styles
├── App.js                 # Main application component
├── App.test.js            # App component tests
├── AppRoutes.js           # Application routes and route protection
├── Forbidden.js           # Component for displaying access restriction message
├── i18n.js                # Internationalization configuration
├── index.css              # Additional global styles
├── index.js               # Entry point for React application
├── Login.js               # Login page component
├── ModelCreate.js         # Component for creating new models
├── ModelDetail.js         # Component for displaying model details
├── ModelList.js           # Component for listing models
├── navigation.js          # Navigation component and links
├── reportWebVitals.js     # Performance reporting
├── setupTests.js          # Test setup with Jest and React Testing Library
└── Signup.js              # Signup page component
```
### Key Files

_api.js:_ 

Contains methods to interact with the backend API.

_App.js:_ 

Main component that includes routing and layout.

_AppRoutes.js:_ 

Defines application routes and protects them based on user authentication.

_Login.js & Signup.js:_ 

Components for user authentication.

_ModelList.js, ModelCreate.js, ModelDetail.js:_ 

Components for displaying, creating, and managing ML models.

_Forbidden.js:_ 

Component to display when a user accesses a restricted page.

### Available Scripts

In the project directory, you can run:

```bash
npm start
```
Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.
```bash
npm test
```
Launches the test runner in interactive watch mode. Use this to test components and functions in the application.
```bash
npm run build
```
Builds the app for production to the build folder. It bundles React in production mode and optimizes the build for the best performance.
```bash
npm run eject
```
Note: This is a one-way operation. Ejecting provides full access to the configuration files but removes the abstracted setup.

### Configuration
Configuration, such as the API base URL, can be adjusted in api.js or .env files if needed. To set the backend API URL, update the relevant constant in api.js or add an .env file with the following:

```plaintext
REACT_APP_API_BASE_URL=http://localhost:8080
```
Ensure the backend API is running and accessible at the specified URL.

### Technologies Used

* React - Frontend library for building the UI
* React Router - For managing navigation and routes within the app
* Axios - For making HTTP requests to the backend API
* Jest & React Testing Library - For unit and integration testing
* i18next - For internationalization support

### License
This project is licensed under the MIT License. See the LICENSE file for more details.

### Contact
For more information, please contact ekincan@casim.net