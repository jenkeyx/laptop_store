import * as React from "react";
import "../style/home.css"
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import moment from 'moment';
import {withRouter} from "react-router-dom";

let md5 = require('md5');


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: []
        }
    }
    componentDidMount() {
        if (sessionStorage.getItem("username") && sessionStorage.getItem("password"))
            this.getData();
        else{
            window.location.href = "/"
        }
    }


    render() {
        return (
            <TableContainer id="tableContainer" component={Paper}>
                <Table id="tableData">
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
                                    <Button onClick={()=>this.confirmReceive(row.partNumber)}>confirm</Button>}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
            "&md5=" + sessionStorage.getItem("password")+"&sort=deliveryDate", requestOptions)
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

        fetch("http://localhost:20782/agent/shipments/confirm?id=" + this.props.username + "&md5=" + md5(this.props.password) + "&part_number="+partNumber, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        this.getData()
    }

}

export default withRouter(Home)