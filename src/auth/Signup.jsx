import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
class Signup extends Component {

    constructor(props) { //2
        super(props)
        this.state = {
            username: '', //1
            password: ''
        };
    }
    //1
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleSubmit = (event) => {
        //1
        fetch("http://localhost:8080/auth/signup", {
            method: 'POST', //2
            body: JSON.stringify({ user: this.state }), //3
            headers: new Headers({
                'Content-Type': 'application/json' //4
            })
        }).then(
            (response) => response.json() //5
        ).then((data) => {
            if (data.sessionToken) {
                this.props.setToken(data.sessionToken)
            }

            //6
        })
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input id="username" type="text" name="username" placeholder="enter username" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Input id="su_password" type="password" name="password" placeholder="enter password" onChange={this.handleChange} />
                    </FormGroup>
                    <Button type='submit' color="warning"> Submit </Button>
                </Form>
            </div>
        )
    }
}

export default Signup;