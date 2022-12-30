const express = require('express');
const cors = require('cors');
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
const fs = require('fs');
// for asynchronous file reading
const fsPromises = require('fs').promises;
const fileUpload = require("express-fileupload");
const path = require("path");

const { loginUser, registerUser } = require('./controllers/authController');
const { updateUser } = require('./controllers/usersController');
const { parseAndSendGpx } = require('./controllers/tracksController');

const app = express();
app.use(cors());
app.use(express.json());

const port = 8080;

const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // to suppress DeprecationWarning
require('dotenv').config();

const database = process.env.DATABASE_URL;

/* mongoose.connect(database, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}) */
mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(connection => {
    console.log(`database is successful`);
  })
  .catch(err => {
    console.log(`database connection error: ${err.message}`);
  });

// parsing the incoming data
app.use(express.urlencoded({ extended: true }));

// app login and register
app.post('/login', loginUser);
app.post('/register', registerUser);
app.put('/users/:id', updateUser);

// parse and send the default gpx file
app.get('/tracks/1', async (req, res) => {
  const parsedGpx = await parseAndSendGpx('tracks/trail.gpx');
  console.log("single parsedGpx: ", parsedGpx);
  res.json(parsedGpx);
  res.end();
});

// parse and send to the client all gpx files in the folder "tracks"
app.get('/tracks/all', async (req, res) => {
  const gpxFilesArray = [];

  const files = await fsPromises.readdir('tracks')
    .catch(err => {
      console.log("error reading tracks folder: ", err);
      return res.status(400).json({ message: 'Error reading tracks folder.' });
    });

  for (const file of files) {
    console.log(file);
    const parsedGpxFile = await parseAndSendGpx('tracks/' + file);
    gpxFilesArray.push(parsedGpxFile);
    console.log("gpxFilesArray length: ", gpxFilesArray.length);
  };

  console.log("gpxFilesArray FINAL length: ", gpxFilesArray.length);

  return res.json(gpxFilesArray);
});

// save file(s) uploaded to the server in the folder "tracks",
// then parse them and send back to the client
app.post('/tracks', fileUpload({ createParentPath: true }),
  async (req, res) => {

    // 1) save files to the server

    if (!req.files) {
      return res.status(400).json({ status: "error", message: "No files were uploaded" });
    }

    const files = req.files;
    console.log(files);

    Object.keys(files).forEach(key => {
      const filepath = path.join(__dirname, 'tracks', files[key].name);
      files[key].mv(filepath, (err) => {
        if (err) {
          return res.status(500).json({ status: "error", message: err });
        }
      });
    });
    console.log('files uploaded successfully');

    // 2) parse and send back to the client

    const userUploadedGpxFiles = [];

    for (const key of Object.keys(files)) {
      // reminder: key === files[key].name because of the file upload form in the frontend (GlobalMap.js), may change in the future
      console.log("key: ", key);
      console.log("files[key].name: ", files[key].name);
      const parsedGpxFile = await parseAndSendGpx('tracks/' + files[key].name);
      userUploadedGpxFiles.push(parsedGpxFile);
      console.log("userUploadedGpxFiles length: ", userUploadedGpxFiles.length);
    };
    console.log("userUploadedGpxFiles FINAL length: ", userUploadedGpxFiles.length);

    return res.json(userUploadedGpxFiles);

  });

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
  console.log("database is ", database);
});