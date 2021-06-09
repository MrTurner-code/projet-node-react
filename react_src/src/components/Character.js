import React, {useState} from 'react'
import axios from "axios";
import {useHistory} from "react-router";


const Character = props => {
    const [carac, setCarac] = useState(props.character)
    const [edit, setEdit] = useState(false);
    const history = useHistory();

    const handleEdit = () => {
history.push(`/edit-character/${carac._id}`);
    }
    return (
        <div>
            <p>nom du personnage : {carac.name}</p>
            <p>encombrement du personnage : {carac.weight}</p>
            <button onClick={handleEdit}>Voir l'inventaire du personnage</button>
            
        </div>
    )
}
export default Character