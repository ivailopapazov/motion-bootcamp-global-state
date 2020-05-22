import React, { useState, useEffect } from 'react';
import { useDeduxContext } from './utils/react-dedux'
import './App.css';

function App() {
    let store = useDeduxContext();
    let [todo, setTodo] = useState('');
    let [todos, setTodos] = useState(store.getState().todos);

    store.subscribe(state => {
        setTodos(state.todos);
    });

    const toggleTodo = todo => {
        store.dispatch({
            type: 'TODO_TOGGLE',
            payload: todo
        });
    }

    let mappedTodos = todos
        .map(x => (
            <li onClick={() => toggleTodo(x)} className={x.isChecked ? 'checked' : ''} key={x.name}>
                {x.name}
            </li>
        ));

    const addTodo = () => {
        store.dispatch({ type: 'TODO_ADD', payload: { name: todo, isChecked: false } })
    };

    return (
        <div className="App">
            <div className="input-todo">
                <input type="text" onChange={e => setTodo(e.target.value)} />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul>
                {mappedTodos}
            </ul>
        </div>
    );
}

export default App;
