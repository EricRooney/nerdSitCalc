const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const fs = require("fs");

//
//
// app.get('/', (req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end("Hello, person?")
// })
//
// app.get('/getUser', (req, res) => {
//     // First read existing users.
//     fs.readFile( __dirname + "/" + "users.json", 'utf8', (err, data) => {
//         data = JSON.parse( data )
//         res.end( JSON.stringify(data))
//     })
// })

const jsonParser = bodyParser.json()

app.post('/addUser', jsonParser, (req, res) => {


    const readData =fs.readFileSync( __dirname + "/" + "users.json", 'utf8' )


    const data = JSON.parse( readData );
    console.log(data)

    data['users'].push(req.body.user)

    console.log(data)

    fs.writeFileSync("users.json", JSON.stringify(data))


    res.end( JSON.stringify(data) );

})

const server = app.listen(6666, () => {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})