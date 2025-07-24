"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(cors());
// 🔹 In-memory array to store names
const users = [];
// ✅ Route: Add a user
app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing name' });
    }
    users.push(name);
    res.json({ message: `User '${name}' added successfully.` });
});
// ✅ Route: Get all users
app.get('/users', (_req, res) => {
    res.json({ users });
});
app.get('/', (_req, res) => {
    res.json({
        message: 'Welcome! Try /ping, /sum (POST), or /greet?name=YourName'
    });
});
// Route 1: /ping
app.get('/ping', (_req, res) => {
    res.json({ message: 'I am alive' });
});
// Route 2: /sum
app.post('/sum', (req, res) => {
    const numbers = req.body.numbers;
    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: 'Invalid input. Expected an array of numbers.' });
    }
    const result = numbers.reduce((acc, curr) => acc + curr, 0);
    res.json({ sum: result });
});
// ✅ Route 3: /greet
app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.status(400).json({ error: 'Missing query parameter: name' });
    }
    res.json({ message: `Hello, ${name}!` });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
