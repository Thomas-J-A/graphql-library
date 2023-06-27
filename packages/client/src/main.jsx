import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
  from,
} from '@apollo/client';

import App from './App.jsx';
import IndexPage from './pages/Index/IndexPage/IndexPage';
import BooksPage from './pages/Books/BooksPage/BooksPage';
import AddBookPage from './pages/AddBook/AddBookPage/AddBookPage';
import LogInPage from './pages/LogIn/LogInPage/LogInPage';

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('accessToken');
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  return forward(operation);
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <p>Error!</p>,
    children: [
      { index: true, element: <IndexPage /> },
      {
        path: '/books',
        element: <BooksPage />,
      },
      {
        path: '/add-book',
        element: <AddBookPage />,
      },
      {
        path: '/login',
        element: <LogInPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>,
);
