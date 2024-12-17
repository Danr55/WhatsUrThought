# WhatsUrThought

A simple social network API built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. This API allows users to create accounts, share thoughts, and interact with their friends by adding or removing them. Users can also react to thoughts, and thoughts can be updated or deleted.

## Table of Contents

- [Usage](#usage)
  - [API Routes](#api-routes)
  - [Testing with Insomnia](#testing-with-insomnia)
- [Technologies](#technologies)

### API Routes

The API provides the following routes:

### **/api/users**

- **GET** `/api/users`  
  Fetch all users.

- **GET** `/api/users/:userId`  
  Fetch a single user by its `_id` and populated thoughts and friends data.

- **POST** `/api/users`  
  Create a new user.

  **Request body:**
  ```json
  {
    "username": "lernantino",
    "email": "lernantino@gmail.com"
  }

  #### **Adding a User**

1. **Method**: `POST`
2. **URL**: `http://localhost:3001/api/users`
3. **Body** (JSON):
   ```json
   {
     "username": "lernantino",
     "email": "lernantino@gmail.com"
   }

### Adding a Thought

1. **Method**: `POST`
2. **URL**: `http://localhost:3001/api/thoughts`
3. **Body** (JSON):
   ```json
   {
     "thoughtText": "Here's a cool thought...",
     "username": "lernantino",
     "userId": "5edff358a0fcb779aa7b118b"
   }

### Removing a Friend

1. **Method**: `DELETE`
2. **URL**: `http://localhost:3001/api/users/:userId/friends/:friendId`
   Replace `:userId` with the ID of the user removing the friend and `:friendId` with the ID of the friend to be removed.

3. **Response** (Success - JSON):
   ```json
   {
     "_id": "60c72b2f9f1b2c001f8b4d80",
     "username": "lernantino",
     "email": "lernantino@gmail.com",
     "thoughts": [],
     "friends": []
   }

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript

## Contact 

Oscar Rendon

Code sourced with help ChatGPT

- github Link:https://github.com/Danr55/WhatsUrThought
- video Link1:https://drive.google.com/file/d/1oW5U6_dwRGuZaDV-xBtufVjxXzqKGvIX/view?usp=sharing
- video Link2:https://drive.google.com/file/d/1Tcg3-jBPGiQayobOs8jpF9xqC4ZGXMkq/view?usp=sharing
