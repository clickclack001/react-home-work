import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material'
import { AddField } from './components/AddField'
import { Item } from './components/Item'
import { useEffect, useReducer, useState } from 'react'

function reducer(state, action) {
  if (action.type === 'ADD_TASK') {
    //let maxId = state.reduce((prev, cur) => (prev.id > cur.id ? prev : cur))
    let maxId = state.length ? state[state.length - 1].id : 1
    action.newTask.id = maxId + 1
    return [...state, action.newTask]
  }
  if (action.type === 'SET_COMPLETED') {
    return state.map((task) =>
      task.id === action.taskId
        ? { ...task, completed: !task.completed }
        : task,
    )
  }
  if (action.type === 'DELETE_TASK') {
    let newState = state.filter((task) => task.id !== action.payload.id)
    return [...newState]
  }
  if (action.type === 'CLEAR_TASK_LIST') {
    return []
  }
  if (action.type === 'SET_ALL_COMPLETED') {
    let newState = state.map((task) => ({ ...task, completed: true }))
    return [...newState]
  }
  if (action.type === 'TOGGLE_COMPLETED_ALL') {
    const noCompleted = state.find((task) => !task.completed)
    return state.map((task) => ({
      ...task,
      completed: Boolean(noCompleted),
    }))
  }

  return state
}

function App() {
  const [state, dispatch] = useReducer(reducer, [])
  const [tab, setTab] = useState(0)
  const [toggleText, setToggleText] = useState('')

  // Может быть так не правильно делать и скорее всего есть вариант написать проще и короче,
  // но чтото другого ничего не придумал :)
  useEffect(() => {
    if (state.find((task) => !task.completed)) {
      setToggleText('Отметить все')
    } else {
      if (state.length) {
        setToggleText('Снять отметку')
      } else {
        setToggleText('Отметить все')
      }
    }
  }, [state])

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
    })
  }

  const setAllCompleted = () => {
    dispatch({
      type: 'TOGGLE_COMPLETED_ALL',
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
        <Tabs value={tab}>
          <Tab label="Все" onClick={() => setTab(0)} />
          <Tab label="Активные" onClick={() => setTab(1)} />
          <Tab label="Завершённые" onClick={() => setTab(2)} />
        </Tabs>
        <Divider />
        <List>
          {/*В этом блоке тоже наверное можно было как-то по другому сделать, так как код поввторяется, кроме фильтра*/}
          {tab === 0 &&
            state.map((task) => (
              <Item
                completed={task.completed}
                text={task.text}
                key={task.id}
                id={task.id}
                onSetCompleted={setCompleted}
                onDelete={deleteTask}
              />
            ))}
          {tab === 1 &&
            state
              .filter((task) => task.completed === false)
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
          {tab === 2 &&
            state
              .filter((task) => task.completed === true)
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
          <Button onClick={setAllCompleted}>{toggleText}</Button>
          <Button onClick={clearTaskList}>Очистить</Button>
        </div>
      </Paper>
    </div>
  )
}

export default App
