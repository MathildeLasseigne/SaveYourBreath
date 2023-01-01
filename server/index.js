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

// test: parse and send the default gpx file
app.get('/tracks/1', async (req, res) => {
  const parsedGpx = await parseAndSendGpx('tracks/trail.gpx').catch(err => {
    console.log("error parsing gpx: ", err);
    return res.status(400).json({ message: 'Error parsing gpx.' });
  });
  console.log("single parsedGpx: ", parsedGpx);
  return res.status(200).json(parsedGpx);
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
    try {
      console.log("gpxFilesArray length: ", gpxFilesArray.length);
      console.log(file);
      const parsedGpxFile = await parseAndSendGpx('tracks/' + file);
      gpxFilesArray.push(parsedGpxFile);
    } catch (err) {
      console.log("a gpx file could not be parsed, err: ", err);
    }
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

    for (key of Object.keys(files)) {
      const filepath = path.join(__dirname, 'tracks', files[key].name);
      console.log("files[key]: ", files[key]);

      await fsPromises.writeFile(filepath, files[key].data)
        .catch(err => {
          console.log("error saving file to the server: ", err);
          return res.status(500).json({ message: "error uploading file to the server" });
        });
      // old synchronous version
      /* await files[key].mv(filepath, (err) => {
        if (err) {
          return res.status(500).json({ status: "error", message: err });
        }
      }); */
    };
    console.log('files uploaded successfully');

    // 2) parse and send back to the client

    const userUploadedGpxFiles = [];

    for (const key of Object.keys(files)) {
      // reminder: key === files[key].name because of the file upload form in the frontend (GlobalMap.js), may change in the future
      console.log("key: ", key);
      console.log("files[key].name: ", files[key].name);
      try {
        const parsedGpxFile = await parseAndSendGpx('tracks/' + files[key].name)
        userUploadedGpxFiles.push(parsedGpxFile);
        console.log("userUploadedGpxFiles length: ", userUploadedGpxFiles.length);
      } catch (err) {
        console.log("user uploaded something that wasn't a gpx file!");
        return res.status(400).json({ message: 'One of your file(s) was not a gpx file.' });
      };
    };
    console.log("userUploadedGpxFiles FINAL length: ", userUploadedGpxFiles.length);

    return res.json(userUploadedGpxFiles);

  });

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
  console.log("database is ", database);
});
