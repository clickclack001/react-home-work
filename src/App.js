import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material'
import { AddField } from './components/AddField'
import { Item } from './components/Item'
import { useReducer } from 'react'

function reducer(state, action) {
  if (action.type === 'ADD_TASK') {
    let maxId = state.reduce((prev, cur) => (prev.id > cur.id ? prev : cur))
    action.newTask.id = maxId.id + 1
    return [...state, action.newTask]
  }
  if (action.type === 'SET_COMPLETED') {
    let newState = state.map((task) =>
      task.id === action.taskId
        ? { ...task, completed: !task.completed }
        : task,
    )
    return [...newState]
  }
  if (action.type === 'DELETE_TASK') {
    let newState = state.filter((task) => task.id !== action.payload.id)
    return [...newState]
  }
  if (action.type === 'CLEAR_TASK_LIST') {
    return [action.payload]
  }
  if (action.type === 'SET_ALL_COMPLETED') {
    let newState = state.map((task) => ({ ...task, completed: true }))
    return [...newState]
  }

  return state
}

function App() {
  const initState = {
    id: null,
    text: '',
    completed: false,
  }
  const [state, dispatch] = useReducer(reducer, [initState])

  const addTask = (task) => {
    dispatch({
      type: 'ADD_TASK',
      newTask: task,
    })
  }

  const setCompleted = (id) => {
    dispatch({
      type: 'SET_COMPLETED',
      taskId: id,
    })
  }

  const deleteTask = (id) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: {
        id,
      },
    })
  }

  const clearTaskList = () => {
    dispatch({
      type: 'CLEAR_TASK_LIST',
      payload: initState,
    })
  }

  const setAllCompleted = () => {
    dispatch({
      type: 'SET_ALL_COMPLETED',
    })
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onAddTask={addTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state
            .filter((task) => task.id !== null)
            .map((task) => (
              <Item
                completed={task.completed}
                text={task.text}
                key={task.id}
                id={task.id}
                onSetCompleted={setCompleted}
                onDelete={deleteTask}
              />
            ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={() => setAllCompleted()}>Отметить всё</Button>
          <Button onClick={() => clearTaskList()}>Очистить</Button>
        </div>
      </Paper>
    </div>
  )
}

export default App
