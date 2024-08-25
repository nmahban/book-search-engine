const typeDefs = `
type User {
_id: ID
username: String
email: String
bookCount: Int
savedBooks: [Book]!
}

type Book {
bookId: ID
authors: [String]
description: String
image: String
link: String
title: String
}

type Auth {
token: ID!
user: User
}

input BookObject{
bookId: String
authors: [String]
description: String
image: String
link: String
title: String
}

type Query {
me: User
}

type Mutation {
addUser(username: String!, email: String!, password: String!): Auth
login(email: String!, password: String!): Auth
saveBook(bookData: BookObject): User
removeBook(bookId: ID): User
}



`;

module.exports = typeDefs