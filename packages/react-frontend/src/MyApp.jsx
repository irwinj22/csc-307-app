import React, { useState } from "react";
import Table from "./Table"

// function that returns what is supposed to be rendered on the screen
function MyApp() {
    const [characters, setCharacters] = useState([
        {
            name: "Charlie",
            job: "Janitor"
          },
          {
            name: "Mac",
            job: "Bouncer"
          },
          {
            name: "Dee",
            job: "Aspring actress"
          },
          {
            name: "Dennis",
            job: "Bartender"
          }
    ])

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
        </div>
    )
};

// allow the componenent to be exported to other components or files
export default MyApp;