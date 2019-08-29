const express = require('express');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express();

//connect db
connectDB();

// Init
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API Running');
});

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/tag', require('./routes/api/tag'));
app.use('/api/songs', require('./routes/api/songs'));
app.use('/api/pod', require('./routes/api/pod'));

app.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${PORT}`)
);
