import { List, ListItem, IconButton, Checkbox, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Ttodo, TtodosViewMode } from '../constants'
import { useMutation } from '@apollo/client'
import { UPDATE_TODO, REMOVE_TODO } from '../apollo/todos'

type ListViewProps = {
  todos: Ttodo[],
  viewMode: TtodosViewMode
}
const ListView = ({ todos, viewMode }: ListViewProps) => {
  const [toggleTodo] = useMutation(UPDATE_TODO)
  const [removeTodo] = useMutation(REMOVE_TODO, {
    update(cache, { data: { removeTodo } }) {
      //removeTodo - поле из gql (todos.ts)
      cache.modify({
        fields: {
          //несмотря на то, что в gql у allTodos alias todos - нужно использовать имя поля (todos.ts)
          allTodos: (curTodos: any = []) =>
            curTodos.filter((todo: any) => todo.__ref != `Todo:${removeTodo.id}`)
        }
      })
    }
  })
  const handleToggleTodo = (id: string, completed: boolean) => {
    toggleTodo({
      variables: {
        id,
        completed
      }
    })
  }

  const handleRemoveTodo = (id: string) => {
    removeTodo({
      variables: { id }
    })
  }
  
   return (
    <List sx={{ width: '100%' }}>
      {todos.sort((a, b) => +a.completed - +b.completed).map(({ id, title, completed }: Ttodo, ind: number) => {
        const labelId = `checkbox-list-label-${title}`
        const onToggle = () => {
          handleToggleTodo(id, !completed)
        }
        const onRemove = () => {
          handleRemoveTodo(id)
        }

        return (
          <ListItem
            key={id}
            secondaryAction={
              <IconButton onClick={onRemove} edge='end' aria-label='delete'>
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <Checkbox
              onClick={onToggle}
              edge='start'
              checked={completed}
              tabIndex={ind}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
            <ListItemText className='select-text' id={labelId} primary={title} />
          </ListItem>
        )
      })}
    </List>
   )
}
export default ListView