const express = require("express");
const cors = require("cors");


//Here I am starting express
const app = express();


//Here I asum using cors
app.use(cors());
app.use(express.json());

// API endpoint
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