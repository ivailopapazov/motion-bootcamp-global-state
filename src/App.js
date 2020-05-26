import React, { useState } from 'react';
import { connect } from './utils/react-dedux'
import { getTodos, getUsername } from './reducers'
import './App.css';

function App({
    todos,
    addTodo,
    toggleTodo,
    username,
    setName,
    checkAll,
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
                <button onClick={checkAll}>Check All</button>
            </div>
            <ul>
                {mappedTodos}
            </ul>
        </div>
    );
}

let mapStateToProps = state => ({
    todos: getTodos(state),
    username: getUsername(state),
});

let mapDispatchToProps = dispatch => ({
    addTodo: name => dispatch({type: 'TODO_ADD', payload: name}),
    toggleTodo: todo => dispatch({type: 'TODO_TOGGLE', payload: todo}),
    setName: name => dispatch({type: 'USER_NAME_SET', payload: name}),
    checkAll: () => dispatch({type: 'TODO_CHECK_ALL'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
