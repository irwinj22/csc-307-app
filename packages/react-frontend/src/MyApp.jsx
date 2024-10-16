import React, { useState, useEffect } from "react";
import Table from "./Table"
import Form from "./Form"

// function that returns what is supposed to be rendered on the screen
function MyApp() {
    const [characters, setCharacters] = useState([])

    // creating a function to remove a character from the table
    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }

    function updateList(person) {
      setCharacters([...characters, person])
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    useEffect(() => {
        fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => {
            console.log(error);
        });
    }, []);

    // passing data through the the child component
    return (
        <div className="container">
            <Table
              characterData = {characters}
              removeCharacter = {removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

// allow the componenent to be exported to other components or files
export default MyApp;