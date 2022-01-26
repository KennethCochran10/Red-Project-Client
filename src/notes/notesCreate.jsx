
import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Button, ButtonGroup } from 'reactstrap';




import { Form, FormGroup, Label, Input } from 'reactstrap';



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







    render() {


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