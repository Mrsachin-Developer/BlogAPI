📘 Day 6 – Blog API (User–Post Relationship)


📌 Overview

Day 6 focuses on building a Blog API that introduces public + private data, user–post relationships, and authorization rules.
Unlike previous days where data was user-only, this project exposes public content while still protecting write operations.

This simulates real-world platforms like Medium, Dev.to, Hashnode.

🎯 Goals of Day 6

Implement User ↔ Blog relationship

Separate public read & private write

Enforce author-only update/delete

Use JWT middleware for protected routes

Learn MongoDB populate

🧱 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

bcrypt

Postman (API testing)

📂 Project Structure
src/
│
├── controllers/
│   ├── blog.controller.js
│   └── auth.controller.js
│
├── models/
│   ├── user.model.js
│   └── blog.model.js
│
├── routes/
│   ├── user.route.js
│   └── blog.route.js
│
├── middlewares/
│   └── usermiddleware.middleware.js
│
├── db/
│   └── db.js
│
└── index.js

🧠 Core Features
🔐 Authentication

User Signup & Login

Password hashing using bcrypt

JWT-based authentication

Token passed using Bearer Authorization

✍️ Blog Management

Create blog (authenticated users only)

Update blog (author only)

Delete blog (author only)

Publish / unpublish blogs

🌍 Public Access

Anyone can fetch published blogs

Uses populate() to show author info (username, email)

🔒 Authorization Rules
Action	Access
Read published blogs	Public
Create blog	Logged-in user
Update blog	Blog author only
Delete blog	Blog author only
🛣 API Endpoints
🔑 Auth
Method	Endpoint
POST	/api/v1/user/signup
POST	/api/v1/user/login
📝 Blog
Method	Endpoint	Access
POST	/api/v1/blog/blogs	Protected
GET	/api/v1/blog/blogs	Public
PUT	/api/v1/blog/blogs/:blogId	Author only
DELETE	/api/v1/blog/blogs/:blogId	Author only
🔐 Authorization Header (Postman)
Authorization: Bearer <JWT_TOKEN>

🧠 Key Concepts Learned

JWT middleware flow

req.user pattern

MongoDB ObjectId relationships

populate() for joining collections

Public vs private APIs

Ownership-based authorization

REST API design standards

🚀 Outcome

By the end of Day 6, the project supports:

Secure authentication

Public content access

Author-controlled content

Scalable backend structure

This is a real-world backend pattern, not a demo app.
