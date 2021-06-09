import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from 'axios'
import {LoginContext} from "./Login";
import Item from "./Item"

const EditCharacter = (props) => {
    let {id} = useParams();
    const [character, setCharacter] = useState({});
    const [authenticated, setAuthenticated] = useContext(LoginContext);
    const [newItem, setNewItem] = useState({});
    console.log(newItem);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/character/${id}/add-item`, newItem, {credentials: true})
            .then(response => {
                alert(response)
            })
            .catch(err => alert(err));

    }
    const handleChange = (id) => (e) => {
        const value = e.target.value;

        const newLoginData = {...newItem, [id]: value};

        setNewItem(newLoginData);
    };
    const [isLoading, setIsLoading] = useState(true);
    console.log(character.items);
    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:3001/character/${id}`, {withCredentials: true})
            .then(result => {
                setCharacter(result.data);
                setIsLoading(false);
            })
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
    if (isLoading === true) {
        return (<div>Loading...</div>)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange('name')}/>
                <input type="text" onChange={handleChange('weight')}/>
                <button onClick={handleSubmit}>Ajouter un objet</button>
            </form>
            <p>{character.name}</p>
            <ul>{character?.items?.map((item, index) => {
                return (
                    <Item key={index} item={item}/>
                )
            })}</ul>
        </div>
    )
}
export default EditCharacter;