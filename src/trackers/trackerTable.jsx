import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableRow } from '@mui/material';
import { Button, ButtonGroup } from 'reactstrap';
import './trackerTable.css'
import { Label, Form, FormGroup } from 'reactstrap'
import Input from '@mui/material/Input'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
class TrackerTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            notesId: '',
            company: '',
            title: '',
            salary: '',
            contactInfo: 333,
            haveIContacted: Boolean,
            haveTheyContacted: Boolean,
            data: [],
            trackerData: {},
            tracker: null,
            modal: false,
            modal2: false,
            notes: '',
            text: '',
            priority: 0,
            editRow: {},
            editTrackerId: '',
            isAdmin: false,







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
    toggle2(e, row) {
        this.setState({
            modal2: !this.state.modal2,
            editRow: row

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



    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    componentWillMount() {
        console.log(this.state.isAdmin)
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


    }
    deleteNotes = () => {
        fetch(`http://localhost:8080/notes/${this.state.notesId}`, {
            method: 'DELETE',

            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),


            })
        })

            .then(res => res.json())

    }
    fetchNotes = (trackerId) => {
        console.log(trackerId)


        fetch(`http://localhost:8080/notes/${trackerId}`, {
            method: 'GET',

            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')

            })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(data)
                    if (data.results) {
                        this.setState({
                            modal2: true,
                            text: data.results.text,
                            priority: data.results.priority,
                            editTrackerId: trackerId,
                            notesId: data.results.id
                        })
                    }
                    else {
                        this.setState({
                            modal2: true,
                            text: '',
                            priority: '',
                            editTrackerId: trackerId,
                            notesId: ''
                        })
                    }

                }
                else {
                    this.setState({
                        modal2: true,
                        text: '',
                        priority: '',
                        editTrackerId: trackerId,
                        notesId: ''
                    })
                }





            })


    }

    rowData = (tracker, notes) => {
        this.setState({
            id: tracker.id,
            company: tracker.company,
            title: tracker.title,
            salary: tracker.salary,
            contactInfo: tracker.contactInfo,
            haveIContacted: tracker.haveIContacted,
            haveTheyContacted: tracker.haveTheyContacted,
            text: tracker.text,
            priority: tracker.priority,




        });
    }
    noteData = (notes) => {
        this.setState({
            id: notes.id,
            text: notes.text,
            priority: notes.priority
        })
    }

    submitNotes = (e, trackerId) => {
        console.log(this.state.editTrackerId)
        e.preventDefault()

        fetch(`http://localhost:8080/notes/create`, {
            method: 'POST',
            body: JSON.stringify({
                notes: {
                    text: this.state.text,
                    priority: this.state.priority,
                    trackerId: this.state.editTrackerId

                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')

            })
        })

            .then(res => (res.json()))
            .then(data => console.log(data))

            .catch(err => console.log(err))
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




    }
    handleSubmit = (event, trackerId) => {
        event.preventDefault()
        fetch(`http://localhost:8080/tracker/${this.state.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                company: this.state.company,
                title: this.state.title,
                salary: this.state.salary,
                contactInfo: this.state.contactInfo,
                haveIContacted: this.state.haveIContacted,
                haveTheyContacted: this.state.haveTheyContacted
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')

            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .then(data => this.setState({ data: data.results }))
            .then((data) => {
                this.setState({ updatePressed: false, trackerData: trackerId })
                console.log(this.state.trackerData)

            })
    }
    updateNotes = (event) => {
        event.preventDefault()
        fetch(`http://localhost:8080/notes/${this.state.notesId}`, {
            method: 'PUT',
            body: JSON.stringify({
                text: this.state.text,
                priority: this.state.priority

            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')

            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .then(data => this.setState({ data: data.results }))

    }
    handleSubmit2 = (event, notesId) => {
        console.log(this.state)
        event.preventDefault()
        fetch(`http://localhost:8080/notes/${this.state.notesId}`, {
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
            .then((res) => res.json())

            .then(data => {
                this.setState({ updatePressed: false, notesData: notesId })
                console.log(data)

            })

    }



    render() {
        console.log(this.state.data)
        console.log(this.state.isAdmin)


        return (




            <div id='tb'>




                <TableContainer className='Tb' component={Paper}>
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

                                    <TableCell align="right">{row.company}</TableCell>
                                    <TableCell align="right">{row.title}</TableCell>
                                    <TableCell align="right">{row.salary}</TableCell>
                                    <TableCell align="right">{row.contactInfo}</TableCell>
                                    <TableCell align="right">{row.haveIContacted ? 'Yes' : 'No'} </TableCell>
                                    <TableCell align="right">{row.haveTheyContacted ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="right"><Button variant="outlined" id={row.id} color='primary' onClick={(e) => { this.fetchNotes(row.id) }}>
                                        Notes
                                    </Button></TableCell>
                                    <TableCell align="right"><Button variant="outlined" color='secondary' onClick={() => { this.toggle(); this.rowData(row) }}>
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



                                <Form onSubmit={this.handleSubmit}>




                                    <FormGroup>
                                        <Label for="company">Company</Label>
                                        <Input id="li_company" type="text" name="company" value={this.state.company} placeholder='Enter Companies Name' onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="title">Title</Label>
                                        <Input id="li_title" type="text" name="title" value={this.state.title} placeholder='Enter the Title' onChange={this.handleChange} />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="salary">Salary</Label>
                                        <Input id="li_salary" type="text" name="salary" value={this.state.salary} placeholder='Enter the Salary' onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="contactInfo">Contact Info</Label>
                                        <Input id="li_contactInfo" type="text" name="contactInfo" value={this.state.contactInfo} placeholder='Enter Contact Info' onChange={this.handleChange} />
                                    </FormGroup>
                                    <h5>Have I contacted</h5>
                                    <ButtonGroup name='haveIContacted' value={this.state.haveIContacted}>
                                        <Button color="success" onClick={(event) => this.onRadioBtnClick(true, 'haveIContacted')} active={this.state.haveIContacted === true}>Yes</Button>
                                        <Button color="danger" onClick={(event) => this.onRadioBtnClick(false, 'haveIContacted')} active={this.state.haveIContacted === false}>No</Button>

                                    </ButtonGroup>
                                    <h5>Have they contacted</h5>
                                    <ButtonGroup name='haveTheyContacted' value={this.state.haveIContacted}>
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


                                <Form onSubmit={this.submitNotes} >
                                    <FormGroup>
                                        <Label for="notes">Write your notes!</Label>
                                        <Input id="li_notes" type="text" name="text" value={this.state.text} onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="priority">Priority</Label>
                                        <Input id="li_priority" type="text" name="priority" value={this.state.priority} onChange={this.handleChange} />
                                    </FormGroup>




                                    <h6>Add your notes</h6>
                                    <Button type="submit" > Add Notes </Button>
                                    <Button type='button' onClick={this.deleteNotes}>Delete your notes</Button>
                                    <Button type='button' onClick={this.updateNotes}>Update your notes</Button>


                                </Form>
                            </ModalBody>
                        </Modal>

                    </Table>

                </TableContainer>


            </div>

        )

    };

}
export default TrackerTable;




