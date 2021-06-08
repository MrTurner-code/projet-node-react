import React, {useState} from 'react';
import axios from "axios";


const NewCharacter = (props) => {
    const [character, setCharacter] = useState({
        name:null,weight:null
    });
    const [display,setDisplay] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        let newCharacter = character;
        axios.post('https://localhost:3000/character', newCharacter, {withCredentials: true})
            .then(response => {
                alert(response.data)
            }).catch(e => alert(e))
    }
    const handleChange = (id) => (e) => {
        const value = e.target.value;

        const newCharacter = {...character, [id]: value};

        setCharacter(newCharacter);
    };

    return (
        <div>{display ?
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange("name")}
                       placeholder="le Nom de votre personnnage"/>
                <input type="text" onChange={handleChange("weight")} placeholder="l'encombrement de votre personnnage"/>
                <input type="submit"/>
            </form> : <button onClick={setDisplay(true)}>Créer un personnage</button>}

        </div>
    )
}
export default NewCharacter;