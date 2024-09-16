const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {
    getProvinceList,
    getDistrict,
    getWards,
} = require('./location-services/location-controllers');
const server = express();
const PORT = 3000;

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({
    extended: true
}));

server.get('/', (req, res) => res.json({ message: 'Welcome!!!' }));
server.get('/provinces', getProvinceList);
server.get('/districts', getDistrict);
server.get('/wards', getWards);

server.listen(PORT, () => console.log(`
-----------------------------------------------------------------------
    API server running at: http://localhost:${PORT}
    Runtime environment: development
-----------------------------------------------------------------------
`));
