import React, { useState } from 'react';
import { connect } from './utils/react-dedux'
import './App.css';

function App({
    todos,
    addTodo,
    toggleTodo,
    username,
    setName,
}) {
    let [todo, setTodo] = useState('');
    let [nameInput, setNameInput] = useState('');

    let mappedTodos = todos
        .map(x => (
            <li onClick={() => toggleTodo(x)} className={x.isChecked ? 'checked' : ''} key={x.name}>
                {x.name}
            </li>
        ));

    return (
        <div className="App">
            <div className="user-info">
                {username 
                    ? <h2>Hello, {username}</h2>
                    : (
                        <div className="set-user-name">
                            <input onChange={e => setNameInput(e.target.value)} type="text" />
                            <button onClick={() => setName(nameInput)}>Set name</button>
                        </div>
                    )
                }
            </div>
            <div className="input-todo">
                <input type="text" onChange={e => setTodo(e.target.value)} />
                <button onClick={() => addTodo(todo)}>Add</button>
            </div>
            <ul>
                {mappedTodos}
            </ul>
        </div>
    );
}

let mapStateToProps = state => ({
    todos: state.todos.todos,
    username: state.user.name,
});

let mapDispatchToProps = dispatch => ({
    addTodo: name => dispatch({type: 'TODO_ADD', payload: {name, isChecked: false}}),
    toggleTodo: todo => dispatch({type: 'TODO_TOGGLE', payload: todo}),
    setName: name => dispatch({type: 'USER_NAME_SET', payload: name}),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
