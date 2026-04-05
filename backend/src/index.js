const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const categoryRoutes = require('./routes/categoryRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); 

app.use('/api/categories', categoryRoutes);
app.use('/api/tasks', taskRoutes);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API TaskFlow running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app in case tests or other modules require it.
module.exports = app;
