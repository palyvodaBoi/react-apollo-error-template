/*** APP ***/
import { createRoot } from 'react-dom/client'
import { ApolloProvider, gql, useLazyQuery} from '@apollo/client'
import client from './ApolloClient'

const GET_FILMS = gql`
  query GetFilms($filmId: ID) {
    film(id: $filmId) {
      id
      title
    }
  }
`

function App() {
  const [ fetchFilms ] = useLazyQuery(GET_FILMS)

  return (
    <main>
      <button
        onClick={() => fetchFilms({ variables: { "filmId": "ZmlsbXM6MQ==" }})}
      >
        Get film with filter
      </button>
      <button
        onClick={fetchFilms}
      >
        Get film without filter
      </button>
    </main>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
