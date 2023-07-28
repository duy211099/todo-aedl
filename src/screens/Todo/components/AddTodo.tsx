export const AddTodo = (props: any) => {
    const { newTodo, setNewTodo, setTodoList, todoList } = props
    
    return (
        <div>
            <input type='text'
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)} />
            <button
                onClick={() => {
                    setTodoList([...todoList, { name: newTodo, isDone: false, id: todoList.length + 1 }])
                    setNewTodo('')
                }}
            >Add</button>
        </div>
    )
}
