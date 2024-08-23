import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    getUserBalance(userId: String!): Int!
  }

  type Mutation {
    registerOrUpdateUser(userId: String!): User!
    updateCoins(userId: String!): CoinUpdateResponse!
  }

  type User {
    id: String!
    coins: Int!
  }

  type CoinUpdateResponse {
    balance: Int!
  }
`;
