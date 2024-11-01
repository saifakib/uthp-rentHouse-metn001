# 🏠 Uthp RentHouse METN001

Welcome to **Uthp RentHouse METN001**! This modern rental property platform, built with Express.js, is designed to streamline the house-hunting experience by connecting property owners with potential tenants. Users can easily browse and communicate with property owners, while property owners manage listings and track tenant interactions.

---

## 🚀 Technology Stack

This project leverages a range of technologies to ensure a seamless and secure experience:

- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) for ODM
- **Middleware**: CORS, Morgan (logging), Multer (file uploads)
- **Security**: Bcrypt for password hashing
- **Validation**: Express Validator
- **Templating**: EJS (for server-side rendering)
- **Session Management**: Express Session
- **Docker**: Containerazation

## 📋 Features Overview

### 👤 Admin Dashboard
Admins have comprehensive control over the platform:
- **Manage Districts**: Create and organize districts and areas.
- **Property Categorization**: Define property types and categories.
- **Owner & Transaction Overview**: Access lists of house owners, properties, and transaction records.

#### Admin Activities
<p align="center">
   <img src="./files/Screenshot%202023-10-01%20221220.png" width="500px" alt="Admin Activity">
</p>

### 🏡 House Owner Capabilities
House owners can:
- **Register and List Properties**: Add properties to the platform.
- **Update or Deactivate Listings**: Easily modify or remove listings as needed.
- **Manage Tenant Accounts**: Create and manage tenant accounts after tenant confirmation.
- **Handle Transactions**: Keep track of rental payments and financial interactions.

#### House Owner Activities
<p align="center">
   <img src="./files/Screenshot%202023-10-01%20221138.png" width="500px" alt="House Owner Activity 1">
   <img src="./files/Screenshot%202023-10-01%20212837.png" width="500px" alt="House Owner Activity 2">
   <img src="./files/Screenshot%202023-10-01%20214652.png" width="500px" alt="House Owner Activity 3">
   <img src="./files/Screenshot%202023-10-01%20215012.png" width="500px" alt="House Owner Activity 4">
   <img src="./files/Screenshot%202023-10-01%20220834.png" width="500px" alt="House Owner Activity 5">
   <img src="./files/Screenshot%202023-10-01%20215113.png" width="500px" alt="House Owner Activity 6">
   <img src="./files/Screenshot%202023-10-01%20221046.png" width="500px" alt="House Owner Activity 7">
</p>

---

## 🛠️ Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Docker](https://www.docker.com/) (for Docker setup)

### Local Setup

**Clone the repository** and navigate into the project directory:
   ```bash
   git clone https://github.com/saifakib/uthp-rentHouse-metn001.git
   cd uthp-rentHouse-metn001
   ```
**Install dependencies**
```bash
   npm install
```
Create a .env file in the root directory using .env.example as a template. Configure necessary environment variables.
**Run this application**
   ```bash
   npm start
   ```


### Running with Docker
For a Docker-based setup:

**Build and run** Build and run:
   ```bash
   docker-compose up --build -d
   ```


