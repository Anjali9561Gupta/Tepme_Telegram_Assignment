
import { gql } from '@apollo/client';

export const GET_USER_BALANCE = gql`
  query GetUserBalance($userId: String!) {
    getUserBalance(userId: $userId)
  }
`;

export const REGISTER_OR_UPDATE_USER = gql`
  mutation RegisterOrUpdateUser($userId: String!) {
    registerOrUpdateUser(userId: $userId) {
      id
      coins
    }
  }
`;

export const UPDATE_COINS = gql`
  mutation UpdateCoins($userId: String!) {
    updateCoins(userId: $userId) {
      balance
    }
  }
`;
