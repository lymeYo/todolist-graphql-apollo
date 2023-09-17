import { IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { KeyboardEventHandler, useEffect, useRef } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_TODO, GET_TODOS } from '../apollo/todos'
import { Ttodo } from '../constants'

const InputArea = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data: { newTodo } }) {
      const { todos } = cache.readQuery<{ todos: Ttodo[] }>({ query: GET_TODOS }) ?? { todos: [] }
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          todos: [newTodo, ...todos]
        }
      })
    }
  })

  const handleAddTodo = () => {
    const title = inputRef.current?.value ?? ''
    addTodo({ variables: { title } })
    if (inputRef.current?.value) inputRef.current.value = ''
  }

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (event.code == 'Enter' && inputRef.current == document.activeElement) handleAddTodo()
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [])

  return (
    <div className='add-todo-area'>
      <input type='text' className='add-todo' placeholder='Добавьте новую задачу' ref={inputRef} />
      <IconButton onClick={handleAddTodo}>
        <AddIcon />
      </IconButton>
    </div>
  )
}
export default InputArea
