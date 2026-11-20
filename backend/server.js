require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { Pool } = require('pg');
const http = require("http");
const { Server } = require("socket.io");


const app = express();
app.use(cors());
app.use(express.json());


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://casino-eight-gray.vercel.app"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
});

//Here is the code used to connect the database from NeonDB

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGSSLMODE, PGCHANNELBINDING} = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});



//This is the login check occurs with the information pulled from React and compared to the database
app.post("/api/login", async (req, res) => {

    //Get the username and password
    const { username, password } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query(
            "SELECT * FROM players WHERE username = $1",
            [username]
        );

        //Checks if username and password are valid
        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const player = result.rows[0];
        if (password !== player.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        //Return this json file if login successfull 
        return res.status(200).json({
            success: true,
            message: "Login successfull!",
            player: {
                id: player.id,
                first_name: player.first_name,
                last_name: player.last_name,
                username: player.username,
                total_points: player.total_points,
                role: player.role
            }

        });

    } catch (error) {

        console.error("Error accessing database: ", error);
        //This return sends a json that tells React that its false
        return res.status(500).json({
            success: false,
            message: "Error connecting to database."
        });

    }finally{
        client.release();
    }

});


//Here is the Post call for when a user registers
app.post("/api/register", async (req, res) => {

    // Get username and password from React
    const { firstName, lastName, username, password } = req.body;
    const client = await pool.connect();
    
    //Here we connect to the neonDB and check 
    try {
        const existingPlayer =await client.query(
             `SELECT id FROM players 
             WHERE LOWER(username) = LOWER($1)`,
            [username.trim()]
        );
        
        if (existingPlayer.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Username already exists. Please choose another one."
            });
        }

        //Here we connect to the database and add the new user
        //Note: Returning make its so that we get the new entry made back
        //This would be useful for using to remember which player is logged in
        const result = await client.query(

            `INSERT INTO players
            (first_name, last_name, username, password)

            VALUES ($1, $2, $3, $4)

            RETURNING id, first_name, last_name, username,
                    total_points, created_at`,

            [
                firstName.trim(),
                lastName.trim(),
                username.trim(),
                password.trim()
            ]

        );

        //Here we get back the new information regarding the player so it can be saved on local storage
        //Res status 200 mean its created
        const currPlayer = result.rows[0];

        return res.status(201).json({
            success: true,
            message: "Registration successful!!!!!",
            player: {
                id: currPlayer.id,
                firstname: currPlayer.first_name,
                lastname: currPlayer.last_name,
                username: currPlayer.username,
                total_points: currPlayer.total_points,
            }
        });

    } catch (error) {
        console.error("Error accessing database: ", error);
        //This return sends a json that tells React that its false
        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }finally{
        client.release();
    }

});


//Here is the post call for collecting all current player information for the admin to select
app.get("/api/admin/playerlist", async (req, res) => {

    
    const client = await pool.connect();
    try{
        //Here we get a list of all players by getting every row in database
         const result = await client.query(
            `SELECT id, first_name, last_name, username, total_points
            FROM players
            WHERE role != 'admin'`
        );

        //This returns a list of 
        return res.status(200).json({
            message: "Completed pulling player list.",
            success: true,
            players: result.rows
        });


    }catch (error) {
        console.error("Error accessing database: ", error);
        return res.status(500).json({
            success: false,
            message: "Error pulling player list."
        });

    }finally{
        client.release();
    }

});


app.get("/api/player/:id/points", async (req, res) => {

    const { id } = req.params;
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT total_points FROM players WHERE id = $1`,
            [id]
        );

        res.json({
            total_points: result.rows[0].total_points,
            success: true
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }finally{
        client.release();
    }
});




app.post("/api/GameTransactions", async (req, res) => {
    
    const { playerId, gameName, betAmount, gameResult } = req.body;
    const client = await pool.connect();
    try {
        let pointsChange;
        if (gameResult === "Win") {
            pointsChange = Number(betAmount);
        } else {
            pointsChange = -Number(betAmount);
        }


        const add_game_result = await client.query(
            `INSERT INTO game_transactions
            (player_id,game_name, points_change, result)
            VALUES ($1, $2, $3, $4)`,

            [playerId, gameName, pointsChange,gameResult]
        );

  
        const update_points = await client.query(
            `UPDATE players
             SET total_points = total_points + $1
             WHERE id = $2`,

            [pointsChange, playerId]
        );

        res.status(201).json({
            message: "Game successfully saved.",
        });


        //This is a socket call to tell user to refresh points
        io.emit("pointsUpdated", playerId);

    } catch (error) {

        console.error("Error creating transaction:", error);
        res.status(500).json({
            message: "Server error creating transaction."
        });
    }finally{
        client.release();
    }
});


// Get all players ranked by points
app.get("/api/leaderboard", async (req, res) => {

    const client = await pool.connect();   
    try {
        const result = await client.query(`
            SELECT id, username, total_points
            FROM players
            WHERE role != 'admin'
            ORDER BY total_points DESC
        `);

        console.log(result);
        res.json(result.rows);

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
    }finally{
        client.release();
    }
});


app.get("/api/history", async (req, res) => {
    const client = await pool.connect();
    try {
        const playerId = req.query.playerId;
        const result = await pool.query(`
            SELECT game_name, points_change, result, created_at
            FROM game_transactions
            WHERE player_id = $1
            ORDER BY created_at DESC`, 
            [playerId]);

        res.json({
            message: "History is shown!",
            history: result.rows
        });

    } catch (error) {
        console.error("Error fetching leaderboard:", error);
    }finally{
        client.release();
    }
});


// Starting server here
// server.listen(5000, () => {
//     console.log("Backend running on port 5000");
// });

const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});