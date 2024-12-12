const http = require('http');
const port = 3000;

const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}
);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}
);
