const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000; // Default port is 3000, or use the port specified in the environment variable

http.createServer((req, res) => {
    let filePath = '.' + req.url; // Construct the file path based on the requested URL
    if (filePath === './') {
        filePath = './index.html'; // Serve index.html by default if no specific file is requested
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    }[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                // Server error
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            // Serve the file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });

}).listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
