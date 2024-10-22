import React, { useState, useEffect } from "react";
import Table from "./Table"
import Form from "./Form"

// function that returns what is supposed to be rendered on the screen
function MyApp() {
    const [characters, setCharacters] = useState([])

    // creating a function to remove a character from the table
    // maybe I am passing the wrong param? I am not sure what to make of this one TBH
    function removeOneCharacter(index) {
        const _id = characters[index]._id;
        deleteUser(_id)
        .then((response) => {
            if (response.status === 204) {
                const updated = characters.filter((character, i) => {
                    return i !== index;
                });
                setCharacters([... updated]);
            } else {
                console.log("Unexpected status code: ${response.status}");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    function updateList(person) {
      postUser(person)
      .then((response) => {
        if (response.status === 201) {
            return response.json();
        } else {
            console.log("Unexpected status code: ${response.status}");
      }})
      .then((updatedUser) => {
        setCharacters([... characters, updatedUser]);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(person)
        });

        return promise;
    }

    // for some reason, not able to delete a user .. cannot determine why though
    function deleteUser(_id) {
        const promise = fetch(`http://localhost:8000/users/${_id}`, {
            method: "DELETE", 
            headers: {
                "Content-Type" : "application/json"
            }
        });
        
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