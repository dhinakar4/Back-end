let express = require("express");
let db = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect("mongodb://localhost:27017/demoserver")
    .then(() => console.log("db connected"))
    .catch((e) => console.log("error " + e));

let myschema = new db.Schema({
    userid: { required: true, type: Number },
    name: { required: true, type: String, trim: true },
    age: { required: true, type: Number },
    city: { required: true, type: String, trim: true },
    phone: { required: true, unique: true, type: Number }
});

const Agent = db.model("userlist", myschema);

app.get("/", (req, res) => {
    res.send("Home page!");
});


app.post("/add", async (req, res) => {

    let lastuser = await Agent.findOne().sort({ userid:-1 });

    let newid = lastuser ? lastuser.userid + 1 : 1;

    let user = new Agent({
        userid : newid,
        name: req.body.name,
        age: req.body.age,
        city: req.body.city,
        phone: req.body.phone
    });

    await user.save();

    res.send("User added successfully");
});


app.get("/users", async (req, res) => {

    let users = await Agent.find();

    res.json(users);
});


app.post("/update/:id", async (req, res) => {

    await Agent.updateOne(
        { userid : req.params.id },
        {
            name: req.body.name,
            age: req.body.age,
            city: req.body.city,
            phone: req.body.phone
        }
    )

    res.send("User updated successfully");
});


app.get("/delete/:id", async (req, res) => {

    await Agent.deleteOne(
        {
            userid: req.params.id
        }
    )

    res.send("User deleted successfully");
});


app.listen(7557, () => {
    console.log("server is running!");
});