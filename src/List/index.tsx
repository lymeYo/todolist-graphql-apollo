import { Checkbox, CircularProgress, IconButton, List, ListItem, ListItemText } from '@mui/material'

import InputArea from './InputArea'
import { useMutation, useQuery } from '@apollo/client'
import { GET_TODOS } from '../apollo/todos'
import { Ttodo, TtodosViewMode } from '../constants'
import { useState, useMemo } from 'react'
import ListView from './ListView'

const MyList = () => {
  const { loading, error, data } = useQuery<{ todos: Ttodo[] }>(GET_TODOS)
  const [todosViewMode, setTodosViewMode] = useState<TtodosViewMode>('all')
  const todos = todosViewMode == 'all' ? 
    [...(data?.todos ?? [])] : todosViewMode == 'active' ? 
    [...(data?.todos.filter(todo => todo.completed) ?? [])] : 
    [...(data?.todos.filter(todo => !todo.completed) ?? [])]

  if (error) return <h2>Error...</h2>

  return (
    <div className='list-wrapper'>
      <InputArea />
      {loading ? (
        <CircularProgress />
      ) : (
        <ListView todos={todos} viewMode={todosViewMode} />
      )}
      <nav>
          <ul className='state-list'>
            <li
              onClick={() => {setTodosViewMode('all')}}
              className={`${todosViewMode == 'all' ? 'active' : ''} state-list__item`}>Все</li>
            <li
              onClick={() => {setTodosViewMode('active')}}
              className={`${todosViewMode == 'active' ? 'active' : ''} state-list__item`}>Активные</li>
            <li
              onClick={() => {setTodosViewMode('completed')}}
              className={`${todosViewMode == 'completed' ? 'active' : ''} state-list__item`}>Выполненные</li>
          </ul>
      </nav>
    </div>
  )
}
export default MyList
