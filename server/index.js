const express = require('express');
const cors = require('cors');
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

const { loginUser, registerUser } = require('./controllers/authController');
const { updateUser } = require('./controllers/usersController');

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

const XMLParserOptions = {
  attributeNamePrefix: "",
  //attrNodeName: false,
  //textNodeName : "#text",
  ignoreAttributes: false,
  ignoreNameSpace: false,
};

const parser = new XMLParser(XMLParserOptions);

// parsing the incoming data
app.use(express.urlencoded({ extended: true }));

// serving public file
const fs = require('fs');

// app login and register
app.post('/login', loginUser);
app.post('/register', registerUser);
app.put('/users/:id', updateUser);

// test
app.get('/mygeojson', function (req, res) {
  fs.readFile('gpx/trail.gpx', 'utf8', function (err, XMLdata) {

    let jObj = parser.parse(XMLdata);
    console.log(jObj.gpx.trk.trkseg)

    let myarr2 = []

    for (pt of jObj.gpx.trk.trkseg.trkpt)
      myarr2.push([pt.lat, pt.lon])


    geoj = {
      "type": "FeatureCollection",
      "features": [

        {
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            "coordinates": myarr2

          },
          "properties": {
            "prop0": "value0",
            "prop1": 0.0
          }
        }
      ]
    }

    // res.json(geoj);
    res.json(myarr2);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
  console.log("database is ", database);
});