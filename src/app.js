import express from "express";

const PORT = 5000;
const users = [];
const tweets = [];

const app = express();
app.use(express.json());

app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    if(!username || !avatar || typeof(username) !== "string" || typeof(avatar) !== "string")
        return res.status(400).send("Todos os campos são obrigatórios!");
    const newUser = {
        username: username,
        avatar: avatar
    };
    users.push(newUser);
    res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;
    if(!username || !tweet || typeof(username) !== "string" || typeof(tweet) !== "string")
        return res.status(400).send("Todos os campos são obrigatórios!");
    if(!users.find(u => u.username === username))
        return res.status(401).send("UNAUTHORIZED");
    const newTweet = {
        username: username,
        avatar: users.find(u => u.username === username).avatar,
        tweet: tweet
    };
    tweets.push(newTweet);
    res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
    return res.send(tweets.slice(0, 10));
});

app.get("/tweets/:username", (req, res) => {
    const {username} = req.params;
    res.send(tweets.filter(t => t.username === username));
});

app.listen(PORT);