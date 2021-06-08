import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios'
import {LoginContext} from "./Login";
import NewCharacter from "./NewCharacter";

const Dashboard = () => {
    const [characters, setCharacters] = useState([]);
    const [authenticated, setAuthenticated] = useContext(LoginContext);
    useEffect(() => {
        axios.get("http://localhost:3001/character", {withCredentials: true})
            .then(response => setCharacters(response.data))
            .catch((err) => {
                if (err.response && err.response.status === 403) {
                    setAuthenticated(false);
                } else {
                    alert(
                        "Une erreur est survenue lors du chargement de vos données, veuillez réessayer ultérieurement."
                    );
                }
            });
    }, []);


    return (
        <div>
            <NewCharacter/>
            <h1>Retrouvez la liste de vos personnage</h1>
            <ul>
                {characters.length>=1 ? characters.map((character, index) => {
                        <li key={index}>{{character}}</li>
                    }
                ) : " vous n'avez pas encore défini de personnage"}
            </ul>
        </div>
    )
}
export default Dashboard