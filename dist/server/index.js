import { createServer } from 'http';



const HOSTNAME = 'localhost';
const PORT = 8000;



const server = createServer(function (req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
});



server.listen(PORT, HOSTNAME, () => console.log(`Server running on http://${HOSTNAME}:${PORT}/...`));
