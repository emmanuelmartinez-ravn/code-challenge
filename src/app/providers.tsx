import { RouterProvider } from 'react-router'
import { ApolloProvider } from '@apollo/client/react'
import { router } from './router'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
})

const authLink = new SetContextLink((prevContext) => {
  const token = import.meta.env.VITE_GRAPHQL_TOKEN

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
})

export default function Providers() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  )
}
