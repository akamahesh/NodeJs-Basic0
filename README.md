# NodeJs-Basic0

Run it by : npm run server

Steps Followed:

6. Install Dependencies @ Basic Express setup

$npm init
$npm i express-validator bcryptjs config gravatar jsonwebtoken mongoose request
\$npm i -D nodemon concurrently

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// package.json

"start":"node server",
"server":"nodemon server"

crate mongodb cluster

mongodb+srv://admin:admin@cluster0-uv0so.mongodb.net/test?retryWrites=true&w=majority
