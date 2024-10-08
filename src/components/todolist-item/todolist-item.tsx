import { memo, useCallback } from 'react'
import { Box } from '@mui/material'
import { AddItemForm } from 'components/add-item-form'
import { Task, TodolistDomain } from 'common/types'
import { ButtonsFilter } from 'components/buttons-filter'
import { useActions } from 'common/hooks'
import { tasksThunks } from 'services/reducers/tasksSlice'
import { Tasks } from 'components/tasks'
import { TodolistTitle } from 'components/todolist-title'
import { FlexContainer } from 'common/ui'

type Props = {
  todolist: TodolistDomain
  tasksForTodolist: Task[]
}

export const TodolistItem = memo(({ todolist, tasksForTodolist }: Props) => {
  const { entityStatus, id } = todolist
  const { addTaskTC } = useActions(tasksThunks)
  let disabled = entityStatus === 'loading'

  const addTask = useCallback(
    async (title: string) => {
      await addTaskTC({ title, todoListId: id })
    },
    [addTaskTC, id]
  )

  return (
    <FlexContainer ai="flex-start" jc="center" fd="column" gap={'20px'}>
      <TodolistTitle disabledFor={disabled} todolist={todolist} />
      <AddItemForm addTask={addTask} disabled={disabled} label={'Type here...'} />
      <Tasks tasksForTodolist={tasksForTodolist} />
      <Box sx={{ display: 'flex', gap: '15px' }}>
        <ButtonsFilter todolist={todolist} />
      </Box>
    </FlexContainer>
  )
})
