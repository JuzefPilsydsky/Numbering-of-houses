const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const buildingNumbers = 'buildingNumbers.txt';
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });

app.get('/', (req, res) => {
    console.log('req')
    fs.readFile(buildingNumbers,({encoding:'utf-8'}), (err, data) => {
    if(err) throw err;
    res.json({data: data.split('\n')})
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})