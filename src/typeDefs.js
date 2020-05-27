// src/typeDefs.js
const { gql } = require("apollo-server");

const defs = gql`
  type File {
    id: ID!
    filename: String!
    mimetype: String!
    path: String!
  }
  type Query {
    hello: String
    files: [File!]
  }
  type Mutation {
    uploadFile(file: Upload!): File
  }
`;

module.exports = defs;
