import React from 'react'

import {Button, Collapse, Nav, Navbar, NavbarToggler, NavItem} from 'reactstrap';
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {login, logout} from "../actions/index"

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

        if (isAuthenticated) {
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

        const {isAuthenticated} = this.props
        return (
            <div>
                <Navbar color="faded" light toggleable>
                    <NavbarToggler right onClick={this.toggle}/>
                    <Link className="navbar-brand" to="/">MyApp</Link>
                    <Collapse isOpen={this.state.isOpen} navbar>

                        {isAuthenticated && <AuthenticatedOnlyNav/>}

                        <Nav className="ml-auto" navbar>
                            {this.loginButton()}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const AuthenticatedOnlyNav = () => (
    <Nav navbar>
        <NavItem>
            <Link className="nav nav-link" to="/protected/1">Page1</Link>
        </NavItem>
        <NavItem>
            <Link className="nav nav-link" to="/protected/2">Page2</Link>
        </NavItem>
    </Nav>
)


function mapStateToProps({auth}) {
    return {
        isAuthenticated: auth.isAuthenticated
    }
}


function mapDispatchToProps(dispatch) {
    return {
        login: () => dispatch(login()),
        logout: () => dispatch(logout())
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Header)