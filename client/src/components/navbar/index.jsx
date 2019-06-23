import React from "react";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Input, Button} from 'reactstrap';
import {CSSTransitionGroup} from 'react-transition-group';
import Login from "./login/container";


class NavBar extends React.Component {
render(){
    const {searchstring, is_login_button_active, is_login} = this.props; //props and is_login from login
    const {login_button_press, searchaction, logOutUser, search_request_from_header} = this.props; //actions and logOutUser from login and search_request_from_header from task

    const searchbutton = () => {
        if(searchstring){
            return (
                <Button onClick = {() => search_request_from_header(searchstring)} outline color="info">Search</Button>
            )
        }
    };
    const login_grup = () => {
        if(!is_login){
            return (
                <Button onClick={()=> login_button_press(is_login_button_active)} outline color="info">Login</Button>
            )
        }else if(is_login){
            return (
                <Button onClick = {logOutUser}  outline color="warning">Logout</Button>
                )
            }
        };
return (
            <>
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="https://reactstrap.github.io/">reactstrap</NavbarBrand>
                            <Input value = {searchstring} onChange={(event) => searchaction(event.target.value)} placeholder = "Example: смартфон"  type = "text" className="search-input" />
                            <CSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={5000} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                {searchbutton()}
                            </CSSTransitionGroup>
                        <NavbarToggler/>
                        <Collapse navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/presentation/"></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="https://github.com/EvgeniiShevchenko/Beejee_To_Do_List">GitHub</NavLink>
                                </NavItem>
                                {login_grup()}
                            </Nav>
                        </Collapse>
                        <Login />
                    </Navbar>
                </div>
            </>
        )
    }
}

export default NavBar;