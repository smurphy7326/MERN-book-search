import { gql } from '@apollo/client'

// login is standard like in the weekly module that we used
export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!){
        login(email: $email, password: $password){
        token
        user{
            _id
        }
    }
}
`;

// add user is the same as the weekly module again 
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

