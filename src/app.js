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
    const {tweet} = req.body;
    const {user} = req.headers;
    if(!user|| !tweet || typeof(user) !== "string" || typeof(tweet) !== "string")
        return res.status(400).send("Todos os campos são obrigatórios!");
    if(!users.find(u => u.username === user))
        return res.status(401).send("UNAUTHORIZED");
    const newTweet = {
        username: user,
        avatar: users.find(u => u.username === user).avatar,
        tweet: tweet
    };
    tweets.push(newTweet);
    res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
    const {page} = req.query;
    if(!page) {
        return res.send(tweets.slice(0, 10));
    }
    else if (page < 1)
        return res.status(400).send("Informe uma página válida!");
    else {
        return res.send(tweets.slice((page - 1) * 10, (page - 1) * 10 + 10));
    }
});

app.get("/tweets/:username", (req, res) => {
    const {username} = req.params;
    res.send(tweets.filter(t => t.username === username));
});

app.listen(PORT);