import { gql } from '@apollo/client'

export const GET_TODOS = gql`
  query AllTodos($page: Int, $perPage: Int) {
    todos: allTodos(page: $page, perPage: $perPage) {
      id
      title
      completed
    }
  }
`

export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    newTodo: createTodo(title: $title, user_id: 123, completed: false) {
      id
      title
      completed
    }
  }
`

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, user_id: 123, completed: $completed) {
      id
      title
      completed
    }
  }
`

export const REMOVE_TODO = gql`
  mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id) {
      id
      title
      completed
    }
  }
`
