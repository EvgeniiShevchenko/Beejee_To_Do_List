import React from "react";
import {Input, Collapse, Button, Form, FormGroup, Label} from 'reactstrap';

class Login extends React.Component {
    constructor(){
        super();
        this.loginactive = this.loginactive.bind(this)
    }

    loginactive(event){
        this.props.login_button_submit_press(event)
    }

    render (){
        const {emailfild, passwordfild, is_login_button_active} = this.props; //props and is_login_button_active from navbar
        const {change_login_email_filds, change_login_password_fild, loginUser, login_button_press} = this.props; //actions and login_button_press from navbar
        const submit_request_data = {"login": emailfild, "password": passwordfild};

        return (
            <>
                <Collapse isOpen={is_login_button_active}>
                    <section >
                        <div className = "login-sec">
                            <h2 className="text-center">Login Now</h2>
                            <Form>
                                <FormGroup>
                                    <Label for="email_fild" className="text-uppercase">Username</Label>
                                    <Input  onChange = {(event) => change_login_email_filds(event.target.value)} name = "email_fild" value = {emailfild} type="text" className="form-control" placeholder="Admin" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="pasword_fild" className="text-uppercase">Password</Label>
                                    <Input  onChange = {(event) => change_login_password_fild(event.target.value)} autoComplete="pasword_fild" name = "pasword_fild" value = {passwordfild} type="password" className="form-control" placeholder="123" />
                                </FormGroup>
                            </Form>
                            <Button size="sm" onClick = {() =>{ loginUser(submit_request_data); login_button_press(is_login_button_active)}}  outline color="info">Submit</Button>
                        </div>
                    </section>
                </Collapse>
            </>
        )
    }
}

export default Login;