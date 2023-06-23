import express from "express";

const PORT = 5000;
const users = [];
const tweets = [];

const app = express();
app.use(express.json());

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    const newUser = {
        username: username,
        avatar: avatar
    };
    users.push(newUser);
    res.send("OK");
});

app.listen(PORT);