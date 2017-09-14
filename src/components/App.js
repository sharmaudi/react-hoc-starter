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

// when the url matches `/tacos` this component renders
const Protected  = ({ match }) => (
  // here's a nested div
  <div>
    {/* here's a nested Route,
        match.url helps us make a relative path */}
    <Route
      path={match.url + '/1'}
      render={(props) => (
          <h1>Protected Page 1</h1>
      )}/>
      <Route
      path={match.url + '/2'}
      render={(props) => (
          <h1>Protected Page 2</h1>
      )}/>
  </div>
)


const ProtectedWithAuth = auth(Protected)

function mapStateToProps ({ auth }) {
    return {
        isAuthenticated: auth.isAuthenticated
    }
}


export default connect(
  mapStateToProps
)(App)