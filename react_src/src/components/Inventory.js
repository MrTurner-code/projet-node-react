import React, {useContext} from 'react'
import {LoginContext} from "./Login";

const Inventory =() => {
    const [authenticated, setAuthenticated] = useContext(LoginContext);
console.log('composant inventaire')
    return (
        <div>Bienvenue dans votre inventaire</div>
    )
}
export default Inventory