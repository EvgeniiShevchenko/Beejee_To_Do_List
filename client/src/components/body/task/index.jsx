import React from "react";
import {Dropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Collapse, Table, Container, 
    Pagination, PaginationItem, PaginationLink, Row, Col, Button} from 'reactstrap';
import Newtask from "./create_task/container";

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.delete_task = this.delete_task.bind(this);
        this.status_toggle = this.status_toggle.bind(this);
        this.content_change = this.content_change.bind(this);
        this.pagination_count = this.pagination_count.bind(this);
        this.button_task_update_press = this.button_task_update_press.bind(this);
        this.state = {
            dropdownOpen: false,
            status_togle: false,
            isOpened: [],
            table: [],
            task_change: [],
            count_pagins: [],
            count_pages: 0
        };
    }

    // Переключатель выпадающего меню с выбором способа сортировки задач
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    // Переключатель выпадающего меню с выбором статуса задачи
    status_toggle = (dropdownIndex) => {
        this.state.isOpened[dropdownIndex] = !this.state.isOpened[dropdownIndex];
        this.setState({ isOpened: this.state.isOpened })
    };

    delete_task(TaskId){
            setTimeout(() => {
                this.componentDidMount();
                
            }, 1000);
            setTimeout(() => {
                
                this.props.task_delete_from_list(TaskId);
            }, 0);

    }

    // Отслеживание изменений при редактировании задачи и реакция на них
    content_change(index, pervstate, event) {
        const name_event = event.target.name;
        const value_event = event.target.value;

        // Запись данных задчи в временную таблицу
        this.state.table[name_event + index] = value_event;
        this.state.task_change[name_event + index] = pervstate !== value_event;
        this.setState({ task_change: this.state.task_change })
    }

    // Логика управления пагинацией (при переключении перезаписывает масив по адресу this.state.count_pages)
    pagination_count(curent_page){
        const newarray = [];
        const page = curent_page + 1;
        if(this.state.count_pages - curent_page > 5){
            for(let i = curent_page; i < page + 5; i++ ){
                newarray.push(i);
            }
        }else{
            const count = this.state.count_pages - curent_page + 1;
            for(let i = curent_page; i < curent_page + count; i++ ){
                newarray.push(i);
            }
        }
        this.setState({count_pagins: newarray});
    }

    button_task_update_press(idTask, newtask, index) {

        // Обновление задачи
        this.props.task_updated(idTask, newtask);

        // Отключение активной кнопки Update при наличии записи о ней в User + Index
        this.state.task_change["User" + index] = (() => {
            if(this.state.task_change["User" + index]){
                return false
            }
        })();

        // Отключение активной кнопки Update при наличии записи о ней в Email + Index
        this.state.task_change["Email" + index] = (() => {
            if(this.state.task_change["Email" + index]){
                return false
            }
        })();

        // Отключение активной кнопки Update при наличии записи о ней в Task + Index
        this.state.task_change["Task" + index] = (() => {
            if(this.state.task_change["Task" + index]){
                return false
            }
        })();

        // Перезапись данных в state
        this.setState({ task_change: this.state.task_change })
    }

        
    componentDidMount(){
        (async () => {
            // Запрос к базе данных на получение количества хранящихся задач
            fetch("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/app-gzhil/service/http/incoming_webhook/task_count", {method: "GET"})
            .then(response => response.json())
            .then(count => (parseInt(count.$numberLong)))
            .then(number => {
                const task_count = [];
                for(var i = 1; i < Math.ceil(number / this.props.page_size + 1); ++i ){
                task_count.push(i);
            }
                this.setState({count_pagins: task_count, count_pages: task_count.length});
            })
            .catch(error => console.error(error))

            // Отображение списка задач
            this.props.task_displaed_to_scren(this.props.filter);

        })()
    }

