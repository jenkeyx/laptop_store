import * as React from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@material-ui/core";

import 'styled-components'
import moment from 'moment';
import {withRouter} from "react-router-dom";
import styled from "styled-components";

let md5 = require('md5');

const StyledTableContainer = styled(TableContainer)`
  position: absolute;
  top: 35%;
  width: 60vw;
`
const ShipmentsScreen = styled.div`
  position: relative;
  background-color: lightgray;
  height: 100vh;
  width: 100vw;
  padding: 0 20%;
`
const HeadWrap = styled.div`
  display:flex;
  align-items: flex-end;
  position: absolute;
  width: 60vw;
  margin-top: 17%;
  flex-grow: 1;
  
  h4{
    flex-grow: 1;
  }
  
`


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: []
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!sessionStorage.getItem("username") || !sessionStorage.getItem("password")) window.location.href = "/"
    }

    componentDidMount() {
        if (sessionStorage.getItem("username") && sessionStorage.getItem("password"))
            this.getData();
        else
            window.location.href = "/"
    }


    render() {
        return (
            <ShipmentsScreen>
                <StyledTableContainer component={Paper} style={{maxWidth: "60vw"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Part Number</TableCell>
                                <TableCell>Count left </TableCell>
                                <TableCell>Delivery date</TableCell>
                                <TableCell>Delivery interval</TableCell>
                                <TableCell>Delivery size</TableCell>
                                <TableCell>Confirm receive</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.rows.map((row) => (
                                    <TableRow key={row.partNumber}>
                                        <TableCell component="th" scope="row">
                                            {row.partNumber}
                                        </TableCell>
                                        <TableCell>{row.countLeft}</TableCell>
                                        <TableCell>{row.deliveryDate}</TableCell>
                                        <TableCell>{row.deliveryInterval}</TableCell>
                                        <TableCell>{row.deliverySize}</TableCell>
                                        <TableCell>{row.deliveryDate === moment().format("YYYY-MM-DD") &&
                                        <Button variant="outlined" onClick={() => this.confirmReceive(row.partNumber)}>confirm
                                        </Button>}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
                <HeadWrap>
                        <Typography variant="h4" style={{height: "100%", left: 0}}>Shipments</Typography>
                        <Button variant={"contained"} onClick={this.handleSignOut}>Sign out</Button>
                </HeadWrap>
            </ShipmentsScreen>
        )
    }

    createData(partNumber, countLeft, deliveryDate, deliveryInterval, deliverySize,) {
        return {partNumber, countLeft, deliveryDate, deliveryInterval, deliverySize};
    }

    getData() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("http://localhost:20782/agent/shipments?id=" + sessionStorage.getItem("username") +
            "&md5=" + sessionStorage.getItem("password") + "&sort=deliveryDate", requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({rows: data.content})
            })
            .catch(error => console.log('error', error));
    }

    confirmReceive(partNumber) {
        let requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("http://localhost:20782/agent/shipments/confirm?id=" + this.props.username + "&md5=" + md5(this.props.password) + "&part_number=" + partNumber, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        this.getData()
    }

    handleSignOut(){
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("password");
        window.location.href="/"
    }
}

export default withRouter(Home)