const express = require('express');


const session = require('express-session');
var cors = require('cors');

const app = express();
app.use(cors());
const port = 8080;

const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

const options = {
  attributeNamePrefix: "",
  //attrNodeName: false,
  //textNodeName : "#text",
  ignoreAttributes: false,
  ignoreNameSpace: false,
};

const parser = new XMLParser(options);

app.use(session({ secret: 'keybo#$%SFTHHET@#435tihuard cat', cookie: { maxAge: 60 * 60 * 24 * 1000 } }))
// to make session user variable available everywhere
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

// parsing the incoming data
app.use(express.urlencoded({ extended: true }));

// serving public file
// app.use(express.static(__dirname));

const fs = require('fs');

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

app.get('/', function (req, res) {
  // TODO, to be decided

})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});