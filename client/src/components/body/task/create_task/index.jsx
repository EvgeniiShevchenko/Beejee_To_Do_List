import React from "react";
import {Alert, Collapse, Input, InputGroup, InputGroupAddon,  Col, Button, Form, FormGroup} from 'reactstrap';
import is_ampty from "../../../../store/validations/is-ampty";

class Newtask extends React.Component {
    constructor(props){
        super(props)

        this.task_form_validate = this.task_form_validate.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onDismiss_default = this.onDismiss_default.bind(this);
        this.state = {
            visible: false
        }
    }

    task_form_validate(data){
        this.props.task_validation(data);
        setTimeout(() => {
            if(!is_ampty(this.props.error.errors)){
               const User_ampty =  !is_ampty(this.props.error.errors.User) ? this.props.change_create_task_name_fild(this.props.error.errors.User) : null;
               const Email_ampty =  !is_ampty(this.props.error.errors.Email) ? this.props.change_create_task_email_fild(this.props.error.errors.Email) : null;
               const Task_ampty =  !is_ampty(this.props.error.errors.Task) ? this.props.change_create_task_content_fild(this.props.error.errors.Task) : null;
            }else{
                this.props.task_is_valid();
            }
        }, 0);
    }

    onDismiss(state) {
        this.setState({ visible: !state });
    }

    onDismiss_default() {
        this.setState({ visible: false });
    }

    render (){

        const {name, email, task, error, buttom_create_pres} = this.props; //Props and buttom_create_pres from task
        const {change_create_task_content_fild, change_create_task_email_fild, change_create_task_name_fild, clear_task_form, post_new_task, task_is_invalid, button_task_create} = this.props; //Actions and post_new_task, button_task_create from task
        const new_task = {
            "User": name.charAt(0).toUpperCase() + name.substr(1),
            "Email": email.charAt(0).toLowerCase() + email.substr(1),
            "Task": task.charAt(0).toUpperCase() + task.substr(1),
            "Status": "Active"
        };
        return (
            <>  
                <div className = "offset-4 col-4">
                    <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                    {error.errors.User ? "You mast fill fild User correctly!": null}<br />
                    {error.errors.Email ? `You mast fill fild Email correctly! `: null}<br />
                    {error.errors.Task ? `You mast fill fild Task correctly! `: null}<br />
                    </Alert>
                </div>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Collapse isOpen = {!buttom_create_pres}>
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Your name:</InputGroupAddon>
                                    <Input name = "name" style = {name === "User can not be left blank" ? {color: "red"} : null} onClick = {(event) => clear_task_form(error.isValid, event)} type = "text" onChange = {(event) => change_create_task_name_fild(event.target.value)} value = {name} placeholder="Axample: Ivan " />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Your email:</InputGroupAddon>
                                    <Input type = "email" style = {email === "Email can not be left blank" || email === "Email is invalid" ? {color: "red"} : null} name = "email" onClick = {(event) => clear_task_form(error.isValid, event)} onChange = {(event) => change_create_task_email_fild(event.target.value)} value = {email} placeholder="Axample: ivan.ivanich@gmail.com" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Task text:&nbsp;&nbsp;&nbsp;</InputGroupAddon>
                                    <Input type = "textarea" name = "task" style = {task === "Task is required" ? {color: "red"} : null} onClick = {(event) => clear_task_form(error.isValid, event)} onChange = {(event) => change_create_task_content_fild(event.target.value)} value = {task} placeholder="Axample: Пойти купить печенька и молока" />
                                </InputGroup>
                            </FormGroup>
                            <div style = {{display: "flex", justifyContent: "space-between"}}>
                                <Button onMouseEnter = {() => this.task_form_validate(new_task)} color={error.isValid === true ? "success" : "secondary"} onClick = {error.isValid === true ? (event) => {post_new_task(new_task); button_task_create(buttom_create_pres); clear_task_form(error.isValid, event); task_is_invalid(); this.onDismiss_default()} : (event) => {event.preventDefault(); this.onDismiss(this.state.visible)} }>Submit</Button>
                                <Button color="secondary" onClick = {(event) => {button_task_create(buttom_create_pres); clear_task_form(error.isValid, event); task_is_invalid(); this.onDismiss_default()}}>Cansel</Button>
                            </div>
                        </Form>
                    </Collapse>
                </Col>
            </>
        )
    }
}

export default Newtask;