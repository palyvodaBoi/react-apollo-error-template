import { ApolloClient, ApolloLink, DefaultOptions, InMemoryCache, createHttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({uri: "https://swapi-graphql.netlify.app/.netlify/functions/index"})

const errorLink = onError(({ networkError, graphQLErrors }) => {
	if (graphQLErrors) {
		console.error(JSON.stringify(graphQLErrors))
	}
	if (networkError) {
		console.error(JSON.stringify(networkError))
	}
})

const authLink = setContext((_, { headers }) => ({ headers: { ...headers }}))
const link = ApolloLink.from([errorLink, authLink.concat(httpLink)])

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
}

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link,
	defaultOptions: defaultOptions,
})

export default client
