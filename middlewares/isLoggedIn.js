const jwt = require("jsonwebtoken");

// const isLoggedIn = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'User Not Loggged In' });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }
// };

const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "User Not Logged In" });
    }

    let token = authHeader.split(" ")[1];
    if (token && token.startsWith("s:")) {
        token = token.slice(2);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired" });
        }
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = isLoggedIn;
