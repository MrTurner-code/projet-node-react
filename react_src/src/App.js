import './App.css';
import React, {useContext, useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header"
import Auth, {LoginContext, useLogin} from "./components/Login";
import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";

export const App = () => {
    return (
        <div className="app">
            <Router>
                <LoginContext.Provider value={useLogin()}>
                    <Header/>
                    <Switch>
                        <Route path="/auth">
                            <Auth/>
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard/>
                        </Route>
                    </Switch>
                </LoginContext.Provider>
            </Router>
        </div>
    )
}

export default App;
