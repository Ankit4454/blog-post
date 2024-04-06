

# Blog Post Tagging System API
This API documentation provides information on endpoints and operations for managing blog posts and tags within the blog post tagging system.

## Installation

Clone the project and run following commands.

```bash
  cd blog-post
  npm install
  npm start
```
Start the server at http://localhost:8000.


## User

The User API allows users to register, login, and manage their profiles.

### SignUp

Allows users to register by providing their name, email, and password.

- Method: POST
- Endpoint: /api/users/signup
- Request Body:
  - name (string): The name of the user.
  - email (string): The email address of the user.
  - password (string): The password for the user account.
- Response:
  - 201 Created: User registered successfully.
  - 400 Bad Request: Invalid request body or missing required fields.
  - 409 Conflict: User already exists.
  - 500 Internal Server Error: Server encountered an unexpected condition.

### SignIn

Allows users to log in by providing their email and password.

- Method: POST
- Endpoint: /api/users/signin
- Request Body:
  - email (string): The email address of the user.
  - password (string): The password for the user account.
- Response:
  - 200 OK: User logged in successfully.
  - 400 Bad Request: Invalid request body or missing required fields.
  - 401 Unauthorized: Invalid credentials or user not found.
  - 500 Internal Server Error: Server encountered an unexpected condition.

## Post

The Blog Post API provides endpoints for managing blog posts.

### Create

Allows authenticated users to create a new post.

- Method: POST
- Endpoint: /api/posts/create
- Authorization: Bearer Token (JWT)
- Request Body:
  - title (string): The title of the post.
  - content (string): The content of the post.
- Response:
  - 201 Created: Post created successfully.
  - 400 Bad Request: Invalid request body or missing required fields.
  - 401 Unauthorized: Invalid or missing token.
  - 500 Internal Server Error: Server encountered an unexpected condition.

### Update

Allows authenticated users to update their own posts.

- Method: POST
- Endpoint: /api/posts/update
- Authorization: Bearer Token (JWT)
- Request Body:
  - title (string): The new title of the post.
  - content (string): The new content of the post.
  - id (string): The ID of the post to update.
- Response:
  - 200 OK: Post updated successfully.
  - 400 Bad Request: Invalid request body or missing required fields.
  - 401 Unauthorized: Invalid or missing token.
  - 404 Not Found: Post not found or user not authorized to update.
  - 500 Internal Server Error: Server encountered an unexpected condition.

### Delete

Allows authenticated admin to delete posts.

- Method: POST
- Endpoint: /api/posts/delete/:id
- Authorization: Bearer Token (JWT)
- Request Parameters:
  - id (string): The ID of the post to delete.
- Response:
  - 200 OK: Post deleted successfully.
  - 401 Unauthorized: Invalid or missing token.
  - 404 Not Found: Post not found or user not authorized to delete.
  - 500 Internal Server Error: Server encountered an unexpected condition.

### Search

Allows users to fetch posts by associated tag name.

- Method: GET
- Endpoint: /api/posts/search/:tagName
- Request Parameters:
  - tagName (string): Search posts by associated tag name.
- Response:
  - 200 OK: Posts associated with tag.
  - 500 Internal Server Error: Server encountered an unexpected condition.

### Filter

Allows users to filter posts by various criteria.

- Method: GET
- Endpoint: /api/posts/filter
- Request Body:
  - startDate (string): Filter start date for posts.
  - endDate (string): Filter end date for posts.
  - authorName (string): Filter by authorName for posts.
  - tags (string): The tags separated by "," for posts.
- Response:
  - 200 OK: Filtered posts.
  - 500 Internal Server Error: Server encountered an unexpected condition.

### All posts

Allows users to fetch all posts.

- Method: GET
- Endpoint: /api/posts
- Response:
  - 200 OK: All posts.
  - 500 Internal Server Error: Server encountered an unexpected condition.

## Tag

The Tag API provides endpoints for managing tags associated with blog posts.

### Create

Allows authenticated users to create a new tag for a particular post.

- Method: POST
- Endpoint: /api/tags/create
- Authorization: Bearer Token (JWT)
- Request Body:
  - tagName (string): The name of the tag.
  - postId (string): The ID of the post.
- Response:
  - 201 Created: Tag created successfully.
  - 400 Bad Request: Invalid request body or missing required fields.
  - 401 Unauthorized: Invalid or missing token.
  - 500 Internal Server Error: Server encountered an unexpected condition.

### Update

Allows authenticated users to update existing tags.

- Method: POST
- Endpoint: /api/tags/update
- Authorization: Bearer Token (JWT)
- Request Body:
  - tagName (string): The new name of the tag.
  - id (string): The ID of the tag to update.
- Response:
  - 200 OK: Tag updated successfully.
  - 400 Bad Request: Invalid request body or missing required fields.
  - 401 Unauthorized: Invalid or missing token.
  - 404 Not Found: Tag not found or user not authorized to update.
  - 500 Internal Server Error: Server encountered an unexpected condition.

### Delete

Allows authenticated users to delete their own tags.

- Method: POST
- Endpoint: /api/tags/delete/:id
- Authorization: Bearer Token (JWT)
- Request Parameters:
  - id (string): The ID of the tag to delete.
- Response:
  - 200 OK: Tag deleted successfully.
  - 401 Unauthorized: Invalid or missing token.
  - 404 Not Found: Tag not found or user not authorized to delete.
  - 500 Internal Server Error: Server encountered an unexpected condition.


## Tech Stack

![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

![expressjs](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

![sqlite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

![seuelizejs](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)

![jwt](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)