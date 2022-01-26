
import { Container, Row, Col } from 'reactstrap';
import React, { Component, useEffect, useState } from 'react';
import { Menu, TableRow } from '@mui/material';
import { Button, ButtonGroup } from 'reactstrap';
import { Label, Form, FormGroup } from 'reactstrap'
import Input from '@mui/material/Input'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import Paper from '@mui/material/Paper';



class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            user: [],
        }


    }

    componentDidMount() {
        fetch(`http://localhost:8080/auth/userinfo`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(data)
                    if (data) {
                        this.setState({
                            user: data.users
                        })
                    }



                }
            })
    }
    render() {
        return (

            <div>



                < TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>


                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">isAdmin</TableCell>
                                <TableCell align="left">UserName</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.user.map((user) => (
                                <TableRow
                                    key={user.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="left">{user.id}</TableCell>
                                    <TableCell align="left">{user.isAdmin ? 'yes' : 'no'}</TableCell>
                                    <TableCell align="left">{user.username}</TableCell>



                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer >


            </div>


        )
    }
}

export default Admin