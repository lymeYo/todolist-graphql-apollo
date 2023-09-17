import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

// const client = new ApolloClient({
//   uri: 'https://rickandmortyapi.com',
//   cache: new InMemoryCache()
// })

export default client