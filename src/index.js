import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import  { InMemoryCache }  from 'apollo-boost';
import {ApolloClient} from 'apollo-client';
import { setContext} from 'apollo-link-context';
import App from './components/App';

import './styles/index.css';
import { createHttpLink } from 'apollo-link-http';
import { AUTH_TOKEN } from './constants';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

ReactDOM.render(
<BrowserRouter>
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>
</BrowserRouter>
,document.getElementById('root'));