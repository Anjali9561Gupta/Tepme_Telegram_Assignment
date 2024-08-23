export const updateCoinsMutation = `
  mutation updateCoins($userId: String!) {
    updateCoins(userId: $userId) {
      balance
    }
  }
`;

export const RregisterOrUpdateUser = `
  mutation RegisterOrUpdateUser($userId: String!) {
    registerOrUpdateUser(userId: $userId) {
      id
    }
  }
`;
