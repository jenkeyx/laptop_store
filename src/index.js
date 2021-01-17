import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import App from "./components/App";
import MyHistory from "./components/MyHistory";
import './style/index.css'
ReactDOM.render(
    (<BrowserRouter history = {MyHistory}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <App/>
        </BrowserRouter>
    ), document.getElementById('root'))