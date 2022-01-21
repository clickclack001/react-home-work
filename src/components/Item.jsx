import React from 'react'
import { IconButton, Checkbox, ListItem, Typography } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export const Item = ({ text, completed, onSetCompleted, id, onDelete }) => {
  const deleteTask = (id) => {
    let confirmDelete = window.confirm('Удалить задачу?')
    return confirmDelete ? onDelete(id) : false
  }

  return (
    <ListItem>
      <div className="d-flex item" id={id}>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={completed}
          onChange={() => onSetCompleted(id)}
        />
        <Typography className="item-text">{text}</Typography>
        <div className="item-buttons d-flex">
          <IconButton>
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={() => deleteTask(id)}>
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  )
}
