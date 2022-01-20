import { TextField, Button, Checkbox } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useState } from 'react'

export const AddField = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState({
    text: '',
    completed: false,
  })

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    type === 'checkbox'
      ? setNewTask({ ...newTask, [name]: checked })
      : setNewTask({ ...newTask, [name]: value })
  }

  const handleClick = () => {
    if (!newTask.text.trim()) {
      alert('Введите название задачи')
      return false
    }
    onAddTask(newTask)

    setNewTask({
      text: '',
      completed: false,
    })
  }

  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={newTask.completed}
        name="completed"
        onChange={handleChange}
      />
      <TextField
        onChange={handleChange}
        name="text"
        value={newTask.text}
        placeholder="Введите текст задачи..."
        variant="standard"
        fullWidth
      />
      <Button onClick={() => handleClick()}>
        <AddIcon />
      </Button>
    </div>
  )
}
