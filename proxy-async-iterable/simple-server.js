'use strict'

const { PORT = 5000 } = process.env
const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('this is my simpel mock server')
}).listen(PORT, () => {
    const { port } = server.address()
    console.log('mock server is listening at:' + port)
})