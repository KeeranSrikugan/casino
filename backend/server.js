require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { Pool } = require('pg');


//Here I am starting express
const app = express();


//Here I asum using cors
app.use(cors());
app.use(express.json());


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
app.get("/", async (req,res) => {

    //This is what connects to the postgre database
    const client = await pool.connect();

    try {
        
        const result = await client.query("SELECT * FROM players")

        res.json(result.rows);

    } catch (errors) {
        console.log(errors);
    }finally{
        //This is important because this closes the connection to the database
        client.release();
    }

    res.status(404);

});



// This is the API Endpoint that react connects to
//Post is the type fo HTTP request and "/api/process-word"is the endpoint URL
//"req" contains information sent by React and "res" used to send information back to react
app.post("/api/process-word", (req, res) => {

    // Get the word sent from React
    const word = req.body.word;

    // Process the word
    const result = word + " is so smart";

    // Return the result to React
    res.json({
        message: result
    });


    

});





// Starting server here
app.listen(5000, () => {
    console.log("Backend running on port 5000");
});