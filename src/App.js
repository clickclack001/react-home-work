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
  return state
}

function App() {
  const [state, dispatch] = useReducer(reducer, [
    {
      id: null,
      text: '',
      completed: false,
    },
  ])

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
              />
            ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  )
}

export default App