render () {

    const {buttom_create_pres, task, page_size, current_page, filter, is_login} = this.props; //Props and is_login from navbar/login
    const {button_task_create, change_sort_type, button_task_pagination_pres, pagination_task_request,
          change_status_completed} = this.props; //Actions
        if(task.length > 3){
            this.componentDidMount();
        }
    const task_item = (is_login) => {
        return task.map((task, index) => {
            // Присвоение данных с временной таблице по индексу задачи
            const newtask = {
                "User": this.state.table["User" + index],
                "Email": this.state.table["Email" + index],
                "Task": this.state.table["Task" + index]
            };
            return (
                <tr key = {task._id} id = {task._id} suppressContentEditableWarning={true}>

                    {/* Нумерация заданий */}
                    <td><b>{index + ((current_page * 3 - 3) + 1)}</b></td>
                    
                    {/* Поле с иминем Name с переменной средой для Admin */}
                    {is_login ? <td><textarea defaultValue = {task.User} name = "User" style = {{borderWidth: 0, overflow: "hidden"}} 
                    onChange = {(event) => this.content_change(index, task.User, event)}></textarea></td> : <td>{task.User}</td>}

                    {/* Поле с иминем Email с переменной средой для Admin */}
                    {is_login ? <td><textarea defaultValue = {task.Email} name = "Email" style = {{borderWidth: 0, overflow: "hidden"}} 
                    onChange = {(event) => this.content_change(index, task.Email, event)}></textarea></td> : <td>{task.Email}</td>}

                    {/* Поле с иминем Task с переменной средой для Admin */}
                    {is_login ? <td><textarea defaultValue = {task.Task} name = "Task" style = {{resize: "both", borderWidth: 0, overflow: "hidden"}} 
                    cols="30" rows = "2" onChange = {(event) => this.content_change(index, task.Task, event)}></textarea></td> : <td>{task.Task}</td>}

                    {/* Поле с иминем Status с переменной средой для Admin */}
                    <td>
                        <Dropdown  direction="down" isOpen={this.state.isOpened[index]} toggle={is_login ? () => this.status_toggle(index) : null}>
                            <DropdownToggle caret = {is_login ? true : false} style = {!is_login ? {borderColor: "white"} : {}}  
                            disabled = {is_login ? false : true}   outline color={task.Status === "Active" ? "success" : task.Status === "Completed" ? "primary" : "warning"}>
                            {task.Status}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem name = "Completed" onClick = {(event) => change_status_completed(task._id, event.target.name)}>Completed</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem name = "Failed" onClick = {(event) => change_status_completed(task._id, event.target.name)}>Failed</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem name = "Active" onClick = {(event) => change_status_completed(task._id, event.target.name)}>Active</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </td>
                    
                    {/* Елементы управления Admin */}
                    <td style = {{display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                        {is_login?<div><Button  onClick = {() => this.delete_task(task._id)} color="danger">Delete</Button></div>:null}

                        {/* Отслеживание активных изменений при редактировании задачи */}
                        {this.state.task_change["User" + index] || this.state.task_change["Email" + index] || this.state.task_change["Task" + index] ? 
                            <div><Button onClick = {() =>this.button_task_update_press(task._id, newtask, index)}  color="primary" style = {{marginTop: "30px"}}>Update</Button></div>
                                : null}
                    </td>
                </tr>
            )
        });
    };

    const countpagination = (count_task, page_size, current_page) => {
        return count_task.map((pagins, index) => {
            // Отображает не больше 5-ти елементов пагинации
            if(pagins === current_page & index < 5){
                return (
                    <PaginationItem active key = {pagins}>
                        <PaginationLink onClick = {() => {button_task_pagination_pres(pagins); this.pagination_count(pagins); pagination_task_request(pagins, page_size, filter)}}>
                            {pagins}
                        </PaginationLink>
                    </PaginationItem>
                )
            }else if(pagins !== current_page & index < 5){
                return (
                    <PaginationItem key = {pagins}>
                        <PaginationLink onClick = {() => {button_task_pagination_pres(pagins); this.pagination_count(pagins); pagination_task_request(pagins, page_size, filter)}}>
                            {pagins}
                        </PaginationLink>
                    </PaginationItem>
                )
            }else {
                return null
            }
        })
    };

    const pagination_previous = () => {
        if(current_page === 1){
            return(
                <PaginationItem disabled>
                    <PaginationLink previous onClick = {() => {button_task_pagination_pres(current_page); pagination_task_request(current_page, page_size, filter)}} />
                </PaginationItem>
            )
        }else{
            return (
                <PaginationItem>
                    <PaginationLink previous onClick = {() => {button_task_pagination_pres(current_page - 1); this.pagination_count(current_page - 1); pagination_task_request(current_page - 1, page_size, filter)}} />
                </PaginationItem>
            )
        }
    };

    const pagination_next = () => {
        if(current_page === this.state.count_pages){
            return(
                <PaginationItem disabled>
                    <PaginationLink next onClick = {() => {button_task_pagination_pres(current_page); pagination_task_request(current_page, page_size, filter)}} />
                </PaginationItem>
            )
        }else{
            return (
                <PaginationItem>
                    <PaginationLink next onClick = {() => {button_task_pagination_pres(current_page + 1); this.pagination_count(current_page + 1); pagination_task_request(current_page + 1, page_size, filter)}} />
                </PaginationItem>
            )
        }
    };

    const pagination_first = () => {
        if(current_page === 1){
            return(
                <PaginationItem disabled>
                    <PaginationLink first onClick = {() => {button_task_pagination_pres(current_page); pagination_task_request(current_page, page_size, filter)}} />
                </PaginationItem>
            )
        }else{
            return (
                <PaginationItem>
                    <PaginationLink first onClick = {() => {button_task_pagination_pres(1); this.pagination_count(1); pagination_task_request(1, page_size, filter)}} />
                </PaginationItem>
            )
        }
    };

    const pagination_last = () => {
        if(current_page === this.state.count_pages){
            return(
                <PaginationItem disabled>
                    <PaginationLink last onClick = {() => {button_task_pagination_pres(current_page); pagination_task_request(current_page, page_size, filter)}} />
                </PaginationItem>
            )
        }else{
            return (
                <PaginationItem>
                    <PaginationLink last onClick = {() => {button_task_pagination_pres(this.state.count_pages); this.pagination_count(this.state.count_pages); pagination_task_request(this.state.count_pages, page_size, filter)}} />
                </PaginationItem>
            )
        }
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <div style={{display: "flex", justifyContent: "flex-end", marginBottom: "-43px"}}>
                            <div className="item">
                                <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle outline color="secondary" caret>
                                        {filter === "_id" ? "Filter" : filter}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem name = "User" onClick = {(event) => {change_sort_type(event.target.name); pagination_task_request(1, page_size, event.target.name)}}>Name</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem name = "Email" onClick = {(event) => {change_sort_type(event.target.name); pagination_task_request(1, page_size, event.target.name)}}>Email</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem name = "Task" onClick = {(event) => {change_sort_type(event.target.name); pagination_task_request(1, page_size, event.target.name)}}>Task</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem name = "Status" onClick = {(event) => {change_sort_type(event.target.name); pagination_task_request(1, page_size, event.target.name)}}>Status</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </div>
                        </div>
                        <Table>
                            <thead> 
                                <tr>
                                    <th>Number</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Task</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {task_item(is_login)}
                            </tbody>
                        </Table>
                        <Collapse isOpen={buttom_create_pres}>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <Button onClick={()=> {button_task_create(buttom_create_pres)}} className = "item"
                                    color="success" size="lg"><i className="far fa-plus-square"></i>{` Add new
                                    task`}</Button>
                            </div>
                        </Collapse>
                    </Col>
                    <Newtask />
                </Row>
                <br />
                    <div style = {{display: "flex", justifyContent: "center"}}>
                        <Pagination className = "item" size="lg">
                            {pagination_first()}
                            {pagination_previous()}
                            {countpagination(this.state.count_pagins, page_size, current_page)}
                            {pagination_next()}
                            {pagination_last()}
                        </Pagination>
                    </div>
            </Container>
        </>)
    }
};

export default Task;