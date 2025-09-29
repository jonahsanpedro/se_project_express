# What to wear

Full-Stack Web Developer | “WTWR” Project
Designed and implemented a full-stack web application for managing user profiles and clothing items with weather-based recommendations. Built a scalable, production-ready system incorporating both front-end and back-end development, authentication, and deployment.

Front-End Development: Developed a responsive React interface with modular components and state management. Implemented dynamic UI updates, modals for adding/editing items, profile management, and context-based user authentication. Integrated features such as conditional rendering for authorized users, likes/dislikes functionality, and real-time updates without page reloads.

Back-End Development: Designed and implemented a Node.js/Express server with RESTful API endpoints for users and clothing items. Created Mongoose schemas with validation, secure password hashing, and relational references between users and items. Built controllers for CRUD operations, including ownership-based access controls and likes/dislikes management.

Authentication & Security: Implemented JWT-based authentication, protected routes, and middleware for authorization. Added server-side validation and error handling to enforce data integrity and secure user actions. Ensured passwords were never exposed in API responses.

Database Management: Configured and connected MongoDB for persistent data storage. Used Mongoose to define schemas, enforce constraints, and validate user and item data (including URLs and weather enums).

Error Handling & Logging: Implemented centralized error handling with custom error classes, returning meaningful HTTP status codes (400, 401, 403, 404, 409, 500). Logged all requests and errors for debugging and monitoring purposes.

Testing & Deployment: Independently tested API endpoints using Postman and automated CI/CD validation with GitHub Actions. Deployed front-end and back-end to a remote server with HTTPS support and domain/subdomain integration. Ensured robust recovery after simulated crash tests.

Development Best Practices: Maintained code quality with ESLint (Airbnb style guide), Prettier, and structured modular architecture (routes, controllers, models, middlewares, utils). Configured hot-reloading for rapid development and implemented CORS for cross-origin requests.

Technologies & Tools: React, Node.js, Express, MongoDB, Mongoose, JWT, Celebrate, ESLint, Prettier, CORS, GitHub Actions, Postman, HTTPS deployment

# Project 12 - Express.js for WTWR Application

In this project we were instructed to build the server-side of our What to Wear project. It introduced express.js, the use of MongoDB, Postman as well as Github Actions. With MongoDB we created databases and were able to change objects in arrays if applicable. In Postman, we are able to test our code and learn to troubleshoot errors on our own. This is similar with the use of Github Actions as well.

Throughout this project we set up a backend Api, gained more practice on route handling, and database connection. The challenging parts of this project were making sure our controllers worked properly with correct syntax and application. Working through failures in Postman helped me to develop more comprehension on express.js and understanding how routes and controllers are tasked.

[GitHub Repository] https://github.com/jonahsanpedro/se_project_express

# Project 13

This sprint focused on implementing authentication and authorization. Adding on to our Project 12 we implemented these concepts as well as other new concepts. Similartly to our last project however we had to include new controllers and routes and apply authentication and an authorization middleware. We also learned to include validation to check if users and passwords matched in a database. Finally we made us of Postman and Github Actions to test our work.

Running Github Actions led to an error but it was stated in the project that we should remove the hard-coded user object. This was leading to an errors under test_endpoints and I will include the screenshot below.

![Hard-coded user object error](image-1.png)

[GitHub Repository] https://github.com/jonahsanpedro/se_project_express

# WTWR (What to Wear): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

# Project 15

This sprint introduced cloud deployment and expanded out knowledge on advanced middleware. We also were introduced to request validation in separate middlewares using joi, celebrate and validator while logging requets and errors with winston. This project was different from the others in the past as I deployed my first website on the web.

[Domain - Fontend] https://vheissu.jumpingcrab.com/
[Domain - Backend] https://api.vheissu.jumpingcrab.com/
