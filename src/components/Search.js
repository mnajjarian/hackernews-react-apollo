import React from 'react';
import { withApollo, Mutation} from 'react-apollo';
import Link from './Link';
import gql from 'graphql-tag';

const FEED_SEARCH_QUERY = gql`
    query FeedSearchQuery($filter: String!) {
        feed(filter: $filter) {
            links {
                id
                url
                description
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
            }
        }
    }
`
const Search = (props) => {
    const [state, setstate] = React.useState({
        links: [],
         filter: ''
        });
    const executeSearch = async () => {
        const { filter } = state;
        const result = await props.client.query({
            query: FEED_SEARCH_QUERY,
            variables: { filter },
        });
        const links = result.data.feed.links;
        setstate({...state, links});
    }
    return(
        <div>
            <div>
                Search
                <input
                   type="text"
                   onChange={e => setstate({...state, filter: e.target.value })}
                />
                <button onClick={() => executeSearch()}>Ok</button>
            </div>
            {state.links.map((link, index) => 
                <Link key={link.id} link={link} index={index} />
                )}
        </div>
    )
}

export default withApollo(Search);