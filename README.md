# Uthp RentHouse METN001

Welcome to the Uthp RentHouse METN001 repository, a platform built using Express with CRUD features, adhering to best practices. This platform helps users find suitable houses based on their requirements and facilitates communication with the house owner.

## Technology used

Here uses a number libraries to work:

- [NodeJs]
- [ExpressJs]
- [Cors]
- [Mongoose]
- [Bcrypt]
- [morgan]
- [multer]
- [express-validator]
- [ejs]
- [express-session]

## Admin Responsibilities
- Create districts
- Define areas within districts
- Categorize properties
- Access lists of house owners, their properties, and transactions

Here are some images showcasing system admin activities:
![Admin Activity](./files/Screenshot%202023-10-01%20221220.png)

## House Owner Responsibilities
- House owners need to register first.
- Create rental properties, which are displayed on the platform's front page. Owners can also update or deactivate their properties.
- When a potential tenant calls and confirms interest in a property, the house owner can create a tenant account for them.
- Record any transactions between the house owner and the tenant in the payment system.

Here are some images showcasing house owner activities:
![House Owner Activity 4](./files/Screenshot%202023-10-01%20221138.png)
![House Owner Activity 1](./files/Screenshot%202023-10-01%20212837.png)
![House Owner Activity 2](./files/Screenshot%202023-10-01%20214652.png)
![House Owner Activity 3](./files/Screenshot%202023-10-01%20215012.png)
![House Owner Activity 4](./files/Screenshot%202023-10-01%20220834.png)
![House Owner Activity 4](./files/Screenshot%202023-10-01%20215113.png)
![House Owner Activity 4](./files/Screenshot%202023-10-01%20221046.png)


--
Before you begin, ensure you have met the following requirements:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- MongoDB

### Run this Project
   ```bash
   git clone https://github.com/saifakib/uthp-rentHouse-metn001.git
   cd uthp-rentHouse-metn001
   npm install
   ```
After you have create .env file in root directory, you can copy from .env.example file then
### Run
   ```bash
   npm start
   ```
