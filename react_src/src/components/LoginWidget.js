import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { LoginContext } from "./Login";



const LoginWidget = (props) => {

    const history = useHistory();
    const [authenticated, setAuthenticated] = useContext(LoginContext);
const handleLogout = async() =>{
        axios
            .post("http://localhost:3001/auth/logout", { withCredentials: true })
            .then(() => {
                setAuthenticated(false)
            })
            .catch((err) => {
                if (err.response && err.response.status) {
                    setAuthenticated(true)
                }
            });
}
    console.log("authenticated", authenticated)

    if (authenticated === true) {
        return <button
            onClick={() => handleLogout()}
        >
            Log out
        </button>;
    } else {
        history.push("/auth/login");
        return null;
    }
};

export default LoginWidget;