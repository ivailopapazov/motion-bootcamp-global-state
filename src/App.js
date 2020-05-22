import React, { useState, useEffect } from 'react';
import { connect } from './utils/react-dedux'
import './App.css';

function App({
    todos,
    addTodo,
    toggleTodo,
}) {
    let [todo, setTodo] = useState('');

    let mappedTodos = todos
        .map(x => (
            <li onClick={() => toggleTodo(x)} className={x.isChecked ? 'checked' : ''} key={x.name}>
                {x.name}
            </li>
        ));

    return (
        <div className="App">
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
    todos: state.todos
});

let mapDispatchToProps = dispatch => ({
    addTodo: name => dispatch({type: 'TODO_ADD', payload: {name, isChecked: false}}),
    toggleTodo: todo => dispatch({type: 'TODO_TOGGLE', payload: todo})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
