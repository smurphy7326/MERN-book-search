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
export const CREATE_USER = gql`
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

export const SAVE_BOOK = gql`
    mutation saveBook($input: BookInput!) {
        saveBook(input: $input){
            _id
            username
            email
            bookCount
            savedBooks {
                title
                authors
                description
                image
                link
                bookId
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!){
        removeBook(bookId: $bookId) {
            _id
            username
            bookCount
            savedBooks {
              title
              authors
              description
              image
              link
              bookId
            }
        }
    }
`
;