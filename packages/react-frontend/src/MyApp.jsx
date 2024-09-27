import React, { useState } from "react";
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

    // passing data through the the child component
    return (
        <div className="container">
            <Table
              characterData = {characters}
              removeCharacter = {removeOneCharacter}
            />
            <Form />
        </div>
    );
}

// allow the componenent to be exported to other components or files
export default MyApp;