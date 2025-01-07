# Finconecta Frontend Engineer Assessment - MERN Stack Implementation

This project is a full-stack web application built using the MERN (MongoDB, Express.js, React, Node.js) stack, created as part of the Finconecta Frontend Engineer Assessment. It demonstrates proficiency in front-end and back-end development, API integration, and database interaction.

## Project Overview

The application manages a list of items, allowing users to:

*   View a list of items.
*   Add new items.
*   Remove existing items.

This project is structured as a monorepo, with separate `client` (frontend) and `server` (backend) directories.

## Technologies Used

*   **Front-End (client):**
    *   React
    *   React Router
    *   HTML
    *   CSS
    *   JavaScript
*   **Back-End (server):**
    *   Node.js
    *   Express.js
    *   MongoDB
    *   Mongoose (ODM for MongoDB)
    *   JSON Web Tokens (JWT) for authentication (if implemented)
*   **Other:**
    *   npm or yarn (Package Manager)
    *   Git (Version Control)

## Folder Structure
```plaintext
finconecta/
├── client/        (React frontend)
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── ...
│   │   ├── pages/
│   │   │   ├── ...
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── package.json      (Frontend dependencies)
│   ├── package-lock.json (Frontend lockfile)
│   └── ...
├── server/        (Node.js/Express backend)
│   ├── models/
│   │   ├── productModel.js (Example)
│   │   ├── userModel.js (Example)
│   ├── routes/
│   │   ├── productRoutes.js (Example)
│   │   ├── userRoutes.js (Example)
│   ├── config/
│   │   ├── db.js (Database connection)
│   ├── .env            (Backend environment variables)
│   ├── authServer.js (Authentication logic)
│   ├── server.js       (Main server file)
│   ├── package.json      (Backend dependencies)
│   ├── package-lock.json (Backend lockfile)
│   └── ...
├── .gitignore         (Root .gitignore)
├── README.md
└── Frontend Engineer Assessment.pdf (Original assessment document)
```

## Setup and Installation

1.  **Clone the repository:** `git clone https://github.com/slaguna17/finconectaSergioLaguna`
2.  **Navigate to the project directory:** `cd React`
3.  **Install backend dependencies:**
    *   `cd server`
    *   `npm install` or `yarn`
4.  **Install frontend dependencies:**
    *   `cd ../client` (or `cd ../` then `cd client`)
    *   `npm install` or `yarn`

## Running the Application

1.  **Start the backend server:**
    *   `cd server`
    *   `npm start` or `yarn start` (or `npm run dev` if you have a dev script)
2.  **Start the frontend development server (in a separate terminal):**
    *   `cd client`
    *   `npm start` or `yarn start`

The frontend application will typically be available at `http://localhost:3000`, and the backend API will be running on a different port (usually `http://localhost:5000` or similar, check your backend configuration).

## API Endpoints (If implemented)

*(Document your API endpoints here, for example):*

*   `GET /api/products`: Retrieves all products.
*   `POST /api/products`: Creates a new product.
*   `DELETE /api/products/:id`: Deletes a product by ID.
*   `/api/users`: User related routes
    *   `POST /api/users/register`: Registers a new user
    *   `POST /api/users/login`: Login a user

## Bonus Features (Implemented if applicable)

*   **Authentication (JWT):** Secure API endpoints using JSON Web Tokens.
*   **State Management (Redux or Context API):** Centralized state management for the frontend.
*   **Real-time updates (WebSockets/Socket.io):** For live updates or a chat feature.

## Further Improvements

*   Implement proper error handling and input validation.
*   Add unit and integration tests.
*   Improve UI/UX.
*   Implement more robust authentication and authorization.

## Conclusion

This project demonstrates a functional MERN stack application that addresses the core requirements of the Finconecta Frontend Engineer Assessment. It showcases skills in front-end development with React, back-end development with Node.js and Express, database interaction with MongoDB and Mongoose, and API design.

## Contact

Sergio Laguna - slaguna17@gmail.com