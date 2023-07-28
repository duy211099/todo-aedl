// Tạo Todo - input + button ✅
// Xóa ✅
// Chuyển trạng thái ✅
// Sửa✅

import { useEffect, useState } from 'react'
import './index.css'
import { AddTodo } from './components/AddTodo'

const initialTodos = [
    {
        id: 1,
        name: 'Todo 1',
        isDone: false
    },
    {
        id: 2,
        name: 'Todo 2',
        isDone: false
    },
    {
        id: 3,
        name: 'Todo 3',
        isDone: true
    },
]

export const Todo = () => {
    const [todoList, setTodoList] = useState(initialTodos)
    const [newTodo, setNewTodo] = useState('')
    const [dataApi, setDataApi] = useState<any>()


    console.log('dataApi', dataApi)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => {
                setDataApi(json)
            })
    }, []);

    return (
        <div>
            <div>
                Data API:
                <div>{dataApi?.userId ?? ''}</div>
                <div>{dataApi?.title ?? ''}</div>
                <div>{dataApi?.completed ?? ''}</div>
            </div>
            <div>Todo App</div>

            <AddTodo
                newTodo={newTodo} setNewTodo={setNewTodo} setTodoList={setTodoList} todoList={todoList}
            />

            <div>
                {todoList.map(item => {
                    return <div className='todo' key={item.id}>
                        <input
                            type='text'
                            value={item.name}
                            onChange={(e) => {
                                setTodoList(
                                    todoList.map(t => {
                                        console.log('e', t.id === item.id)
                                        if (t.id === item.id) {
                                            console.log({ ...t, name: e.target.value })
                                        }
                                        return t.id === item.id
                                            ? { ...t, name: e.target.value } : t
                                    })
                                )
                            }}
                        />
                        <input type='checkbox'
                            checked={item.isDone}
                            onChange={() =>
                                setTodoList(
                                    todoList.map(t =>
                                        t.id === item.id
                                            ? { ...t, isDone: !t.isDone }
                                            : t)
                                )} />
                        <button
                            onClick={() => {
                                setTodoList(todoList.filter(t => t !== item))
                            }}>
                            Xóa
                        </button>
                    </div>
                })}
            </div>
        </div>
    )
}
