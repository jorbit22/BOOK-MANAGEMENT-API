# Book Management API

This is a Book Management API built with Node.js, Express, TypeScript, and MongoDB. The API allows you to perform CRUD operations on books, including creating, reading, updating, and deleting books. It also supports uploading and updating book cover images.

## Table of Contents
- [Project Setup and Installation](#project-setup-and-installation)
- [API Endpoints](#api-endpoints)
  - [Create a Book](#create-a-book)
  - [Get All Books](#get-all-books)
  - [Get a Book by ID](#get-a-book-by-id)
  - [Update a Book](#update-a-book)
  - [Delete a Book](#delete-a-book)
  - [Update Book Cover Image](#update-book-cover-image)
- [Running the Application](#running-the-application)
- [Testing the Endpoints](#testing-the-endpoints)

## Project Setup and Installation

1. **Clone the repository**:
    ```
    git clone https://github.com/jorbit22/BOOK-MANAGEMENT-API.git
    cd book-management-api
    ```

2. **Install dependencies**:
    ```
    npm install
    ```

3. **Environment variables**: Create a `.env` file in the root directory and add the following environment variables:
    ```
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    ```

## API Endpoints

### Create a Book
- **URL**: `/books`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "publishedDate": "YYYY-MM-DD",
      "ISBN": "1234567890123"
    }
    ```
- **Response**:
    - **201 Created**: 
      ```json
      {
        "_id": "book_id",
        "title": "Book Title",
        "author": "Author Name",
        "publishedDate": "YYYY-MM-DDT00:00:00.000Z",
        "ISBN": "1234567890123",
        "coverImage": null
      }
      ```

### Get All Books
- **URL**: `/books`
- **Method**: `GET`
- **Response**:
    - **200 OK**:
      ```json
      [
        {
          "_id": "book_id",
          "title": "Book Title",
          "author": "Author Name",
          "publishedDate": "YYYY-MM-DDT00:00:00.000Z",
          "ISBN": "1234567890123",
          "coverImage": "path_to_image"
        }
      ]
      ```

### Get a Book by ID
- **URL**: `/books/:id`
- **Method**: `GET`
- **Response**:
    - **200 OK**:
      ```json
      {
        "_id": "book_id",
        "title": "Book Title",
        "author": "Author Name",
        "publishedDate": "YYYY-MM-DDT00:00:00.000Z",
        "ISBN": "1234567890123",
        "coverImage": "path_to_image"
      }
      ```
    - **404 Not Found**:
      ```json
      {
        "error": "Book not found"
      }
      ```

### Update a Book
- **URL**: `/books/:id`
- **Method**: `PUT`
- **Request Body** (any combination of the following fields):
    ```json
    {
      "title": "Updated Book Title",
      "author": "Updated Author Name",
      "publishedDate": "YYYY-MM-DD",
      "ISBN": "1234567890123"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "_id": "book_id",
        "title": "Updated Book Title",
        "author": "Updated Author Name",
        "publishedDate": "YYYY-MM-DDT00:00:00.000Z",
        "ISBN": "1234567890123",
        "coverImage": "path_to_image"
      }
      ```
    - **404 Not Found**:
      ```json
      {
        "error": "Book not found"
      }
      ```

### Delete a Book
- **URL**: `/books/:id`
- **Method**: `DELETE`
- **Response**:
    - **200 OK**:
      ```json
      {
        "message": "Book deleted successfully"
      }
      ```
    - **404 Not Found**:
      ```json
      {
        "error": "Book not found"
      }
      ```

### Update Book Cover Image
- **URL**: `/books/cover-image/:id`
- **Method**: `PATCH`
- **Request**: Form data with file attached under the key `coverImage`
- **Response**:
    - **200 OK**:
      ```json
      {
        "_id": "book_id",
        "title": "Book Title",
        "author": "Author Name",
        "publishedDate": "YYYY-MM-DDT00:00:00.000Z",
        "ISBN": "1234567890123",
        "coverImage": "path_to_image"
      }
      ```
    - **404 Not Found**:
      ```json
      {
        "error": "Book not found"
      }
      ```

## Running the Application

1. **Start the server**:
    ```
    npm start
    ```
    The server will start on the port specified in the `.env` file.

2. **Access the API**:
    Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to interact with the API at `http://localhost:5000`.

## Testing the Endpoints

1. **Run the tests**:
    ```
    npm test
    ```

## Additional Information

- **Uploads**: Book cover images are stored in the `uploads` directory.
- **Database**: Ensure MongoDB is installed and running. Update the `MONGODB_URI` in the `.env` file with your MongoDB connection string.
