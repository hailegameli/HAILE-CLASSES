const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = [
    // Mock user data; replace with your actual user database
    { username: 'testuser', password: bcrypt.hashSync('testpassword', 8) }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = users.find(u => u.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        // Generate token (optional)
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
