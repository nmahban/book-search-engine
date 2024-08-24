import { gql } from "apollo/client";

export const LOGIN_USER = gql`
    mutation login (email: String!, password: String!) {
        login(email: $email, password: $password) {
        user {
        _id
        username
        }
        token
        }
    }
   
  

`;
export const ADD_USER = gql`
    mutation addUser(username: String!, email: String!, password: String!) {
      addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
    }
  

`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
