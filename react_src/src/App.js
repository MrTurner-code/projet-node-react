import './App.css';
import React, {useContext, useEffect, useState} from 'react';
import {Route, Switch, useHistory, useRouteMatch} from "react-router";

import {BrowserRouter as Router} from "react-router-dom";
import Auth, {LoginContext, useLogin} from "./components/Login";
import Inventory from "./components/Inventory";

export const App = () => {
    return (
        <div className="app">
            <Router>
                <LoginContext.Provider value={useLogin()}>
                    <Switch>
                        <Route path="/">
                            <Auth/>
                        </Route>
                        <Route path="/inventory">
                            <div>Bonjour tout le monde</div>
                        </Route>
                    </Switch>
                </LoginContext.Provider>
            </Router>
        </div>
    )
}

export default App;
