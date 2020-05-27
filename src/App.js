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

let mapStateToProps = state => ({
    todos: getTodos(state),
    username: getUsername(state),
});

let mapDispatchToProps = dispatch => ({
    setFilter: filter => dispatch({type: 'TODOS_FILTER_SET', payload: filter}),
    addTodo: name => dispatch({type: 'TODO_ADD', payload: {_id: Date.now(), name}}),
    toggleTodo: todo => dispatch({type: 'TODO_TOGGLE', payload: todo}),
    setName: name => dispatch({type: 'USER_NAME_SET', payload: name}),
    checkAll: () => dispatch({type: 'TODO_CHECK_ALL'}),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
