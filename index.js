const http = require('http');
const Icon = require('./src/icon');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
	if (req.url.match(/favicon/)) {
		res.end('');
		return;
	}

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	const icon = new Icon('test');
	res.end(icon.getSvg());
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
