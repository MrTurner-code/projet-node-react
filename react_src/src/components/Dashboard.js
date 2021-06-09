import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios'
import {LoginContext} from "./Login";
import Character from "./Character";
import NewCharacter from "./NewCharacter";
import {useHistory} from "react-router";

const Dashboard = () => {
    const [characters, setCharacters] = useState([]);
    const [display, setDisplay] = useState(false)
    const [character, setCharacter] = useState({
        name: null, weight: null
    });
    const history = useHistory();

    const [authenticated, setAuthenticated] = useContext(LoginContext);

    useEffect(() => {
        handlefetch()}, []);
const handlefetch = () => {
    axios.get("http://localhost:3001/characters", {withCredentials: true})
            .then((response) => setCharacters(response.data))
            .catch((err) => {
                if (err.response && err.response.status === 403) {
                    setAuthenticated(false);
                } else {
                    alert(
                        "Une erreur est survenue lors du chargement de vos données, veuillez réessayer ultérieurement."
                    );
                }
            });
}



    const handleSubmit = async (e) => {
        e.preventDefault();
        let newCharacter = character;
        axios.post('http://localhost:3001/character', newCharacter, {withCredentials: true})
            .then(response => {
                alert(response.data)
                handlefetch()
            }).catch(e => alert(e))
    }
    const handleChange = (id) => (e) => {
        const value = e.target.value;

        const newCharacter = {...character, [id]: value};

        setCharacter(newCharacter);
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleChange("name")}
                           placeholder="le Nom de votre personnnage"/>
                    <input type="text" onChange={handleChange("weight")}
                           placeholder="l'encombrement de votre personnnage"/>
                    <input type="submit"/>
                </form>

            </div>
            <h1>Retrouvez la liste de vos personnage</h1>
            <ul>
                {characters.map((character, index) => {return(
                        <Character key={index}character={character} />)
                    }
                )}
            </ul>
        </div>
    )
}
export default Dashboard