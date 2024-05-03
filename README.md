________________________________________
User Authentication, Management, and Messaging System
This repository contains the code for a user authentication, management, and messaging system built with Node.js, Express, PostgreSQL, Redis, Kafka, and bcrypt.
Features
•	User Authentication: Allows users to register, sign in, view profile, update profile, and delete account.
•	Messaging System: Enables users to send messages to each other with encryption and caching.
Technologies Used
•	Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
•	Express: A fast, unopinionated, minimalist web framework for Node.js.
•	PostgreSQL: A powerful, open-source object-relational database system.
•	Redis: An in-memory data structure store used for caching.
•	Kafka: A distributed event streaming platform.
•	bcrypt: A password hashing function for securing user passwords.
•	Session Management: Handled with express-session and stored in Redis for scalability.
Setup Instructions
1.	Clone the repository:

git clone https://github.com/jampalaPavan/ChatApplication.git
 
2.	Install dependencies:
cd https://github.com/jampalaPavan/ChatApplication.git
npm install
3.	Set up PostgreSQL and Redis on your local machine. Ensure PostgreSQL is running on port 5432 and Redis on port 6379.
4.	Create a .env file in the project root and add the following environment variables:
5.	PORT=3000
6.	PGUSER=postgres
7.	PGHOST=localhost
8.	PGDATABASE=postgres
9.	PGPASSWORD=root
10.	PGPORT=5432
11.	REDIS_HOST=localhost
12.	REDIS_PORT=6379
13.	SESSION_SECRET=uniqueSecretKey
PORT=3000 PGUSER=postgres PGHOST=localhost PGDATABASE=postgres PGPASSWORD=root PGPORT=5432 REDIS_HOST=localhost REDIS_PORT=6379 SESSION_SECRET=uniqueSecretKey 
14.	Run the server:
bash
npm startnpm start 
15.	Access the endpoints using a REST client like Postman or by making HTTP requests programmatically.
API Endpoints
User Authentication and Management
•	POST /register: Register a new user.
•	POST /signin: Sign in an existing user.
•	GET /profile/:id: Get user profile by ID.
•	PUT /profile/:id: Update user profile by ID.
•	DELETE /profile/:id: Delete user account by ID.
Messaging System
•	POST /messages: Send a message to another user.
For detailed usage examples and request/response formats, refer to the code and test cases.
Contributors
JAMPALA PAVAN
License
This project is licensed under the MIT License.

