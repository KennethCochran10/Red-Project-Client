
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import React, { Component, } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableRow } from '@mui/material';
import { Button } from 'reactstrap';
import { Label, Form, FormGroup } from 'reactstrap'
import Input from '@mui/material/Input'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';



class NotesTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            notes: '',
            priority: '',
            userId: '',
            notesId: '',
            modal: false

        }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
    componentDidMount() {

        this.fetchNotes()
    }
    deleteNotes = () => {
        fetch(`http://localhost:8080/notes${this.state.id}`, {
            method: 'DELETE',

            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),


            })
        })
            .then(res => res.json())
            .then(data => this.setState({ data: data.results }))



    }
    fetchNotes = () => {

        fetch(`http://localhost:8080/notes`, {
            method: 'GET',

            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')

            })
        })
            .then(res => res.json())
            .then(data => this.setState({ data: data.results }))




    }
    handleSubmit = (event, tracker) => {
        event.preventDefault()
        fetch(`http://localhost:8080/tracker/${this.state.id}`, {
            method: 'PUT',
            body: JSON.stringify({ 'tracker': tracker }),
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')

            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .then((data) => {
                this.setState({ updatePressed: false, trackerData: tracker })
                console.log(this.state.trackerData)
                this.fetchTracker()
            })
    }

    render() {
        console.log(this.state.data)


        return (





            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Notes</TableCell>
                            <TableCell align="right">Priority</TableCell>

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
                                <TableCell align="right">{row.notes}</TableCell>
                                <TableCell align="right">{row.priority}</TableCell>


                                <TableCell align="right"><Button variant="outlined" onClick={() => this.toggle(row)}>
                                    Update
                                </Button></TableCell>
                                <TableCell align="right"><Button variant="outlined" onClick={() => this.deleteNotes(row)}>
                                    Delete
                                </Button></TableCell>

                            </TableRow>
                        ))}

                    </TableBody>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} style={{ maxWidth: '90 vs' }}>
                        <ModalHeader toggle={this.toggle}>Update your Notes!</ModalHeader>
                        <ModalBody>


                            <Form onSubmit={this.handleSubmit} >
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
                        </ModalBody>
                    </Modal>

                </Table>
            </TableContainer>

        )
    };

}
export default NotesTable