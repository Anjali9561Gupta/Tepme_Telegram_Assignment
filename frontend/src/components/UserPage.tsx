import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_BALANCE, UPDATE_COINS } from "../graphql/queries";
import "../styles.css";

const UserPage: React.FC = () => {
  const location = useLocation();
  const [userId, setUserId] = useState<string | null>(null);
  const { data, loading, error, refetch } = useQuery(GET_USER_BALANCE, {
    variables: { userId },
    skip: !userId,
  });

  const [updateCoins] = useMutation(UPDATE_COINS);

  //to get userId from telegram bot
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("userId");
    if (id) {
      setUserId(id);
    }
  }, [location.search]);

  //to update coins
  const handleTap = () => {
    if (userId) {
      updateCoins({ variables: { userId } })
        .then((response) => {
          console.log("Coins updated:", response.data);
          // Refetch the balance after updating coins
          refetch();
        })
        .catch((err) => {
          console.error("Error updating coins:", err);
        });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Welcome, User {userId}</h1>
      <p>Your balance: {data?.getUserBalance || 0}</p>
      <button onClick={handleTap}>Tap to Earn Coins</button>
    </div>
  );
};

export default UserPage;
