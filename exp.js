let express = require("express");
let fs = require("fs");
let bd = require("body-parser");

let app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("hello express")
});

app.post("/create", (req, res) => {
    let name = req.body.name;
    let mobile = req.body.mobile;

    fs.readFile("data.json", "utf-8", (err, data) => {

        let users = JSON.parse(data);

        let newuser = {
            id: users.length + 1,
            name: name,
            mobile: mobile
        };

        users.push(newuser);

        fs.writeFile("data.json", JSON.stringify(users, null, 2), (err) => {

            res.send(newuser);
        })
    })
})

app.get("/read", (req, res) => {

    fs.readFile("data.json", "utf-8", (err, data) => {

        if (err) throw err;

        let users = JSON.parse(data || "[]")

        res.send(users);

    })
})

app.post("/update", (req, res) => {

    let id = req.body.id;
    let name = req.body.name;
    let mobile = req.body.mobile;

    fs.readFile("data.json", "utf-8", (err, data) => {

        if (err) throw err;

        let users = JSON.parse(data);
        let user = users.find(u => u.id == id);

        if (!user) {
            return res.send("user not found!")
        }

        user.name = name;
        user.mobile = mobile;

        fs.writeFile("data.json", JSON.stringify(users, null, 2), (err) => {

            if (err) {
                return res.send("file error");
            }
            res.json(users);
        })
    })
})

app.get("/remove", (req, res) => {

    let id = req.query.id;

    fs.readFile("data.json", "utf-8", (err, data) => {

        if (err) throw err;

        let users = JSON.parse(data);

        users = users.filter((user) => user.id != id);

        fs.writeFile("data.json", JSON.stringify(users, null, 2), (err) => {
            if (err) throw err;

        res.send("user was removed!");
        
        });
    })
})

app.get("/search", (req, res) => {

    let id = req.query.id
    
    fs.readFile("data.json","utf-8",(err,data) => {

        if(err) throw err;

        let users = JSON.parse(data);

        let user = users.find((u) => u.id == id);

        if(!user) {
            
           return res.send("user not found!")
        }

        res.send(user);

    })
})

app.listen(8000, () => { console.log("server has started!") })