// for asynchronous file reading
const fsPromises = require('fs').promises;
const { XMLParser } = require("fast-xml-parser");

const XMLParserOptions = {
    attributeNamePrefix: "",
    //attrNodeName: false,
    //textNodeName : "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
};

const parser = new XMLParser(XMLParserOptions);

const parseAndSendGpx = async (filePath) => {
    return await fsPromises.readFile(filePath, 'utf8')
        .then((XMLdata) => {
            let jObj = parser.parse(XMLdata);
            // console.log(jObj.gpx.trk.trkseg)
            let myarr2 = [];

            for (pt of jObj.gpx.trk.trkseg.trkpt) {
                myarr2.push([pt.lat, pt.lon]);
            }

            // console.log("myarr2: ", myarr2);
            return myarr2;


        })
        .catch((err) => {
            console.error("error reading gpx: ", err);
            return [];
        });
}

module.exports = { parseAndSendGpx };