import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

// functional stateless components

// const ToDo = (props) => {
//     return (
//             <li>
//                 {props.todo}
//             </li>
//     );
// }

const ToDo = ({item, toggleComplete, removeToDo}) => {
    // return (
    //     <li>
    //         {todo.title}
    //     </li>
    // );

    return (
        <li>{item.title}
            <input
                type="checkbox"
                id={item.id}
                checked={item.complete}
                onChange={toggleComplete}
            />
            <label htmlFor={item.id}></label>
            <button onClick={removeToDo}>
                <i className="fa fa-trash"></i>
            </button>
        </li>
    );
}

const ToDoCount = ({number}) => {
    let countText = null;

    if (number === 1) {
        countText = `${number} todo.`;
    } else {
        countText = `${number} todos.`;
    }

    return (
        <h6>
            {countText}
        </h6>
    );
}

const ClearButton = (props) => {
    return (
        <button onClick={props.removeCompleted}>
            Remove
        </button>
    );
}

// class based stateful components

class App extends Component {
    constructor() {
        super();

        this.state = {
            todos: [
              { id: 0, title: 'Learn React', complete: false },
              { id: 1, title: 'Learn React2', complete: false }
            ],
          lastId: 0
        };

        this.removeCompleted = this.removeCompleted.bind(this);
        //this.addToDo = this.addToDo.bind(this);
    }

    componentDidMount(){
       this.toDoInput.focus();
    }

    addToDo = (event) => {
        event.preventDefault();

        const id = this.state.lastId + 1;

        if (this.toDoInput.value) {
            let todos = this.state.todos.concat({
                id,
                title: this.toDoInput.value,
                complete: false
            })

            this.setState({
                todos,
                lastId: id
            })

            this.toDoInput.value = '';
        }
    }

    toggleComplete(item) {
        let todos = this.state.todos.map ((todo) => {
            if (item.id === todo.id) {
                todo.complete = !todo.complete;
            }

            return todo;
        })

        //this.setState({todos: todos});
        this.setState({todos});
    }

    removeToDo(item) {
        let todos = this.state.todos.filter((todo) => {
            return item.id !== todo.id;
        })

        this.setState({todos});
    }

    removeCompleted(item) {
        let todos = this.state.todos.filter((todo) => !todo.complete);
        this.setState({ todos });
    }

    hasCompleted() {
        let todos = this.state.todos.filter((todo) => todo.complete);

        if (todos.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        //const todos = ['Learn React', 'React is Fun'];

        // const todos = [
        //       { id: 0, title: 'Learn React', complete: false },
        //       { id: 1, title: 'Learn React2', complete: true }
        //    ];

        return (
            <div class="todo-list">
                <h1>So Much To Do</h1>
                <div className="add-todo">
                   <form name="addTodo" onSubmit={this.addToDo}>
                      <input type="text" ref={(input) => (this.toDoInput = input)} />
                      <span>(press enter to add)</span>
                   </form>
                </div>
                <ul>
                    {this.state.todos.map((todo, i) => (
                        <ToDo
                            key={i}
                            item={todo}
                            toggleComplete={this.toggleComplete.bind(this, todo)}
                            removeToDo={this.removeToDo.bind(this, todo)}
                        />
                    ))}
                </ul>

                <div class="todo-admin">
                    <ToDoCount number={this.state.todos.length} />
                    {this.hasCompleted() ?
                        (<ClearButton removeCompleted={this.removeCompleted} />)
                        : ('')
                    }
                </div>
            </div>
        );
    }
}

export default App;

// validations

ToDo.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        complete: PropTypes.bool.isRequired
    }),
    toggleComplete: PropTypes.func.isRequired,
    removeToDo: PropTypes.func.isRequired
}

ToDoCount.propTypes = {
    number: PropTypes.number.isRequired
}

ClearButton.propTypes = {
    removeCompleted: PropTypes.func.isRequired
}
