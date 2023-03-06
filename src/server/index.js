const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const app = express()
//console.log(`Your API key is ${process.env.API_KEY}`);

app.use(express.static('dist'))

//console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
   // console.log('Example app listening on port 8080!')
})



app.get('/getKeys', getAPIKeys)

function getAPIKeys(req, res) {
    const obj = { key: process.env.API_KEY, key2: process.env.pix_KEY }
    res.send(obj)
}

module.exports = app
