let server = require('http');
let fs = require('fs');
let url = require('url');

let app = server.createServer((req, res) => {

    if (req.url === "/read") {

        fs.readFile("details.json", "utf8", (err, data) => {
            if (err) throw err;

            res.writeHead(200, { "content-type": "application/json" });
            res.write(data);
            res.end();
        });
    }

    else if (req.url === "/add") {

        let path = url.parse(req.url, true).query;
        let name = path.name;
        let mobilenumber = path.mobilenumber;

        fs.readFile("details.json", "utf8", (err, data) => {
            if (err) throw err;

            let users = JSON.parse(data);
            let newuser = {
                id: users.length + 1,
                name: name,
                mobilenumber: mobilenumber
            };

            users.push(newuser);

            fs.writeFile("details.json", JSON.stringify(users, null, 2), (err) => {
                if (err) throw err;
                res.write("user added successfully!");
                res.end();
            });
        });
    }

    else if (req.url === "/update") {

        let path = url.parse(req.url, true).query;
        let id = path.id;
        let name = path.name;
        let mobilenumber = path.mobilenumber;

        fs.readFile("details.json", "utf8", (err, data) => {
            if (err) throw err;

            let users = JSON.parse(data);

            users.forEach((user) => {
                if (user.id == id) {
                    user.name = name
                    user.mobilenumber = mobilenumber;
                }
            });

            fs.writeFile("details.json", JSON.stringify(users, null, 2), (err) => {
                if (err) throw err;

                res.write("user was updated")
                res.end();
            });
        });

    }

    else if (req.url === "/remove") {

        let path = url.parse(req.url, true).query;
        let id = path.id

        fs.readFile("details.json", "utf8", (err, data) => {
            if (err) throw err;

            let users = JSON.parse(data);

            users = users.filter((user) => user.id != id);

            fs.writeFile("details.json", JSON.stringify(users, null, 2), (err) => {
                if (err) throw err;

                res.write("user was removed")
                res.end();
            });
        });
    }

    else if (req.url === "/search") {

        let path = url.parse(req.url,true).query
        let id = path.id;

        fs.readFile("details.json","utf-8",(err,data) => {
            if(err) throw err;

            let users = JSON.parse(data);

            let result = users.find((user) => user.id == id);

            res.writeHead(200,{"content-type":"application/json"});
            res.write(JSON.stringify(result,null, 2));
            res.end();
        })
    }

    else if (req.url === "/sort") {

        fs.readFile("details.json","utf-8",(err,data) => {
            if(err) throw err;

            let users = JSON.parse(data);
            users.sort((a,b) => a.name.localeCompare(b.name));

            res.writeHead(200,{"content-type":"application/json"});
            res.write(JSON.stringify(users,null,2));
            res.end();
        })
    }

    else {
        res.write("server running!");
        res.end();
    }
})
app.listen(5000, () => { console.log("server start") });
