# "TapMe" Telegram Web App


**Objective:**


<p>Develop a single-page Telegram Mini app/Web app named "TapMe" where users can earn coins by tapping a button like TapSwap (https://t.me/tapswap_bot). Functionality is a simple CRUD operation. Ensure the app includes basic tap animations to enhance the user experience. The implementation should be done in TypeScript. </p>


Backend Deployment Link- https://tepme-telegram-assignment.onrender.com/

Frontend Deployment Link- https://vercel.com/anjali-guptas-projects/tepme-telegram-assignment


**Features:**


1. **Clicker Game:**

<li>Users can tap a button to earn coins.</li>
<li>Display the user's total coin balance on the tap page.</li>
<li>Implement basic tap animations for better user experience (check out Tap UX of reference games below by checking them out)</li>
<li>Ensure real-time updates for the coin balance (feel free to use your own strategy to update user balance on remote supabase database to avoid too many requests)</li>


2. **Telegram Bot:**

   
<li>Create a Telegram bot to handle user interactions and commands.</li>
<li>Use commands like /start to interact with the game.</li>

# Tools and Technologies:

 **Frontend:** React.js, TypeScript
 
 **Backend:** Node.js, TypeScript, GraphQL-Yoga
 
 **Database:** Supabase
 
 **Telegram:** Bot API 
 
 **Deployment:** Vercel, Netlify (or similar hosting service)
 

# Setup

Backend

**Clone the Repository**

git clone https://github.com/Anjali9561Gupta/Tepme_Telegram_Assignment.git


Navigate to the Server Folder and Install Dependencies
    cd server
  npm install

 **Run Backend Services**
 
**Open two terminal windows or tabs. In the first terminal, run:**

```bash
 npm run dev
 npm run bot

Your server is now running locally.


Frontend

The frontend is already deployed. Ensure you have the correct URL for it.
**Process to Play**
Ensure Backend is Running
Make sure both backend services (npm run dev and npm run bot) are running.

Start the Telegram Bot
Open TapMe Telegram Bot.

Click on Start
Click the Start button to initiate the bot.

Access the Web App
You will receive a message with a link to Start Tapping!. Click on this link to open the web app.

Play the Game
The web app will open where you can play the game and tap the button to earn coins.

