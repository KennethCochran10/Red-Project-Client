import React from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,

    Nav,
    NavItem,
    Button
} from 'reactstrap';

class SiteBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light expand="md">

                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {localStorage.getItem('token') ? <Button color='warning' onClick={() => this.props.clickLogout()}>Logout</Button> : null}
                                <br />
                                <br />
                                {localStorage.getItem('token') ? <Link to='/TrackerCreate'><Button color='primary'>Create </Button></Link> : null}
                                <br />
                                <br />
                                {localStorage.getItem('token') ? <Link to='/'><Button color='primary'>Home</Button></Link> : null}
                                {/*<Link to='/TrackerEdit'><Button color='primary'>Update Tracker</Button></Link>

                                <br />
        <Link to='/TrackerDelete'><Button color='primary'>Delete Tracker</Button></Link>*/}


                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default SiteBar;