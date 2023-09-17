import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider, createTheme } from '@mui/material'

import client from './apollo/client.ts'
import App from './App.tsx'

const theme = createTheme({
  typography: {
    fontFamily: 'serif',
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
