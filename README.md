# E-commerce Cart and Order Summary Application

This project is a full-stack e-commerce cart application with a **React** frontend and a **Node.js/Express** backend. The frontend allows users to view products, add them to their cart, and proceed to an order summary page. Cart data is saved in **localStorage** for persistence. The backend is used to serve product data.

## Table of Contents
- [Installation](#installation)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)



## Installation

### Clone the Repository

1. Clone the repository:
   ```bash
   git clone https://github.com/ChaimaZahani/Chaima_test
2. Navigate into the project directory:
```bash
   cd Chaima_test

## Frontend Setup
1. Navigate to the frontend directory:
  ```bash
    cd ecommerce-frontend

2. Install the necessary dependencies:
  ```bash
  npm install

3. Start the React development server:
  ```bash
npm run  start

The frontend should now be running on http://localhost:3000.

## Backend Setup
1. Navigate to the backend directory:

```bash
cd ecommerce-backend

2. Install the necessary dependencies:

```bash
npm install

3. Start the Node.js/Express server:

```bash
npm start

The backend server should now be running on http://localhost:5000.

## Environment Variables
For the application to work correctly, you need to set up the following environment variables in a .env file in the root directory of your backend:
```bash
MONGODB_URI=mongodb://127.0.0.1:27017/e_commerce
JWT_SECRET=jwt_secret

MONGODB_URI: This is the URI for your local MongoDB instance (make sure MongoDB is running on your machine).
JWT_SECRET: This secret is used for creating and verifying JSON Web Tokens (JWT) in the application.

To create the .env file, follow these steps:

1. In the backend directory, create a .env file.
2. Add the environment variables listed above.
3. After setting up the .env file, restart the backend server to apply the changes.