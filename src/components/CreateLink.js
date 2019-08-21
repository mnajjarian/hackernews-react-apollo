import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const POST_MUTATION = gql`
   mutation PostMutation($description: String!, $url: String!) {
       post(description: $description, url: $url) {
           url
           description
       }
   }
`
const CreateLink = () => {
    const [state, setState] = React.useState({description: '', url: ''});
const { description, url } = state;
    return (
        <div>
            <div className="flex flex-column mt3" >
                <input
                   className="mb2"
                   value={description}
                   onChange={e => setState({...state, description: e.target.value })}
                   type="text"
                   placeholder="A description for the link"
                />
                <input
                    className="mb2"
                    value={url}
                    onChange={e => setState({...state, url: e.target.vale })}
                    type="text"
                    placeholder="The URL for the link"
                />
            </div>
            <Mutation 
                mutation={POST_MUTATION} 
                variables={{ description, url }}
                onCompleted={() => this.props.history.pushState('/')}
                >
                {postMutation => 
                    <button onClick={postMutation}>
                        Submit
                    </button>
                }
            </Mutation>
        </div>
    )
}

export default CreateLink;