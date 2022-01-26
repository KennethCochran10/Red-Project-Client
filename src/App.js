import React, { Component } from "react";
import SiteBar from "./home/SiteBar";
import Auth from './auth/Auth';
import Admin from "./auth/Admin";
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from 'react-router-dom';
import TrackerTable from "./trackers/trackerTable";
import TrackerCreate from './trackers/trackerCreate';
import TrackerEdit from "./trackers/trackerEdit";
import TrackerDelete from "./trackers/trackerDelete";
import NotesTable from "./notes/notesTable";
import notesCreate from './notes/notesCreate'
import { color } from "@mui/system";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      sessionToken: '' //1
    }
  }
  logout = () => {
    this.setState({
      sessionToken: '',
    });
    localStorage.clear();
  }

  componentWillMount() {
    const token = localStorage.getItem('token'); //4
    if (token && !this.state.sessionToken) { //5 
      this.setState({ sessionToken: token });
    }
  }

  setSessionState = (token, user) => {
    localStorage.setItem('token', token); //3
    this.setState({
      sessionToken: token,
      user: user
    });
  }

  render() {
    return (
      <Router>
        <div>
          <SiteBar clickLogout={this.logout} />




          <Routes>
            <Route exact element={localStorage.getItem('token') && this.state.user?.isAdmin ? <Admin /> : <Auth setToken={this.setSessionState} />} path='/userinfo' />

            <Route exact element={localStorage.getItem('token') ? < TrackerTable token={this.state.sessionToken} fetchNotes={this.props.fetchNotes} /> : <Auth setToken={this.setSessionState} />} path='/' />

            <Route exact element={localStorage.getItem('token') ? <TrackerCreate fetchNotes={this.props.fetchNotes} /> : <Auth setToken={this.setSessionState} />} path='/TrackerCreate' />
            {/*<Route exact element={localStorage.getItem('token') ? <TrackerDelete /> : <Auth setToken={this.setSessionState} />} path='/TrackerDelete' />*/}
            <Route exact element={localStorage.getItem('token') ? <TrackerEdit /> : <Auth setToken={this.setSessionState} />} path='/TrackerEdit' />


          </Routes>


        </div>
      </Router>
    );
  }
}

export default App;