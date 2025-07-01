const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

const port = process.env.PORT || 3000;

// internal imports
const authRouter = require("./router/authRouter");
const userrouter = require("./router/userRouter");
const messageRouter = require("./router/messageRouter");
const chatRouter = require("./router/chatRouter");
const cookieParser = require("cookie-parser");
const isLoggedIn = require("./middlewares/isLoggedIn");

// Allow requests from frontend
app.use(
    cors({
        origin: "http://localhost:5173", // or use '*' to allow all origins (not recommended for production)
        credentials: true, // if you are sending cookies or auth headers
    })
);

// database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log("database connection successful"))
    .catch((err) => console.log(err));

// request parser
app.use(express.json());

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes

app.get("/", (req, res) => {
    res.json({ message: "Welcome to chat app" });
});
app.use("/auth", authRouter);
app.use("/user", userrouter);
app.use("/chat", chatRouter(io)); // this is conversation route
app.use("/message", messageRouter);
app.post("/api/test", (req, res) => {
    res.json({ message: "Working!" });
});

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
