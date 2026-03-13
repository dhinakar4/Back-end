let server = require('http');
let fs= require('fs');

let app = server.createServer((req, res) => {

    fs.writeFile('text.txt','text file!', (err) => {
        if(err) throw err;
        console.log("file created");
    });

    if (req.url == "/") {
        res.write("Welcome to server")
        res.end()
    }
    else if (req.url == "/home") {
        res.write("Welcome to Home page")
        res.end()
    }
    else if (req.url == "/product") {
        res.write("Welcome to Product page")
        res.end()
    }
    else if (req.url == "/admin") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is a admin Page.</p></body></html>');
        res.end();
    }
    else {
        res.write("Invalid server")
        res.end()
    }

})

app.listen(5445, () => { console.log("Running Successfully!") });