
// import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Outlet from 'react-router-dom'
import TrackerDelete from './trackerDelete';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'reactstrap'


import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import PopupState from '@mui/material'
import { Menu, TableRow } from '@mui/material';
import { Button, ButtonGroup } from 'reactstrap';
import TrackerEdit from './trackerEdit'



import ClickAwayListener from '@mui/material/ClickAwayListener';


import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Route, Link } from 'react-router-dom'



import { Label, Form, FormGroup } from 'reactstrap'
import Input from '@mui/material/Input'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import Paper from '@mui/material/Paper';

// import { Table, Button } from 'reactstrap';

import { experimentalStyled as styled } from '@mui/material/styles';
import { rootShouldForwardProp } from '@mui/material/styles/styled';
import NotesTable from '../notes/notesTable';
class TrackerTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            company: '',
            title: '',
            salary: '',
            contactInfo: 333,
            haveIContacted: null,
            haveTheyContacted: null,
            data: [],
            trackerData: {},
            tracker: null,
            modal: false,
            modal2: false






        };


        this.toggle = this.toggle.bind(this)
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.onRadioBtnClick2 = this.onRadioBtnClick2.bind(this)
        this.toggle2 = this.toggle2.bind(this)

    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    toggle2() {
        this.setState({
            modal: !this.state.modal
        })
    }



    handleClickOpen = (tracker) => {
        this.setState({
            tracker
        })
    }

    onRadioBtnClick(value, field) {
        this.setState({
            [field]: value
        });


    }
    onRadioBtnClick2(value, field) {
        this.setState({
            [field]: value
        });


    }
    handlebChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    componentDidMount() {

        this.fetchTracker()
    }
    deleteTracker = (trackerId) => {
        fetch(`http://localhost:8080/tracker/${trackerId}`, {
            method: 'DELETE',

            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),


            })
        })
            .then(res => res.json())
        //.then(data => this.setState({ data: data.results }))


        //.then(data => setNotes(data.results))
        //.then(toggleNotes())
    }
    fetchNotes = (trackerId) => {

        fetch(`http://localhost:8080/notes/${trackerId}`, {
            method: 'GET',

            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')

            })
        })
            .then(res => res.json())
        //.then(data => this.setState({ data: data.results }))


        //.then(data => setNotes(data.results))
        //.then(toggleNotes())

    }
    fetchTracker = () => {

        fetch(`http://localhost:8080/tracker`, {
            method: 'GET',

            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')

            })
        })
            .then(res => res.json())
            .then(data => this.setState({ data: data.results }))


        //.then(data => setNotes(data.results))
        //.then(toggleNotes())

    }
    handleSubmit = (event, trackerId) => {
        event.preventDefault()
        fetch(`http://localhost:8080/tracker/${trackerId}`, {
            method: 'PUT',
            body: JSON.stringify({ 'tracker': trackerId }),
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')

            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .then((data) => {
                this.setState({ updatePressed: false, trackerData: trackerId })
                console.log(this.state.trackerData)

            })
    }
    // const toggleNotes = () =>{

    // }


    render() {
        console.log(this.state.data)
        //const open = Boolean(this.state.anchorEl)

        return (





            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Company</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Salary</TableCell>
                            <TableCell align="right">Contact Info</TableCell>
                            <TableCell align="right">Have I contacted</TableCell>
                            <TableCell align="right">Have they contacted</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {this.state.data.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.company}</TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.salary}</TableCell>
                                <TableCell align="right">{row.contactInfo}</TableCell>
                                <TableCell align="right">{row.haveIContacted}</TableCell>
                                <TableCell align="right">{row.haveTheyContacted}</TableCell>
                                <TableCell align="right"><Button variant="outlined" color='primary' onClick={() => this.toggle2()}>
                                    Notes
                                </Button></TableCell>
                                <TableCell align="right"><Button variant="outlined" color='secondary' onClick={() => this.toggle(row.id)}>
                                    Update
                                </Button></TableCell>
                                <TableCell align="right"><Button variant="outlined" color='danger' onClick={() => this.deleteTracker(row.id)}>
                                    Delete
                                </Button></TableCell>

                            </TableRow>
                        ))}

                    </TableBody>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} style={{ maxWidth: '90 vs' }}>
                        <ModalHeader toggle={this.toggle} >Update your trackers!</ModalHeader>
                        <ModalBody>


                            <Form onSubmit={this.handleSubmit} >
                                <FormGroup>
                                    <Label for="company">Company</Label>
                                    <Input id="li_company" type="text" name="company" placeholder="enter Company" onChange={this.handleChange} />
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
                                    <Input id="li_contactInfo" type="text" name="contactInfo" placeholder="(xxx)-xxx-xxxx" onChange={this.handleChange} />
                                </FormGroup>
                                <h5>Have I contacted</h5>
                                <ButtonGroup name='haveIContacted'>
                                    <Button color="success" onClick={(event) => this.onRadioBtnClick(true, 'haveIContacted')} active={this.state.haveIContacted === true}>Yes</Button>
                                    <Button color="danger" onClick={(event) => this.onRadioBtnClick(false, 'haveIContacted')} active={this.state.haveIContacted === false}>No</Button>

                                </ButtonGroup>
                                <h5>Have they contacted</h5>
                                <ButtonGroup name='haveTheyContacted'>
                                    <Button color="success" onClick={(event) => this.onRadioBtnClick2(true, 'haveTheyContacted')} active={this.state.haveTheyContacted === true}>Yes</Button>
                                    <Button color="danger" onClick={(event) => this.onRadioBtnClick2(false, 'haveTheyContacted')} active={this.state.haveTheyContacted === false}>No</Button>

                                </ButtonGroup>



                                <h6>Add your job tracker!</h6>
                                <Button type="submit" > Add Tracker </Button>


                            </Form>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.modal2} toggle={this.toggle2} style={{ maxWidth: '90 vs' }}>
                        <ModalHeader toggle={this.toggle2}>Update your Notes!</ModalHeader>
                        <ModalBody>


                            <Form onSubmit={this.handleSubmit} >
                                <FormGroup>
                                    <Label for="notes">Notes</Label>
                                    <Input id="li_notes" type="text" name="notes" placeholder="enter username" onChange={this.handlebChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="priority">Priority</Label>
                                    <Input id="li_priority" type="password" name="title" placeholder="enter title" onChange={this.handlebChange} />
                                </FormGroup>




                                <h6>Add your notes</h6>
                                <Button type="submit" > Add Notes </Button>


                            </Form>
                        </ModalBody>
                    </Modal>

                </Table>
            </TableContainer>


        )

    };

}
export default TrackerTable;




