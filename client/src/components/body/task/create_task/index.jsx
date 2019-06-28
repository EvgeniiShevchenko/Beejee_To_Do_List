import React from "react";
import {Alert, Collapse, Input, InputGroup, InputGroupAddon,  Col, Button, Form, FormGroup} from 'reactstrap';
import task_post from "../../../../store/validations/task-post";
import is_ampty from "../../../../store/validations/is-ampty";

class Newtask extends React.Component {
    constructor(props){
        super(props)

        this.task_form_validate = this.task_form_validate.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.state = {
            visible: false
        }
    }

    task_form_validate(data, login_valid){
        const numer = task_post(data);
        if(!is_ampty(numer.errors)){
            this.props.validation_task_post(false);
            this.props.task_invalid(true);
           const User_ampty =  !is_ampty(numer.errors.User) ? this.props.change_create_task_name_fild(numer.errors.User) : null;
           const Email_ampty =  !is_ampty(numer.errors.Email) ? this.props.change_create_task_email_fild(numer.errors.Email) : null;
           const Task_ampty =  !is_ampty(numer.errors.Task) ? this.props.change_create_task_content_fild(numer.errors.Task) : null;
        }else{
            this.props.validation_task_post(true);
            this.props.task_invalid(false);
        }
    }

    onDismiss(state) {
        this.setState({ visible: !state });
    }

    render (){

        const {name, email, task, error, valid_task, buttom_create_pres} = this.props; //Props and buttom_create_pres from task
        const {change_create_task_content_fild, change_create_task_email_fild, clear_task_form, switch_off_task_valid, change_create_task_name_fild, post_new_task, button_task_create} = this.props; //Actions and post_new_task, button_task_create from task
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
                    Noooooo you mast fill this form correctly!
                    </Alert>
                </div>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Collapse isOpen = {!buttom_create_pres}>
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Your name:</InputGroupAddon>
                                    <Input name = "name" onClick = {(event) => clear_task_form(error, event)} type = "text" onChange = {(event) => change_create_task_name_fild(event.target.value)} value = {name} placeholder="Axample: Ivan " />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Your email:</InputGroupAddon>
                                    <Input type = "email" name = "email" onClick = {(event) => clear_task_form(error, event)} onChange = {(event) => change_create_task_email_fild(event.target.value)} value = {email} placeholder="Axample: ivan.ivanich@gmail.com" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Task text:&nbsp;&nbsp;&nbsp;</InputGroupAddon>
                                    <Input type = "textarea" name = "task" onClick = {(event) => clear_task_form(error, event)} onChange = {(event) => change_create_task_content_fild(event.target.value)} value = {task} placeholder="Axample: Пойти купить печенька и молока" />
                                </InputGroup>
                            </FormGroup>
                            <div style = {{display: "flex", justifyContent: "space-between"}}>
                                <Button onMouseEnter = {() => this.task_form_validate(new_task, valid_task)} color={valid_task === true ? "success" : "secondary"} onClick = {valid_task === true ? (event) => {post_new_task(new_task); button_task_create(buttom_create_pres); clear_task_form(error, event); switch_off_task_valid()} : (event) => {event.preventDefault(); this.onDismiss(this.state.visible)} }>Submit</Button>
                                <Button color="secondary" onClick = {(event) => {button_task_create(buttom_create_pres); clear_task_form(error, event); switch_off_task_valid(this.state.visible); this.onDismiss(this.state.visible)}}>Cansel</Button>
                            </div>
                        </Form>
                    </Collapse>
                </Col>
            </>
        )
    }
}

export default Newtask;