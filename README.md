# Chat App API

This is a simple **Chat App API** built using **Node.js** and **Express.js**. It includes essential features like **Login**, **Signup**, and **Chat** functionality.

## Features

✅ User Signup
✅ User Login with JWT Authentication
✅ Real-time Chat System
✅ Secure Endpoints

---

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd chat-app-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file** in the root directory and add the following:

```
PORT=3000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

4. **Run the server**

```bash
npm start
```

The server will start at **`http://localhost:3000`**

---

## API Endpoints

### **Auth Routes**

#### **Signup**

**POST** `/api/auth/signup`

**Body Parameters:**

```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Response:**

```json
{
    "message": "User registered successfully!",
    "token": "<jwt-token>"
}
```

---

#### **Login**

**POST** `/api/auth/login`

**Body Parameters:**

```json
{
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Response:**

```json
{
    "message": "Login successful!",
    "token": "<jwt-token>"
}
```

---

### **Chat Routes**

#### **Send Message**

**POST** `/api/chat/send`

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Body Parameters:**

```json
{
    "receiverId": "654a3f9e2a3458b4f1a72cde",
    "message": "Hello there!"
}
```

**Response:**

```json
{
    "message": "Message sent successfully!"
}
```

---

#### **Get Chats**

**GET** `/api/chat`

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
[
    {
        "senderId": "123456",
        "receiverId": "654a3f9e2a3458b4f1a72cde",
        "message": "Hello!",
        "timestamp": "2024-01-01T12:00:00Z"
    }
]
```

---

## Technologies Used

-   **Node.js**
-   **Express.js**
-   **MongoDB**
-   **JWT (JSON Web Tokens)**

---

## License

This project is licensed under the **MIT License**.

---

## Author

👨‍💻 Developed by **Mahdi**
