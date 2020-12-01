import React, {Component} from 'react';
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import './styles/main.css'
import Home from "./components/Home";

class App extends Component {
    render() {
        return (
            <Landing/>
        );
    }
}

export default App;