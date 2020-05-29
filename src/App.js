import React, { useState } from 'react';
import { connect } from './utils/react-dedux'
import { getTodos, getUsername } from './reducers'
import { addTodo, toggleTodo, setFilter, checkAll } from './actions/todoActions'
import { setName } from './actions/userActions'
import './App.css';

function App({
    todos,
    addTodo,
    toggleTodo,
    username,
    setName,
    checkAll,
    setFilter,
}) {
    let [todo, setTodo] = useState('');
    let [nameInput, setNameInput] = useState('');

    let mappedTodos = todos
        .map(x => (
            <li onClick={() => toggleTodo(x)} className={x.isChecked ? 'checked' : ''} key={x._id}>
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

            <div className="todo-filter">
                <span onClick={() => setFilter('all')}>All</span>
                <span onClick={() => setFilter('unfinished')}>Unfinished</span>
                <span onClick={() => setFilter('finished')}>Finished</span>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => ({
    todos: getTodos(state),
    username: getUsername(state),
});

export default connect(mapStateToProps, {
    addTodo,
    toggleTodo,
    checkAll,
    setFilter,
    setName,
})(App);
