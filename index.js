const express = require('express');
const bodyParser = require('body-parser');
const auth = require('@local/authentication');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

auth.init(app);

app.get('/secureData', auth.authenticationMiddleware, (req, res) => {
  res.json({ secure: true });
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
