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
class TrackerTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            company: '',
            title: '',
            salary: '',
            contactInfo: 333,
            haveIContacted: true,
            haveTheyContacted: false,




        };


        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    }
    onRadioBtnClick(value, field) {
        this.setState({
            [field]: value
        });


    }






    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }





    fetchTracker = (e) => {
        console.log(this.state)
        e.preventDefault()
        fetch(`http://localhost:8080/tracker/create`, {
            method: 'POST',
            body: JSON.stringify({
                tracker: {
                    company: this.state.company,
                    title: this.state.title,
                    salary: this.state.salary,
                    contactInfo: this.state.contactInfo,
                    haveIContacted: this.state.haveIContacted,
                    haveTheyContacted: this.state.haveTheyContacted

                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')

            })
        })

            .then(res => (res.json()))
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


                <Form onSubmit={this.fetchTracker} >

                    <FormGroup>
                        <Label for="company">Company</Label>
                        <Input id="li_company" type="text" name="company" placeholder="enter username" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input id="li_title" type="text" name="title" placeholder="enter title" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="salary">Salary</Label>
                        <Input id="li_salary" type="text" name="salary" placeholder="enter salary" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="contactInfo">Contact Info</Label>
                        <Input id="li_contactInfo" type="text" name="contactInfo" placeholder="enter the contact info" onChange={this.handleChange} />
                    </FormGroup>
                    <h5>Have I contacted</h5>
                    <ButtonGroup name='haveIContacted'>
                        <Button color="success" onClick={(event) => this.onRadioBtnClick(true, 'haveIContacted')} active={this.state.haveIContacted === true}>Yes</Button>
                        <Button color="danger" onClick={(event) => this.onRadioBtnClick(false, 'haveIContacted')} active={this.state.haveIContacted === false}>No</Button>

                    </ButtonGroup>
                    <h5>Have they contacted</h5>
                    <ButtonGroup name='haveTheyContacted'>
                        <Button color="success" onClick={(event) => this.onRadioBtnClick(true, 'haveTheyContacted')} active={this.state.haveTheyContacted === true}>Yes</Button>
                        <Button color="danger" onClick={(event) => this.onRadioBtnClick(false, 'haveTheyContacted')} active={this.state.haveTheyContacted === false}>No</Button>

                    </ButtonGroup>



                    <h6>Add your job tracker!</h6>
                    <Button type="submit" > Add Tracker </Button>

                </Form>
            </div >

        )
    }

}
export default TrackerTable;