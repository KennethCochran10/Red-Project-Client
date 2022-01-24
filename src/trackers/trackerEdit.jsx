import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ButtonGroup } from 'reactstrap';


class TrackerEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            company: '',
            title: '',
            salary: '',
            contactInfo: '',
            haveIContacted: true,
            haveTheyContacted: false,
            updatePressed: false,
            trackerToUpdate: {}
        };
    }

    fetchEdit = (event, tracker) => {
        fetch(`http://localhost:8080/tracker/edit/${this.state.id}`, {
            method: 'PUT',
            body: JSON.stringify({ log: tracker }),
            headers: new Headers({
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')

            })
        })
            .then((res) => {
                this.setState({ updatePressed: false })

            })
    }

    setUpdatedTracker = (event, tracker) => {
        this.setState({
            trackerToUpdate: tracker,
            updatePressed: true
        })
    }

    // componentDidMount() {
    //     this.setState({
    //         id: this.props.tracker.id,
    //         company: this.props.tracker.company,
    //         title: this.props.tracker.title,
    //         salary: this.props.tracker.salary,
    //         contactInfo: this.props.tracker.contactInfo,
    //         haveIContacted: this.props.tracker.haveIContacted,
    //         haveTheyContacted: this.haveTheyContacted

    //     })
    // }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.update(event, this.state)
    }



    render() {
        return (
            <div>
                <h1>
                    Tracker edit
                </h1>
                {/* <Modal isOpen={true}>
                    <ModalHeader> Update your trackers!</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.fetchTracker} >

                            <FormGroup>
                                <Label for="company">Company</Label>
                                <Input id="li_company" type="text" name="company" value={this.state.company} placeholder="enter username" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="li_title" type="password" name="title" placeholder="enter title" onChange={this.handleChange} />
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





                        </Form>
                    </ModalBody>
                </Modal> */}
            </div >
        )
    }
}

export default TrackerEdit;
