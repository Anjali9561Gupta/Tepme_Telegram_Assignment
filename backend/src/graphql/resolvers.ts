import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL and key must be provided in environment variables."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

type User = {
  id: string;
  coins: number;
};

export const resolvers = {
  Query: {
    getUserBalance: async (_: any, { userId }: { userId: string }) => {
      const { data, error } = await supabase
        .from("users")
        .select("coins")
        .eq("id", userId)
        .single();

      if (error) {
        throw new Error(`Database query failed: ${error.message}`);
      }

      if (!data) {
        throw new Error(`No data found for user with ID ${userId}.`);
      }

      return data.coins;
    },
  },
  Mutation: {
    registerOrUpdateUser: async (_: any, { userId }: { userId: string }) => {
      console.log("Attempting to register or update user with ID:", userId);

      try {
        // Check if the user already exists
        const { data: existingUser, error: fetchError } = await supabase
          .from("users")
          .select("id, coins")
          .eq("id", userId)
          .single();

        if (fetchError && fetchError.code !== "PGRST000") {
          throw new Error(`Error fetching user: ${fetchError.message}`);
        }

        let newUser;

        if (!existingUser) {
          // If user does not exist, create a new one with coins set to 0
          const { data: createdUser, error: createError } = await supabase
            .from("users")
            .insert([{ id: userId, coins: 0 }])
            .select()
            .single();

          if (createError) {
            throw new Error(`Database insert failed: ${createError.message}`);
          }

          newUser = createdUser;
        } else {
          // If the user already exists, do not reset the coins
          newUser = existingUser;
        }

        console.log("Data received from upsert:", newUser);
        return newUser;
      } catch (err) {
        console.error("Error during register or update:", err);
        throw new Error("Error during register or update.");
      }
    },

    updateCoins: async (_: any, { userId }: { userId: string }) => {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("coins")
        .eq("id", userId)
        .single();

      if (userError) {
        throw new Error(`Database query failed: ${userError.message}`);
      }

      if (!userData) {
        throw new Error(`No data found for user with ID ${userId}.`);
      }

      const newBalance = (userData.coins || 0) + 1;

      const { error: updateError } = await supabase
        .from("users")
        .update({ coins: newBalance })
        .eq("id", userId);

      if (updateError) {
        throw new Error(`Database update failed: ${updateError.message}`);
      }

      return { balance: newBalance };
    },
  },
};
