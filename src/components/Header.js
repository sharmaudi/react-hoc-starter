import React from 'react'

import {Collapse, Nav, Navbar, NavbarToggler, NavItem, Button} from 'reactstrap';
import {Link} from "react-router-dom"
import { connect } from 'react-redux'
import {logout,login} from "../actions/index"

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    loginButton() {
        const {isAuthenticated, login, logout} = this.props

        if(isAuthenticated) {
           return (
            <NavItem>
                <Button color="danger" onClick={logout}>Logout</Button>
            </NavItem>
        )
        } else {
            return (<NavItem>
                <Button color="success" onClick={login}>Login</Button>
            </NavItem>)
        }

    }

    render() {

        console.log(this.props)
        return (
            <div>
                <Navbar color="faded" light toggleable>
                    <NavbarToggler right onClick={this.toggle}/>
                    <Link className="navbar-brand" to="/">MyApp</Link>
                    <Collapse isOpen={this.state.isOpen} navbar>

                        <Nav navbar>
                            <NavItem>
                                <Link className="nav nav-link" to="/protected/">Protected</Link>
                            </NavItem>
                        </Nav>

                        <Nav className="ml-auto" navbar>
                            {this.loginButton()}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}


function mapStateToProps ({ auth }) {
    return {
        isAuthenticated: auth.isAuthenticated
    }
}


function mapDispatchToProps ( dispatch ) {
    return {
        login: () => dispatch(login()),
        logout: () => dispatch(logout())
    }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(Header)