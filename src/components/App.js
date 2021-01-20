import * as React from "react";
import {
    Route,
    Switch,
    withRouter
} from "react-router-dom"
import Home from "./Home";
import Welcome from "./Welcome";
import {Redirect} from "react-router";
import Catalog from "./Catalog";
import Base from "./Base";
import MyHistory from "./MyHistory";
let md5 = require('md5');


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:"",
            authStatus:false
        }
        this.handleLoginChange = this.handleLoginChange.bind(this)
        this.handlePasswordChange= this.handlePasswordChange.bind(this)
        this.changeAuthStatus = this.changeAuthStatus.bind(this)
    }
    handleLoginChange(event) {

        const target = event.target;
        const value = target.value;
        this.setState({
            username:value
        })
        sessionStorage.setItem("username",value)
    }
    handlePasswordChange(event) {

        const target = event.target;
        const value = target.value;
        this.setState({
            password:value
        })
        sessionStorage.setItem("password",md5(value))
    }

    changeAuthStatus(){
        this.setState({
            authStatus:true
        }
    )
    }

    render() {
        const history = MyHistory
        return (
            <div>
                <Switch>
                    <Route history={history} push path='/welcome'>
                        <Welcome
                            authStatus = {this.state.authStatus}
                            usernameChange = {this.handleLoginChange}
                            passwordChange = {this.handlePasswordChange}
                            changeAuthstatus = {this.changeAuthStatus}
                        />
                    </Route>
                    <Route history={history} push path='/home' >
                        <Home/>
                    </Route>
                    <Route history={history} path='/catalog/bases/:id'>
                        <Base/>
                    </Route>
                    <Route history={history} path='/catalog'>
                        <Catalog/>
                    </Route>
                    <Redirect form="/" to="/welcome"/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(App)