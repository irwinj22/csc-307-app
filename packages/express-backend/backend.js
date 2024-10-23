import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const {MONGO_CONNECTION_STRING} = process.env;
const { addUser, getUsers, findUserById, findUserByName, findUserByJob, deleteUserById } = userService;

mongoose.set("debug", true);
mongoose.connect(MONGO_CONNECTION_STRING).catch((error) => console.log(error));

const app = express();
const port = 8000;

/* const generateRandomId = () => {
    // found method of generating 6 digit numbers:
    // https://stackoverflow.com/questions/21816595/how-to-generate-a-random-number-of-fixed-length-using-javascript
    let id = (Math.floor(100000 + Math.random() * 900000)).toString();
    return id;
} */

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, world");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    getUsers(name, job)
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.status(404).send("Resource not found.");
    })
})

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    findUserById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.status(404).send("Resource not found.");
    })
});
    
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    // const id = generateRandomId();
    // userToAdd.id = id;
    addUser(userToAdd)
    .then((result) => {
        res.status(201).send(result);
    })
    .catch((error) => {
        res.status(404).send("Resource not found.");
    })
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    deleteUserById(id)
    .then((result) => {
        res.status(204).send();
    })
    .catch((error) => {
        res.status(404).send("Resource not found.");
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`
    );
});