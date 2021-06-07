import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

export const useLogin = () => {
    const [authenticated, setAuthenticated] = useState(false);

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:3001/users/check", { withCredentials: true })
    //         .then(() => {
    //             setAuthenticated(true);
    //         })
    //         .catch((err) => {
    //             if (!(err.response && err.response.status)) {
    //                 alert("An error occured while checking authentication");
    //             }
    //             setAuthenticated(false);
    //         });
    // }, []);

    return [authenticated, setAuthenticated];
};

export const LoginContext = React.createContext();

const Login = (props) => {
    const [loginData, setLoginData] = useState({});
    const [authenticated, setAuthenticated] = useContext(LoginContext);
    console.log(authenticated)
    let { path, url } = useRouteMatch();

    const history = useHistory();

    const handleChange = (id) => (e) => {
        const value = e.target.value;

        const newLoginData = { ...loginData, [id]: value };

        setLoginData(newLoginData);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/auth/signup", loginData, {
                withCredentials: true,
            })
            .then(() => {
                console.log('authenticatde')
                setAuthenticated(true);
                history.push("/inventory");
            })
            .catch((err) => {
                setAuthenticated(false);
                if (err.response && err.response.status === 403) {
                    alert("Invalid credentials");
                } else {
                    alert(
                        "probleme"
                    );
                }
            });
    };

    const handleSignup = async () => {
        axios
            .post("http://localhost:3001/auth/login", loginData, {
                withCredentials: true,
            })
            .then(() => {
                history.push("/auth/login");
            })
            .catch((err) => {
                setAuthenticated(false);
                if (err.response && err.response.status === 403) {
                    alert("Invalid credentials");
                } else {
                    alert(
                        "An unexpected error happened, we are sorry for the inconvenience"
                    );
                }
            });
    };



    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Connectez vous à l'aide de vos identifiants</h2>
                <input type="text" onChange={handleChange('username')} placeholder="username"/>
                <input type="text" onChange={handleChange('password')} placeholder="password"/>
                <button type="submit">Connectez-vous</button>
            </form>
        </div>
    );
};

export default Login;
