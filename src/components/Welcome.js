import * as React from "react";
import {Button, Link, TextField} from '@material-ui/core';
import 'fontsource-roboto';
import {Redirect} from "react-router";
import {withRouter} from "react-router-dom";
import {HOST} from "./constant";
import axios from "axios";
import styled from "styled-components";


const PStyle = styled.p`
  font-family: Roboto, serif;
`
const DivStyle = styled.div`
  //padding-top: 10px;
  //margin: auto;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  position: absolute;
`
const RegWrap = styled(DivStyle)`
`
const ButtonStyle = styled(Button)`
`
const StyledLink = styled(Link)`
`
const LoginScreen = styled.div`
  position: relative;
  height: 100vh;
  padding: 0;
  margin: 0;
`


class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.handleAuth = this.handleAuth.bind(this)
    }

    handleAuth(event) {
        event.preventDefault();

        axios.post(`${HOST}/agent/login`, null, {
            params: {
                id: sessionStorage.getItem("username"),
                md5: sessionStorage.getItem("password")
            }
        }).then(response => {
                if (response.status === 200)
                    this.props.changeAuthstatus()
            }
        ).catch(error => console.log("error", error))
    }


    render() {
        if (this.props.authStatus === true) {
            return <Redirect push to="/home"/>
        }
        return (
            <LoginScreen>
                <DivStyle id="formWrap">
                    <PStyle>LaptopStore</PStyle>
                    <form>
                        <DivStyle>
                            <TextField
                                label="login"
                                value={this.props.username}
                                name="username"
                                required="true"
                                variant="outlined"
                                onChange={this.props.usernameChange}/>
                        </DivStyle>
                        <DivStyle>
                            <TextField
                                type="password"
                                label="password"
                                value={this.props.password}
                                name="password"
                                required="true"
                                variant="outlined"
                                onChange={this.props.passwordCHange}/>
                        </DivStyle>
                        <DivStyle id="buttons_bar">
                            <ButtonStyle
                                onClick={this.handleAuth}
                                id="submit"
                                variant="contained"
                                color="primary"> SIGN IN
                            </ButtonStyle>
                            <RegWrap id="registerDescription">
                                <div>
                                    <PStyle>Don't have an account? </PStyle>
                                    <StyledLink>
                                        Create new one
                                    </StyledLink>
                                </div>
                            </RegWrap>
                        </DivStyle>
                    </form>
                </DivStyle>
            </LoginScreen>
        )
    }

}

export default withRouter(Welcome)

