import React, {Component} from 'react';
import './App.css';
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import auth from './hoc/authentication'


class App extends Component {



    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Route exact path="/" render={(props) => (
                        <Home {...props} isAuthenticated={this.props.isAuthenticated}/>
                    )}/>
                    <Route path="/protected" render={(props) => (
                        <ProtectedWithAuth {...props} testProp="All Good"/>
                    )}/>
                </div>
            </BrowserRouter>
        );
    }
}


const Home = ({isAuthenticated}) => {
    return (
        <p className="App-intro">
            {isAuthenticated &&  (<span>You are now logged in</span>)}
            {!isAuthenticated &&  (<span>You are logged out</span>)}
        </p>
    )
}

const Protected = (props) => {
        return <div className="App-intro">
            <p> This is the Protected component.</p>
            <p> Props: {props.testProp}</p>
        </div>
}


const ProtectedWithAuth = auth(Protected)

function mapStateToProps ({ auth }) {
    return {
        isAuthenticated: auth.isAuthenticated
    }
}


export default connect(
  mapStateToProps
)(App)