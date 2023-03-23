const http = require('http')
http.get('http://localhost:3000/todos/1', (res) => res.pipe(process.stdout))