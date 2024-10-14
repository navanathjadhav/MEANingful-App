# Real-World MEAN Application

This application showcases various concepts from the book _"NODE.JS EXPRESS IN REAL WORLD"_ implemented in a real-world app. It demonstrates building a full-stack web application using the **MEAN Stack** (MongoDB, Express, Angular, and Node.js).

## Key Features

This application includes the following features and concepts:

- **Node.js** and **Express.js** for the backend server
- **MongoDB** as the database for storing and retrieving data
- **Angular** for the front-end framework to build the user interface
- **RESTful APIs** for communication between the front-end and back-end
- **User Authentication** with JWT (JSON Web Tokens)
- **Caching** using **Redis** for performance optimization
- **RabbitMQ** for message queue implementation (for background tasks and notifications)
- **Real-time features** using Socket.IO

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/package-manager) (v14+)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/)
- [Redis](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)
- [RabbitMQ](https://www.rabbitmq.com/docs/download/)
- [Angular CLI](https://angular.io/cli)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/navanathjadhav/MEANingful-App.git
   cd MEANingful-App
   ```

2. **Backend Setup (Node.js + Express.js)**

   - Install dependencies:

   ```bash
    cd server
    npm install
   ```

   - Create a .env file by referring .env.example in the backend directory and configure your environment variables (MongoDB URI, Redis URL, JWT Secret etc.).

   - Run the backend:

   ```bash
   npm run dev
   ```

3. **Frontend Setup (Angular)**

   - Open new terminal window and go to project directory
   - Install dependencies:

   ```bash
    cd client
    npm install
   ```

   - Run the frontend:

   ```bash
   npm start
   ```

4. **Set Up MongoDB, Redis, and RabbitMQ**

   Make sure MongoDB, PostgreSQL, Redis, and RabbitMQ are running on your local machine or configure the connection to your cloud-hosted services.

### Usage

- Open your browser and navigate to http://localhost:4200 to access the frontend.
- The backend server runs at http://localhost:4000.

### Structure

- Backend: All server-side logic resides in the server/ folder.
- Frontend: Angular front-end code is located in the client/ folder.
- Database: MongoDB for NoSQL data handling.

### Contributions

Feel free to open issues or submit pull requests if you have suggestions or want to improve the app.
