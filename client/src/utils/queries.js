import { gql } from "apollo/client";

export const GET_ME = gql`
  get me {
   User {
    _id: ID
    username: String
    email: String
    }
  }
`;
