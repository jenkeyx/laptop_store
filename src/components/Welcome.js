import * as React from "react";
import {Button, Link, TextField, Typography} from '@material-ui/core';
import 'fontsource-roboto';
import {Redirect} from "react-router";
import {withRouter} from "react-router-dom";
import {HOST} from "./constant";
import axios from "axios";
import styled from "styled-components";


const Description = styled.div`
  font-family: Roboto, serif;
`
const DivStyle = styled.div`
  padding: 10px;

  &#formWrap {
    width: 300px;
    height: 300px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`
const RegWrap = styled(DivStyle)`
`
const ButtonStyle = styled(Button)`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
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
                    <Typography align="center" variant="h4">LaptopStore</Typography>
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
                                onChange={this.props.passwordChange}/>
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
                                    <Description>Don't have an account? </Description>
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

