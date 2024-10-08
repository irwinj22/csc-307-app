import express from "express";

const app = express();
const port = 8000;
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

const findUserByName = (name) => {
return users["users_list"].filter(
    (user) => user["name"] === name
);
}

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
);
}

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] == id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
}

const deleteUserById = (id) => {
    // get index of item to remove
    let index = users["users_list"].findIndex((user) => user["id"] == id);
    // remove item at that index
    // NOTE: .indexOf() returns -1 if value not found
    if (index > -1) {
        users["users_list"].splice(index, 1);
    }
    return users["users_list"];
}

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, world");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    // if both name and job are provided
    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);
    } 
    // if just name is provided
    else if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    // if no query parameters, return all users
    } else {
        res.send(users);
    }
})

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result == undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});
    
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = deleteUserById(id);
    if (result == undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`
    );
});