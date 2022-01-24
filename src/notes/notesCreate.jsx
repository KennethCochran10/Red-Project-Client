import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import PopupState from '@mui/material'
import { Menu } from '@mui/material';
import { Button, ButtonGroup } from 'reactstrap';



import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';

import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

import { Form, FormGroup, Label, Input } from 'reactstrap';
// import { Table, Button } from 'reactstrap';

import { experimentalStyled as styled } from '@mui/material/styles';
class NotesCreate extends Component {


    constructor(props) {
        super(props)
        this.state = {
            id: '',
            text: '',
            priority: 2,
            trackerId: '',
            modal: false

        }
        this.toggle = this.toggle.bind(this)

    }





    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }






    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }





    fetchNotes = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/notes/create`, {
            method: 'POST',
            body: JSON.stringify({
                notes: {
                    text: this.state.text,
                    priority: this.state.priority

                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')

            })
        })
            .then(res => res.json())
            .then(data => console.log(data))

            //.then(data => setNotes(data.results))
            //.then(toggleNotes())
            .catch(err => console.log(err))
    }
    // const toggleNotes = () =>{

    // }
    render() {
        //const open = Boolean(this.state.anchorEl)

        return (

            <div>


                <Form onSubmit={this.fetchNotes} >
                    <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input id="li_notes" type="text" name="notes" placeholder="enter username" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="priority">Priority</Label>
                        <Input id="li_priority" type="password" name="title" placeholder="enter title" onChange={this.handleChange} />
                    </FormGroup>




                    <h6>Add your notes</h6>
                    <Button type="submit" > Add Notes </Button>


                </Form>
            </div >

        )
    }

}
export default NotesCreate;