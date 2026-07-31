import { RouterProvider } from 'react-router'
import { ApolloProvider } from '@apollo/client/react'
import { router } from './router'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'https://syn-api-production-e95c.up.railway.app/graphql',
})

const client = new ApolloClient({
  cache,
  link,
})

export default function Providers() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  )
}
