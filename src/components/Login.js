import React from 'react';
import {AUTH_TOKEN } from '../constants';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SIGNUP_MUTATION = gql`
   mutation SignupMutation($email: String!, $password: String!, $name: String!) {
       signup(email: $email, password: $password, name: $name) {
           token
       }
   }
`
const LOGIN_MUTATION = gql`
   mutation LoginMutation($email: String!, $password: String!) {
       login(email: $email, password: $password) {
           token
       }
   }
`
const Login = () => {
    const [state, setState] = React.useState({
        login: true,
        email: '',
        password: '',
        name: ''
    });

    const confirm = async (data) => {
        const { token } = state.login ? data.login : data.signup;
        saveUserData(token);
        // props.history.push('/');
    }
    const saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }

    const {login, email, password, name } = state;
    return(
        <div>
            <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
            <div className="flex flex-column">
                {!login && (
                    <input
                       value={name}
                       onChange={e => setState({...state, name: e.target.value })}
                       type="text"
                       placeholder="Your name"
                    />
                )}
                <input
                value={email}
                onChange={e => setState({...state, email: e.target.value })}
                type="text"
                placeholder="Your email address"
                />
                 <input
                    value={password}
                    onChange={e => setState({...state, password: e.target.value })}
                    type="password"
                    placeholder="Choose a safe password"
                />
            </div>
            <div className="flex mt3">
                <Mutation
                    mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                    variables={{ email, password, name }}
                    onCompleted={data => confirm(data)}
                >
                    {mutation => (
                        <div className="pointer mr2 button" onClick={mutation}>
                           {login ? 'login' : 'create account'}
                        </div>
                    )}
                </Mutation>
                <div className="pointer button"
                    onClick={() => setState({...state, login: !state.login })}
                >
                    {login
                    ? 'need to create an account?'
                    : 'already have an account?'
                    }
                </div>
            </div>
        </div>
    )
};

export default Login;
