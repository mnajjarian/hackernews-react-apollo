import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import  { InMemoryCache }  from 'apollo-boost';
import {ApolloClient} from 'apollo-client';
import App from './components/App';

import './styles/index.css';
import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
<BrowserRouter>
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>
</BrowserRouter>
,document.getElementById('root'));