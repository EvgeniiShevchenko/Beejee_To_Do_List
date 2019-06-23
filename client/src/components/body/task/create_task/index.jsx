import React from "react";
import {Collapse, Input, InputGroup, InputGroupAddon,  Col, Button, Form, FormGroup} from 'reactstrap';

class Newtask extends React.Component {
    render (){

        const {name, email, task , buttom_create_pres} = this.props; //Props and buttom_create_pres from task
        const {change_create_task_content_fild, change_create_task_email_fild, change_create_task_name_fild, post_new_task , button_task_create} = this.props; //Actions and post_new_task, button_task_create from task
        const new_task = {
            "User": name,
            "Email": email,
            "Task": task,
            "Status": "Active"
        };
        return (
            <>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Collapse isOpen = {!buttom_create_pres}>
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Your name:</InputGroupAddon>
                                    <Input type = "text" onChange = {(event) => change_create_task_name_fild(event.target.value)} value = {name} placeholder="Axample: Ivan " />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Your email:</InputGroupAddon>
                                    <Input type = "email" onChange = {(event) => change_create_task_email_fild(event.target.value)} value = {email} placeholder="Axample: ivan.ivanich@gmail.com" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Task text:&nbsp;&nbsp;&nbsp;</InputGroupAddon>
                                    <Input type = "textarea" onChange = {(event) => change_create_task_content_fild(event.target.value)} value = {task} placeholder="Axample: Пойти купить печенька и молока" />
                                </InputGroup>
                            </FormGroup>
                            <div style = {{display: "flex", justifyContent: "space-between"}}>
                                <Button color="success" onClick = {() => {post_new_task(new_task); button_task_create(buttom_create_pres)}}>Submit</Button>
                                <Button color="secondary" onClick = {() => button_task_create(buttom_create_pres)}>Cansel</Button>
                            </div>
                        </Form>
                    </Collapse>
                </Col>
            </>
        )
    }
}

export default Newtask;