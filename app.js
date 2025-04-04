const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Route par défaut : redirige vers /login.html
app.get('/', (req, res) => {
    res.redirect('/login.html');
});


// Routes
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

module.exports = app;
