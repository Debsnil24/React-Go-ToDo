import React,{Component} from "react";
import Axios from "axios";
import {Card, Header, Form, Input, Icon} from "semantic-ui-react";

let endpoint  = "http://localhost:9000";

class ToDoList extends Component{
    constructor(props){
        super(props);

        this.state = {
            task:"",
            items:[],
        };
    }

    onChange = (Event) => {
        this.setState({
            [Event.target.name] : Event.target.value
        })
    };

    onSubmit = () => {
        let {task} = this.state;

        if (task) {
            Axios.post(endpoint + "/api/task/create",
                {task,},
                {Headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                }},
            ).then((res) => {
                this.getTask();
                this.setState({
                    task:" ",
                });
                console.log(res)
            });
        }
    };

    getTask = ()=>{
        Axios.get(endpoint + "/api/task").then((res)=>{
            if (res.data){
                this.setState({
                    items: res.data.map((item)=>{
                        let color = "yellow";
                        let style = {
                            wordWarp: "break-word",
                        };

                        if (item.status) {
                            color = "green";
                            style["textDecorationLine"] = "line-through";
                        }
                        return(
                            <Card key={item._id} color = {color} fluid className="rough">
                                <Card.Content>
                                    <Card.Header textAlign="left">
                                        <div style={style}>{item.task}</div>
                                    </Card.Header>
                                    <Card.Meta textAlign="right">
                                        <Icon 
                                        name="check circle" 
                                        color="blue" 
                                        onClick={() => this.updateTask(item._id)}
                                        />
                                        <span style={{paddingRight: 10}}>Undo</span>
                                        <Icon
                                        name="delete"
                                        color="red"
                                        onClick={() => this.deleteTask(item._id)}
                                        />
                                        <span style={{paddingRight: 10}}>Delete</span>

                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        );
                    }),
                });
            } else {
                this.setState({
                    items:[],
                });
            }
        });
    };

    updateTask = (id) => { 
        Axios.put(endpoint + "/api/Comptask" + id, {
            Headers: {
                "Content-Type" : "application/x-www-form-urlencoded",
            },
        }).then((res)=>{
            console.log(res);
            this.getTask();
        });
    }

    undoTask = (id) => {
        Axios.put(endpoint + "/api/Undotask" + id, {
            Headers: {
                "Content-Type" : "application/x-www-form-urlencoded",
            },
        }).then((res)=>{
            console.log(res);
            this.getTask();
        });
    }
    deleteTask = (id => {
        Axios.delete(endpoint + "/api/Deltask" + id, {
            Headers: {
                "Content-Type" : "application/x-www-form-urlencoded",
            },
        }).then((res) =>{
            console.log(res);
            this.getTask();
        });
    })

    componentDidMount() {
        this.getTask();
    }

    render() {
        return(
            <div>
                <div className="row"> 
                    <Header className="header" as="h2" color="yellow">
                        TO-DO List
                    </Header>
                </div>
                <div className="row">
                    <Form onSubmit={this.onSubmit}>
                        <Input 
                        type="text"
                        name="task"
                        onChange={this.onChange}
                        value={this.state.task}
                        fluid
                        placeholder="Create a Task"
                        />
                        {/*<Button>Create Task</Button>*/}
                    </Form>
                </div>
                <div className="row">
                    <Card.Group>{this.state.items}</Card.Group>
                </div>
            </div>
        );
    }
}

export default ToDoList;