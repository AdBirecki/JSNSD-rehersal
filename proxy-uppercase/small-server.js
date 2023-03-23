const http = require('http')

const port = process.env.PORT || 5200
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world to be uppercased')
})

server.listen(port, () => {
    const { port } = server.address()
    console.log(`Mock server listening on localhost:` + port)
});